import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import DrawerStack from './DrawerStack';

import ScreenStyle from '../../Styles/ScreenStyle'
import PRODUCTS from '../../dummy-data/Products'
import AuthRequiredScreen from '../AuthRequiredScreen'
import CheckLoggedIn from '../../components/CheckLoggedIn';

import * as orderActions from '../../store/actions/order'
import * as popupActions from '../../store/actions/Popup'
import Time from '../../components/Time';

const ORDERS = [
    {
        id: '2',
        products: PRODUCTS,
        shops: ['YELLOW'],
        deliveryDate: '5-5-2020',
        status: 'delivered',
        due: 500,
        reference: 'abc'
    },
    {
        id: '1',
        products: PRODUCTS,
        shops: ['Cats Eye'],
        deliveryDate: '5-5-2020',
        status: 'shipping',
        due: 500,
        reference: 'abc'
    },
    {
        id: '3',
        products: PRODUCTS,
        shops: ['YELLOW'],
        deliveryDate: '5-5-2020',
        status: 'order placed',
        due: 500,
        reference: 'abc'
    },
    {
        id: '4',
        products: PRODUCTS,
        shops: ['Cats Eye'],
        deliveryDate: '5-5-2020',
        status: 'shipping',
        due: 500,
        reference: 'abc'
    }
]


export default function MyOrdersStack({ navigation }) {
    return (
        <DrawerStack name="MyOrders" navigation={navigation} component={MyOrdersScreen} title="My Orders" />
    )
}

function MyOrdersScreen(props) {

    const loggedIn = CheckLoggedIn();

    const [isLoading, setIsLoading] = useState(true);

    const orders = useSelector(state => state.order.orders);
    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch()

    const getOrders = useCallback(async () => {
        //setIsLoading(true);
        try {
            setIsLoading(true)
            await dispatch(orderActions.getOrders())
            setIsLoading(false)
        } catch (err) {
            console.log(err.message)
            dispatch(popupActions.setMessage("Couldn't get orders", true))
        }
        //setIsLoading(false);
    })

    useEffect(() => {
        getOrders()
    }, [userId])


    const renderItems = (itemData) => {

        return (
            <TouchableOpacity onPress={() => (props.navigation.navigate('Order', {
                order: itemData.item
            }))}>

                <View style={styles.orderContainer}>

                    <View style={styles.shopRef}>


                        <Text style={styles.ref}> {"id: " + itemData.item.id}</Text>
                    </View>

                    <Text style={styles.status}> {"Status: " + itemData.item.paymentStatus}</Text>

                    <View style={styles.shopRef}>


                        <Text style={styles.due}> {"BDT " + itemData.item.total}</Text>
                        {/* <Text>Ordered: </Text>
                        <Time style={styles.date} value={itemData.item.date} /> */}

                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    if (!loggedIn) {
        return (
            <AuthRequiredScreen navigation={props.navigation} />
        )
    }
    return (
        <View style={{ ...ScreenStyle, ...styles.screen }}>
            <FlatList data={orders} renderItem={renderItems} />


        </View>
    )
}

const styles = StyleSheet.create(
    {
        orderContainer: {
            marginRight: 10,
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: 'white',
            flex: 1,

            padding: 10,
            margin: 10
        },
        screen: {
            paddingBottom: 10
        },
        shopRef: {
            flexDirection: 'row',

            width: '100%'
        },
        ref: {
            fontWeight: '300',
            color: 'grey',
            flex: 1
        },
        shop: {
            fontWeight: '700',
            fontSize: 17
        },
        due: {

            fontWeight: '700',
            fontSize: 18,
            flex: 1

        },
        date: {
            fontWeight: '300',
            flex: 1

        },
        status: {
            fontWeight: '300',


        }
    }
)
