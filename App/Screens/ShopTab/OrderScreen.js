import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems'

import { Ionicons, Entypo, AntDesign, Feather } from '@expo/vector-icons';

import UIButton from '../../components/UIButton'
import Colors from '../../Styles/Colors';
import UICircle from '../../components/UICircle';



export default function OrderScreen(props) {

    const order = props.route.params?.order;


    const renderItems = (itemData) => {

        return (




            <TouchableOpacity style={styles.cartItem} onPress={() => {
                props.navigation.navigate('Product', {
                    productId: itemData.item.id
                })
            }}>


                <Image source={itemData.item.thumbnail} style={styles.thumbnail} />



                <Text style={styles.name}> {itemData.item.name}</Text>
                {/* <Text style={{ fontWeight: '200' }} > {"Ref: " + itemData.item.id}</Text> */}





                <Text style={styles.quantity}>{itemData.item.quantity}</Text>




                <Text style={styles.cartPrice}> {"BDT " + itemData.item.price} </Text>

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


                        <Text style={styles.stepText}> Order Placed</Text>

                    </View>
                    <View style={styles.flowLine} />




                    <View style={styles.iconText}>
                        <UICircle active={false} />
                        <Text style={styles.stepText}> Order Accepted</Text>

                    </View>
                    <View style={styles.flowLine} />



                    <View style={styles.iconText}>
                        <UICircle active={false} />
                        <Text style={styles.stepText}> Processing Order and Assigning Rider</Text>

                    </View>
                    <View style={styles.flowLine} />




                    <View style={styles.iconText}>
                        <UICircle active={false} />
                        <Text style={styles.stepText}> Delivered</Text>

                    </View>

                </View>
            </View>
        )
    }
    return (
        <View style={{ ...ScreenStyle, ...styles.screen }}>


            <FlatList ListHeaderComponent={orderFlow} data={order.products} renderItem={renderItems}
                ListFooterComponent={
                    <View style={styles.bottom}>

                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> Subtotal </Text>
                            <Text style={styles.price} > BDT 700</Text>
                        </View>

                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> VAT </Text>
                            <Text style={styles.price} > BDT 20</Text>
                        </View>

                        <View style={styles.totalBottomRow}>
                            <Text style={styles.totalPriceLabel}> Total Payable </Text>
                            <Text style={styles.totalPrice} > BDT 720</Text>
                        </View>

                    </View>

                }
            />


        </View>
    )
}

const styles = StyleSheet.create(
    {

        screen: {
            paddingBottom: 10
        },
        cartItem: {
            marginVertical: 20,
            marginHorizontal: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,


            padding: 10
        },
        thumbnail: {
            height: 50,
            width: 50,
            borderRadius: 25
        },
        name: {
            fontSize: 17,
            fontWeight: '400',
            flex: 4
        },
        quantity: {
            flex: 1,
            fontWeight: '700'

        },
        cartPrice: {
            fontSize: 15,
            fontWeight: '700'

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
            height: 80,
            width: 3,
            opacity: 0.3,
            marginLeft: 4.5


        },
        stepText: {
            fontWeight: '500',
            marginLeft: 20,
            fontSize: 16,
            width: '100%'
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
    }
)
