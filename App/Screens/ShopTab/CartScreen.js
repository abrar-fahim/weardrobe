import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
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





import UIButton from '../../components/UIButton'

import * as cartActions from '../../store/actions/cart'
import AuthRequiredScreen from '../AuthRequiredScreen';

import CheckLoggedIn from '../../components/CheckLoggedIn'
import { sub } from 'react-native-reanimated';



export default function CartScreen(props) {

    const loggedIn = CheckLoggedIn();


    const cartItems = useSelector(state => state.cart.items)


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
            await dispatch(cartActions.fetchCartItems())
        } catch (err) {
            console.log(err.message)
        }
        //setIsLoading(false);
    }, [dispatch, removeFromCart, updateCart])



    // useEffect(() => {
    //     loadCartItems()
    // }, [])




    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'focus',
            loadCartItems
        );

        return willFocusSub;
    }, [loadCartItems]);

    //console.log(cartItems)



    const renderItems = (itemData) => {
        return (

            <View style={styles.cartItemContainer}>


                <View style={styles.cartItem}>

                    <TouchableOpacity onPress={() => (props.navigation.navigate('Product', {
                        productId: itemData.item.id
                    }))}>
                        <Image source={itemData.item.picture} style={{ height: 70, width: 70, borderRadius: 35 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => (props.navigation.navigate('Product', {
                        productId: itemData.item.id
                    }))}>
                        <View>
                            <Text style={styles.itemName}> {itemData.item.name}</Text>
                            {/* <Text style={{ fontWeight: '200' }} > {"Ref: " + itemData.item.name}</Text> */}
                            <View style={styles.sizeColorContainer}>
                                {itemData.item.color === null ? null : <FontAwesome name="circle" color={itemData.item.color} size={25} />}

                                {itemData.item.size === null ? null : <View style={styles.sizeContainer}>
                                    {/* <FontAwesome name="circle" color="grey" size={25} /> */}
                                    {/* <View style={styles.sizeTextContainer}> */}
                                    <Text style={styles.sizeText}>{itemData.item.size?.toUpperCase()}</Text>
                                    {/* </View> */}

                                </View>}





                            </View>

                        </View>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>

                        <Text>{itemData.item.quantity}</Text>

                        <View style={{ justifyContent: 'space-evenly', height: '99%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    updateCart(itemData.item.id, itemData.item.color, itemData.item.size, itemData.item.quantity + 1)
                                }}>
                                <AntDesign name="pluscircle" size={35} color='grey' />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    updateCart(itemData.item.id, itemData.item.color, itemData.item.size, itemData.item.quantity - 1)
                                }}
                            >
                                <AntDesign name="minuscircle" size={35} color='grey' />
                            </TouchableOpacity>



                        </View>
                    </View>


                    <View style={styles.priceContainer}>
                        <Text> {itemData.item.price}x{itemData.item.quantity} </Text>

                        <Text style={styles.priceText}>BDT {itemData.item.quantity * itemData.item.price}</Text>
                    </View>


                </View>


                <TouchableOpacity onPress={() => {
                    removeFromCart(itemData.item.id, itemData.item.color, itemData.item.size)
                }}>
                    <View style={{ justifyContent: 'center', marginRight: 0, alignItems: 'center' }}>
                        <Text>X</Text>
                    </View>
                </TouchableOpacity>


            </View>
        )
    }
    let sum = 0;

    for (const key in cartItems) {
        sum += cartItems[key].price * cartItems[key].quantity;
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
                            <Text style={styles.totalText}>Total Payable</Text>
                            <Text style={styles.totalText}>BDT {sum + vat + 60}</Text>


                        </View>





                    </View>
                }
                style={styles.list}

            />


            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                <View style={styles.buttonContainer}>



                    <Text style={UIButtonTextStyle}>CHECKOUT</Text>




                </View>
            </TouchableOpacity>

        </View>
    )







}

const styles = StyleSheet.create(
    {

        list: {
            marginBottom: 20

        },

        cartItemContainer: {
            flexDirection: 'row',
            flex: 1,
            padding: 5,
            height: 150,
            alignItems: 'center'
        },
        cartItem: {
            marginRight: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#eae9e9',
            flex: 1,
            height: 120,
            width: 400,
            marginLeft: 1,
            padding: 8
        },

        itemName: {
            fontSize: 17,
            fontWeight: '700',
            maxWidth: Dimensions.get('window').width / 3,
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

            fontWeight: '600'
        },
        sizeTextContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        priceContainer: {
            alignItems: 'flex-end',
            alignSelf: 'flex-end',

        },
        priceText: {
            fontSize: 18,
            fontWeight: '700',
            minWidth: 100,
        },
        buttonContainer: {
            backgroundColor: Colors.buttonColor,
            height: 50,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',

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
            marginTop: 10
        }


    }
)
