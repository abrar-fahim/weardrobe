import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as orderActions from '../../store/actions/order';

export default function ConfirmOrderScreen(props) {

    const userId = useSelector(state => state.auth.userId);

    const profile = useSelector(state => state.profile.myProfile);
    const cartItems = useSelector(state => state.cart.items)

    const dispatch = useDispatch();

    const purchase = useCallback(async () => {
        try {
            await dispatch(orderActions.purchase())
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    // const renderItem = (itemData) => {
    //     return (

    //     )
    // }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.label}>SHIPPING TO</Text>

                </View>
                <View style={styles.body}>
                    <Text>{profile.addresses[0].house}</Text>
                    <Text>{profile.addresses[0].street}</Text>
                    <Text>{profile.addresses[0].city}</Text>

                </View>

            </View>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.label}>YOUR ORDER</Text>



                </View>
                <View style={styles.body}>
                    {cartItems.filter(item => item.inventoryQuantity > 0).map(item => (
                        <View style={styles.cartItem}>

                            <View style={styles.seller}>

                                <Text style={styles.sellerName}>Seller: {item.shopName}</Text>

                            </View>

                            <View style={styles.product}>
                                <View style={styles.picSizeColor}>


                                    <TouchableOpacity onPress={() => (props.navigation.navigate('Product', {
                                        productId: item.productId
                                    }))}>
                                        <Image source={item.picture} style={styles.picture}
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>

                                    <View style={styles.sizeColorContainer}>
                                        {item.color === "" ? null : <FontAwesome name="circle" color={item.color} size={25} />}

                                        {item.size === "" ? null : <View style={styles.sizeContainer}>
                                            {/* <FontAwesome name="circle" color="grey" size={25} /> */}
                                            {/* <View style={styles.sizeTextContainer}> */}
                                            <Text style={styles.sizeText}>{item.size?.toUpperCase()}</Text>
                                            {/* </View> */}

                                        </View>}
                                    </View>


                                </View>

                                <View style={styles.namePriceQuantity}>
                                    <TouchableOpacity onPress={() => (props.navigation.navigate('Product', {
                                        productId: item.productId
                                    }))}>
                                        <View>
                                            <Text style={styles.itemName}> {item.name}</Text>
                                            {/* <Text style={{ fontWeight: '200' }} > {"Ref: " + itemData.item.name}</Text> */}


                                        </View>
                                    </TouchableOpacity>

                                    <View style={styles.priceContainer}>
                                        <Text> {item.price}x{item.quantity} </Text>

                                        <Text style={styles.priceText}>BDT {item.quantity * item.price}</Text>
                                    </View>

                                    <View style={styles.descriptionQuantity}>
                                        <Text style={styles.description}>Free Shipping</Text>

                                        <View style={styles.quantity}>

                                            <Text>Quantity: {item.quantity}</Text>

                                        </View>


                                    </View>


                                </View>

                            </View>


                        </View>

                    ))}
                    {/* <FlatList data={cartItems} renderItem={renderItem} /> */}

                </View>

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    purchase();
                    props.navigation.popToTop();
                }}
            >
                <Text style={styles.buttonText}>Place Order</Text>

            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        paddingVertical: 20,


    },
    container: {
        marginBottom: 100


    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    label: {
        fontSize: 13,
        color: 'grey',
        fontWeight: '700',
        flex: 1

    },
    body: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10
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
    button: {
        marginVertical: 20,
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        height: 50,
        width: '80%',
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        elevation: 2
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
        width: '100%',
        textAlign: 'center'
    }
})