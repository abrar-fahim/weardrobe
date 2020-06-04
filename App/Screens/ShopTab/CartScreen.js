import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
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
        // console.log(itemData.item)
        return (

            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 5, height: 120, alignItems: 'center' }}>


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
                            <Text style={{ fontSize: 17, fontWeight: '400' }}> {itemData.item.name}</Text>
                            <Text style={{ fontWeight: '200' }} > {"Ref: " + itemData.item.name}</Text>
                            <View style={styles.sizeColorContainer}>
                                <FontAwesome name="circle" color={itemData.item.color} size={25} />


                                <View style={styles.sizeContainer}>
                                    {/* <FontAwesome name="circle" color="grey" size={25} /> */}
                                    {/* <View style={styles.sizeTextContainer}> */}
                                    <Text style={styles.sizeText}>{itemData.item.size}</Text>
                                    {/* </View> */}

                                </View>

                            </View>

                        </View>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 70, alignItems: 'center' }}>
                        <Text>{itemData.item.quantity}</Text>
                        <View style={{ justifyContent: 'space-between', height: 50 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    updateCart(itemData.item.id, itemData.item.color, itemData.item.size, itemData.item.quantity + 1)
                                }}>
                                <AntDesign name="pluscircle" size={20} color='grey' />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    updateCart(itemData.item.id, itemData.item.color, itemData.item.size, itemData.item.quantity - 1)
                                }}
                            >
                                <AntDesign name="minuscircle" size={20} color='grey' />
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
            <FlatList data={cartItems} renderItem={renderItems} />


            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonPriceContainer}>
                        <Text style={styles.buttonText}>SUBTOTAL - BDT {sum}</Text>
                        <Text style={styles.buttonText}>VAT - BDT {vat}</Text>
                        <Text style={styles.buttonText}>DELIVERY - BDT 60</Text>

                    </View>
                    <View style={styles.buttonCheckoutContainer}>
                        <Text style={styles.buttonTotalText}>BDT {sum + vat + 60}</Text>

                        <Text style={UIButtonTextStyle}>CHECKOUT</Text>
                    </View>



                </View>
            </TouchableOpacity>

        </View>
    )







}

const styles = StyleSheet.create(
    {
        cartItem: {
            marginRight: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#eae9e9',
            flex: 1,
            height: 100,
            width: 400,
            marginLeft: 1,
            padding: 10
        },
        screen: {
            paddingBottom: 10
        },
        sizeColorContainer: {
            flexDirection: 'row',
            marginTop: 5,
            width: 100,
            justifyContent: 'space-between',
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
            marginRight: 15,
            alignSelf: 'flex-end'

        },
        priceText: {
            fontSize: 18,
            fontWeight: '500'
        },
        buttonContainer: {
            backgroundColor: Colors.buttonColor,
            height: 80,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 5

        },
        buttonText: {
            color: 'white',
            fontSize: 13,
            fontWeight: '600'
        },
        buttonPriceContainer: {

        },
        buttonCheckoutContainer: {
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '80%'
        },
        buttonTotalText: {
            fontSize: 25,
            color: 'white',
            fontWeight: '800'
        }

    }
)
