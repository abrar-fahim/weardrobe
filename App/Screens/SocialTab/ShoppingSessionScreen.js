import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, Entypo, AntDesign, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

import UIButton from '../../components/UIButton'

import * as chatActions from '../../store/actions/chats'
import * as cartActions from '../../store/actions/cart'
import { useSelector, useDispatch } from 'react-redux';
import GenericHeaderButton from '../../components/GenericHeaderButton'
import LoadingScreen from '../../components/LoadingScreen';
import ShoppingSessionTimer from '../../components/ShoppingSessionTimer';



export default function ShoppingSessionScreen(props) {

    const sessionId = props.route.params?.sessionId;
    const groupId = props.route.params?.groupId;

    const activeSessionId = useSelector(state => state.social.activeSessionId)

    const sessionCart = useSelector(state => state.social.sessionCart)
    const userId = useSelector(state => state.auth.userId)

    const [isLoading, setIsLoading] = useState(true)


    const dispatch = useDispatch()

    const loadSessionCart = useCallback(async () => {
        try {

            setIsLoading(true)
            await dispatch(chatActions.getSessionCart(sessionId))
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
        }

    }, [sessionId])

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

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'focus', () => {

                loadSessionCart()
            }

        );

        return willFocusSub;
    }, [loadSessionCart]);

    // useEffect(() => {

    //     loadSessionCart()
    // }, [])

    const renderItems = (itemData) => {
        return (

            <View style={styles.cartEntry}>

                <Image style={{ ...styles.profilePic, alignSelf: userId === itemData.item.customerId ? 'flex-end' : 'flex-start' }} source={itemData.item.profilePic} />

                <Text style={{ ...styles.username, alignSelf: userId === itemData.item.customerId ? 'flex-end' : 'flex-start' }} source={itemData.item.profilePic} >{itemData.item.username}</Text>
                <View style={{ ...styles.cartItem, opacity: itemData.item.inventoryQuantity > 0 ? 1 : 0.5 }}>

                    <View style={styles.seller}>

                        <Text style={styles.sellerName}>Seller: {itemData.item.shopName}</Text>

                    </View>

                    <View style={styles.product}>
                        <View style={styles.picSizeColor}>


                            <TouchableOpacity onPress={() => (props.navigation.navigate('Product', {
                                productId: itemData.item.productId
                            }))}>
                                <Image source={itemData.item.thumbnail} style={styles.picture}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>

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

                        <View style={styles.namePriceQuantity}>
                            <TouchableOpacity onPress={() => (props.navigation.navigate('Product', {
                                productId: itemData.item.productId
                            }))}>
                                <View>
                                    <Text style={styles.itemName}> {itemData.item.productName}</Text>
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

                                    {userId !== itemData.item.customerId ? <Text>Qty: </Text> : null}

                                    {userId === itemData.item.customerId ? <TouchableOpacity
                                        onPress={() => {

                                        }}
                                    >
                                        <AntDesign name="minuscircle" size={25} color='grey' />
                                    </TouchableOpacity> : null}



                                    <Text>{itemData.item.quantity}</Text>

                                    {userId === itemData.item.customerId ? <TouchableOpacity
                                        onPress={() => {

                                        }}>
                                        <AntDesign name="pluscircle" size={25} color='grey' />
                                    </TouchableOpacity> : null}





                                </View>






                            </View>
                            <View style={styles.buttons}>

                                <TouchableOpacity onPress={() => (props.navigation.navigate('GroupChat', {
                                    product: itemData.item,
                                    groupId: groupId,
                                    type: 'GROUP'

                                }))}>
                                    <View style={styles.cartX}>
                                        <Text style={styles.x}>TALK ABOUT</Text>
                                    </View>
                                </TouchableOpacity>

                                {userId === itemData.item.customerId ? <TouchableOpacity onPress={() => {
                                    removeFromCart(itemData.item.productId, itemData.item.color, itemData.item.size)

                                }}>
                                    <View style={styles.cartX}>
                                        <Text style={styles.x}>REMOVE</Text>
                                    </View>
                                </TouchableOpacity> : null}





                            </View>

                        </View>

                    </View>


                </View>
            </View>



        )
    }

    if (isLoading) {
        return <LoadingScreen />
    }
    return (
        <View style={ScreenStyle}>

            {sessionId === activeSessionId ? <ShoppingSessionTimer /> : null}

            <FlatList
                data={sessionCart}
                renderItem={renderItems}
                ListEmptyComponent={
                    <Text> no items yet</Text>

                }
            />


        </View>
    )
}

const styles = StyleSheet.create(
    {
        cartEntry: {
            marginHorizontal: 10,
            marginVertical: 10
        },

        profilePic: {
            height: 30,
            width: 30,
            borderRadius: 15

        },

        cartItem: {
            margin: 10,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#eae9e9',
            flex: 1,
            height: 200,
            padding: 8
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
            height: 100,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center'



        },

        namePriceQuantity: {
            flex: 3,
            paddingHorizontal: 10
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
        buttons: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end'
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


        itemStatus: {
            fontWeight: '200',
            marginTop: 20
        }
    }
)
