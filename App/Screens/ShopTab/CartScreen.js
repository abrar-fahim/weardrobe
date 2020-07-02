import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import Colors from '../../Styles/Colors';
import UIButtonTextStyle from '../../Styles/UIButtonTextStyle';



import * as cartActions from '../../store/actions/cart'
import AuthRequiredScreen from '../AuthRequiredScreen';

import LoadingScreen from '../../components/LoadingScreen'



export default function CartScreen(props) {

    const loggedIn = useSelector(state => (state.auth.userId == null ? false : true));

    const userId = useSelector(state => state.auth.userId)
    console.log(userId)


    const cartItems = useSelector(state => state.cart.items)

    const [isLoading, setIsLoading] = useState(true)


    const dispatch = useDispatch();

    const removeFromCart = useCallback(async (productId, color, size) => {
        try {
            await dispatch(cartActions.removeFromCart(productId, color, size))
        }
        catch (err) {
            console.log(err)
        }

    }, [dispatch])



    const updateCart = useCallback(async (productId, color, size, quantity) => {

        try {
            await dispatch(cartActions.updateCart(productId, color, size, quantity))
        }
        catch (err) {
            console.log(err)
        }
    }, [dispatch])

    const loadCartItems = useCallback(async () => {
        //setIsLoading(true);
        try {
            setIsLoading(true)
            await dispatch(cartActions.fetchCartItems())
            setIsLoading(false)
        } catch (err) {
            console.log(err.message)
        }
        //setIsLoading(false);
    })





    useEffect(() => {

        const willFocusSub = props.navigation.addListener(
            'focus', () => {

                if (userId) {
                    loadCartItems();
                }
            }

        );


        return willFocusSub;

    }, []);




    const renderItems = (itemData) => {
        return (
            <View style={{ ...styles.cartItem, opacity: itemData.item.inventoryQuantity > 0 ? 1 : 0.5 }}>

                <View style={styles.seller}>

                    <Text style={styles.sellerName}>Seller: {itemData.item.shopName}</Text>

                </View>

                <View style={styles.product}>
                    <View style={styles.picSizeColor}>


                        <TouchableOpacity onPress={() => (props.navigation.navigate('Product', {
                            productId: itemData.item.productId
                        }))}>
                            <Image source={itemData.item.picture} style={styles.picture}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

                        <View style={styles.sizeColorContainer}>
                            {itemData.item.color === "" ? null : <FontAwesome name="circle" color={itemData.item.color} size={25} />}

                            {itemData.item.size === "" ? null : <View style={styles.sizeContainer}>
                                {/* <FontAwesome name="circle" color="grey" size={25} /> */}
                                {/* <View style={styles.sizeTextContainer}> */}
                                <Text style={styles.sizeText}>{itemData.item.size?.toUpperCase()}</Text>
                                {/* </View> */}

                            </View>}
                        </View>


                    </View>

                    <View style={styles.namePriceQuantity}>
                        <TouchableOpacity onPress={() => (props.navigation.navigate('Product', {
                            productId: itemData.item.productId
                        }))}>
                            <View>
                                <Text style={styles.itemName}> {itemData.item.name}</Text>
                                {/* <Text style={{ fontWeight: '200' }} > {"Ref: " + itemData.item.name}</Text> */}


                            </View>
                        </TouchableOpacity>

                        <View style={styles.priceContainer}>
                            <Text> {itemData.item.price}x{itemData.item.quantity} </Text>

                            <Text style={styles.priceText}>BDT {itemData.item.quantity * itemData.item.price}</Text>
                        </View>

                        <View style={styles.descriptionQuantity}>
                            <Text style={styles.description}>Free Shipping</Text>

                            <View style={styles.quantity}>

                                <TouchableOpacity
                                    onPress={() => {
                                        itemData.item.inventoryQuantity > 0 ?
                                            updateCart(itemData.item.productId, itemData.item.color, itemData.item.size, itemData.item.quantity - 1) : null
                                    }}
                                >
                                    <AntDesign name="minuscircle" size={25} color='grey' />
                                </TouchableOpacity>

                                <Text>{itemData.item.quantity}</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        itemData.item.inventoryQuantity > 0 ?
                                            updateCart(itemData.item.productId, itemData.item.color, itemData.item.size, itemData.item.quantity + 1) : null
                                    }}>
                                    <AntDesign name="pluscircle" size={25} color='grey' />
                                </TouchableOpacity>



                            </View>






                        </View>


                        <TouchableOpacity onPress={() => {
                            removeFromCart(itemData.item.productId, itemData.item.color, itemData.item.size)
                        }}>
                            <View style={styles.cartX}>
                                <Text style={styles.x}>REMOVE</Text>
                            </View>
                        </TouchableOpacity>



                    </View>

                </View>


            </View>






        )
    }
    let sum = 0;

    for (const key in cartItems) {
        if (cartItems[key].inventoryQuantity > 0) {
            sum += cartItems[key].price * cartItems[key].quantity;
        }

    }
    const vat = sum * 0.05;



    if (!loggedIn) {
        return (
            <AuthRequiredScreen navigation={props.navigation} />
        )

    }


    if (cartItems.length === 0) {
        return (
            <View>
                <Text>no cart items yet!!</Text>
            </View>
        )
    }

    if (isLoading) {
        return <LoadingScreen />
    }






    return (
        <View style={{ ...ScreenStyle, ...styles.screen }}>
            <FlatList
                data={cartItems}
                renderItem={renderItems}
                ListFooterComponent={
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.lightText}>Sub Total</Text>
                            <Text style={styles.lightText}> BDT {sum}</Text>

                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.lightText}>VAT</Text>
                            <Text style={styles.lightText}> BDT {vat}</Text>

                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.lightText}>Delivery</Text>
                            <Text style={styles.lightText}> BDT 60</Text>

                        </View>

                        <View style={styles.summaryTotalRow}>
                            <Text style={styles.totalTextTitle}>Total Payable</Text>
                            <Text style={styles.totalText}>BDT {sum + vat + 60}</Text>


                        </View>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Shipping')}>
                            <View style={styles.buttonContainer}>



                                <Text style={UIButtonTextStyle}>CHECKOUT</Text>




                            </View>
                        </TouchableOpacity>





                    </View>
                }
                style={styles.list}

            />




        </View>
    )







}

