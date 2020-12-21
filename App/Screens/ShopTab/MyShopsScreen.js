import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'
import { useSelector, useDispatch } from 'react-redux';

import { SELLERS } from '../../dummy-data/Sellers'
import DrawerButton from '../../components/DrawerButton';
import ShopRightButtons from '../../components/ShopRightButtons';

import SellerScreen from './SellerScreen'
import DrawerStack from './DrawerStack';
import ScreenStyle from '../../Styles/ScreenStyle';
import { ShopsListScreen } from './ShopsListScreen';

import AuthRequiredScreen from '../AuthRequiredScreen'

import * as ShopActions from '../../store/actions/shops'
import LoadingScreen from '../../components/LoadingScreen';


export default function MyShopsStack({ navigation }) {
    return (
        <DrawerStack name="MyShops" navigation={navigation} component={MyShopsScreen} title="My Shops" />
    )
}

function MyShopsScreen({ navigation }) {



    const loggedIn = useSelector(state => (state.auth.userId == null ? false : true));

    const myShops = useSelector(state => state.shops.myShops)

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    const LoadMyShops = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(ShopActions.fetchMyShops(0))
            setIsLoading(false)
            setIter(0)
        }
        catch (err) {
            console.log(err)
        }

        setIsLoading(false)

    }, [])

    const LoadMoreShops = useCallback(async () => {
        try {

            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(ShopActions.fetchMyShops(0))
                setIter(iter => iter + 1)
                setIterLoading(false)
            }

            setIter(0)
        }
        catch (err) {
            console.log(err)
        }
        setIterLoading(false)

    }, [iter, iterLoading])

    useEffect(() => {
        LoadMyShops()
    }, [])

    if (!loggedIn) {
        return (
            <AuthRequiredScreen navigation={navigation} />
        )
    }


    if(isLoading) {
        return <LoadingScreen />
    }
    return (
        <ShopsListScreen
            navigation={navigation}
            sellers={myShops}
            onEndReached={LoadMoreShops}
            ListEmptyComponent={<Text>no favorite shops</Text>}
        />
    );

}

