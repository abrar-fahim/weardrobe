import React, { useEffect, useState, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems'

import { Ionicons, Entypo, AntDesign, Feather } from '@expo/vector-icons';
import * as orderActions from '../../store/actions/order';
import * as popupActions from '../../store/actions/Popup';

import UIButton from '../../components/UIButton';
import Colors from '../../Styles/Colors';
import UICircle from '../../components/UICircle';
import { useDispatch } from 'react-redux';



export default function OrderScreen(props) {

    const order = props.route.params?.order;



    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();


    const getProducts = useCallback(async () => {
        //setIsLoading(true);
        try {
            setIsLoading(true)
            const gotProducts = await orderActions.getOrderDetailsDirect(order.id);
            // gotProducts.sort((a, b) => (
            //     a.deliveryStatus === b.deliveryStatus ? -1 : 0
            // ));

            setProducts(gotProducts);

            setIsLoading(false)
        } catch (err) {
            console.log(err.message)
            dispatch(popupActions.setMessage("Couldn't get order", true))
        }
        //setIsLoading(false);
    }, [order])

    useEffect(() => {
        getProducts();

    }, [order])




    const renderItems = (itemData) => {

        return (
            <TouchableOpacity style={styles.cartItem} onPress={() => {
                props.navigation.navigate('Product', {
                    productId: itemData.item.productId
                })
            }}>
                <Image source={itemData.item.thumbnail} style={styles.thumbnail}
                />

                <View style={styles.nameColorSize}>
                    <Text style={styles.name}>{itemData.item.name}</Text>
                    <View style={styles.colorSize}>
                        <Text style={{ ...styles.color, backgroundColor: itemData.item.color.toLowerCase() }} />
                        <Text style={styles.size} > {itemData.item.size.toUpperCase()}</Text>

                    </View>




                </View>





                <View style={styles.cartPriceContainer}>
                    <Text style={styles.cartPrice}> {"৳ " + itemData.item.price + " x " + itemData.item.quantity} </Text>
                    <Text style={styles.itemTotalPrice}> {"৳ " + itemData.item.price * itemData.item.quantity}</Text>


                </View>



            </TouchableOpacity>



        )
    }

    function orderFlow() {
        return (
            <View style={styles.flowContainer}>
                <Text style={styles.heading}>Order Summary</Text>
                <View style={styles.stepContainer}>
                    <View style={styles.iconText}>
                        {/* <Feather name="check-circle" size={20} /> */}
                        <UICircle active={true} />


                        <Text style={styles.stepText}>ORDER PLACED</Text>

                    </View>
                    <View style={styles.lineProducts}>
                        <View style={styles.flowLine} />
                        <FlatList data={products.filter(item => item.deliveryStatus === "NOT_DELIVERED")} renderItem={renderItems} style={{ flex: 1 }} />

                    </View>





                    <View style={styles.iconText}>
                        <UICircle active={false} />
                        <Text style={styles.stepText}>ORDER ACCEPTED</Text>

                    </View>
                    <View style={styles.flowLine} />



                    <View style={styles.iconText}>
                        <UICircle active={false} />
                        <Text style={styles.stepText}>PROCESSING ORDER AND ASSIGNING RIDER</Text>

                    </View>
                    <View style={styles.flowLine} />




                    <View style={styles.iconText}>
                        <UICircle active={false} />
                        <Text style={styles.stepText}>DELIVERED</Text>

                    </View>

                </View>
            </View>
        )
    }
    return (
        <View style={{ ...ScreenStyle, ...styles.screen }}>


            <FlatList ListHeaderComponent={orderFlow} data={[]}
                ListFooterComponent={
                    <View style={styles.bottom}>

                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> Subtotal </Text>
                            <Text style={styles.price} > BDT {order.subTotal}</Text>
                        </View>

                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> VAT </Text>
                            <Text style={styles.price} > BDT {order.vat}</Text>
                        </View>
                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> Delivery </Text>
                            <Text style={styles.price} > BDT {order.deliveryCharge}</Text>
                        </View>
                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> Discount </Text>
                            <Text style={styles.price} > BDT {order.discount}</Text>
                        </View>


                        <View style={styles.totalBottomRow}>
                            <Text style={styles.totalPriceLabel}> Total Payable </Text>
                            <Text style={styles.totalPrice} > BDT {order.subTotal}</Text>
                        </View>

                    </View>

                }
            />


        </View>
    )
}

const styles = StyleSheet.create({

    screen: {
        paddingBottom: 10
    },
    cartItem: {
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10
    },
    thumbnail: {
        height: 50,
        width: 50,
        resizeMode: "contain",
        flex: 1

    },
    nameColorSize: {
        marginLeft: 5,
        flex: 5

    },
    name: {
        fontFamily: 'PlayfairDisplay_600SemiBold',
        fontSize: 20,
        flex: 1,
        marginVertical: 5

    },
    colorSize: {
        flexDirection: 'row',
    },
    color: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginRight: 10
    },
    size: {
        fontWeight: '700',
        color: 'grey'
    },
    cartPriceContainer: {
        flexDirection: 'column',
        flex: 3,


    },
    cartPrice: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'right'

    },
    itemTotalPrice: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'right',


    },

    heading: {
        fontSize: 30,
        fontWeight: '700'

    },
    flowContainer: {
        marginLeft: 20,
        marginTop: 40,
        marginBottom: 30

    },
    stepContainer: {
        marginTop: 20,
        marginLeft: 10,

    },
    iconText: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center'
    },

    flowLine: {
        alignItems: 'flex-start',
        backgroundColor: 'grey',
        minHeight: 40,
        width: 3,
        opacity: 0.3,
        marginLeft: 4.5


    },
    stepText: {
        fontFamily: 'WorkSans_400Regular',
        color: 'grey',
        marginLeft: 20,
        fontSize: 17,
        width: '100%'
    },
    lineProducts: {
        flexDirection: 'row',

    },
    bottom: {
        backgroundColor: 'white',
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 0.5,
        padding: 10

    },
    price: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
        alignSelf: 'flex-end'
    },
    totalPriceLabel: {
        color: 'black',
        fontWeight: '700',
        fontSize: 18,
        flex: 1,
        textAlign: 'left'

    },
    totalPrice: {
        color: 'black',
        fontWeight: '700',
        fontSize: 18,
        flex: 1,
        textAlign: 'right'

    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    totalBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        marginHorizontal: 5,
        alignItems: 'center',
    }
})