const styles = StyleSheet.create(
    {



        list: {
            // marginBottom: 20

        },
        cartItem: {
            margin: 10,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#eae9e9',
            flex: 1,
            height: 200,
            padding: 8,

        },

        seller: {
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            paddingHorizontal: 5,
            borderBottomWidth: 0.5,
            marginBottom: 5

        },
        sellerName: {
            width: 100,
            textAlign: 'left',
            fontSize: 14,
            fontWeight: '600'
        },
        product: {
            flexDirection: 'row',
            flex: 4

        },

        picSizeColor: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        picture: {
            height: 90,
            width: 90,
            alignSelf: 'center'


        },

        namePriceQuantity: {
            flex: 3,
            paddingHorizontal: 10
        },




        itemName: {
            fontSize: 17,
            fontWeight: '700',

            height: 40
        },
        sizeColorContainer: {
            flexDirection: 'row',
            marginTop: 5,
            width: 100,
            justifyContent: 'space-evenly',
            marginLeft: 5
        },
        sizeContainer: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        sizeText: {

            fontWeight: '700'
        },
        // sizeTextContainer: {
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        // },
        priceContainer: {
            alignItems: 'flex-start',
            alignSelf: 'flex-start',

        },
        priceText: {
            fontSize: 18,
            fontWeight: '700',
            minWidth: 100,
            width: '100%',
        },
        descriptionQuantity: {
            flexDirection: 'row',
            flex: 1,
        },
        description: {
            flex: 2,
        },
        quantity: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'

        },
        cartX: {
            justifyContent: 'center',
            marginRight: 10,
            alignItems: 'center',
            alignSelf: 'flex-end',
            width: 100,
            borderWidth: 1.5,
            height: 30
        },
        x: {
            fontSize: 13,
            fontWeight: '700',
            width: 100,
            textAlign: 'center'
        },

        buttonContainer: {
            backgroundColor: Colors.buttonColor,
            height: 50,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            borderRadius: 40

        },
        summaryContainer: {
            padding: 5,
            borderWidth: 0.5,
            borderColor: 'grey',
            marginHorizontal: 10

        },
        summaryRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,



        },

        summaryTotalRow: {
            borderTopColor: 'grey',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10


        },
        lightText: {
            fontWeight: '600',
            color: 'grey'
        },
        totalText: {
            fontWeight: '700',
            color: 'black',
            fontSize: 20,
            marginTop: 10,
            flex: 1,
            textAlign: 'right'
        },
        totalTextTitle: {
            fontWeight: '700',
            color: 'black',
            fontSize: 20,
            marginTop: 10,
            flex: 1,
            textAlign: 'left'
        }


    }
)
