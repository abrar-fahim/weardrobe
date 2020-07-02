import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useSelector, useDispatch } from 'react-redux';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

import Header from '../../components/Header.js'

import { SHOPS } from '../../dummy-data/Sellers'
import DrawerButton from '../../components/DrawerButton';
import ShopRightButtons from '../../components/ShopRightButtons';
import DrawerStack from './DrawerStack';

import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems';
import UIButton from '../../components/UIButton';
import PRODUCTS from '../../dummy-data/Products'
import AuthRequiredScreen from '../AuthRequiredScreen'
import CheckLoggedIn from '../../components/CheckLoggedIn';

import * as orderActions from '../../store/actions/order'
import * as popupActions from '../../store/actions/Popup'

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
    }, [])


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
                        <Text style={styles.date}> {"Ordered: " + Date(itemData.item.date).toLocaleLowerCase()}</Text>

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
            backgroundColor: '#eae9e9',
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
