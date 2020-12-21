import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ScreenStyle from '../../Styles/ScreenStyle'
import DrawerStack from './DrawerStack';
import ProductList from '../../components/ProductList';
import PRODUCTS from '../../dummy-data/Products';
import ProductListScreen from './ProductListScreen';

import { useSelector, useDispatch } from 'react-redux';

import * as wishlistActions from '../../store/actions/wishlist'
import AuthRequiredScreen from '../AuthRequiredScreen'

import checkLoggedIn from '../../components/CheckLoggedIn'
import LoadingScreen from '../../components/LoadingScreen';

export default function FavoritesStack({ navigation }) {
    return (
        <DrawerStack name="Favorites" navigation={navigation} component={FavoritesScreen} title="My Favorites" />
    )
}


function FavoritesScreen(props) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const items = useSelector(state => state.wishlist.items)

    const loggedIn = checkLoggedIn();


    const dispatch = useDispatch();

    const loadItems = useCallback(async () => {
        setIsRefreshing(true);
        try {
            setIsLoading(true)
            await dispatch(wishlistActions.fetchItems());
            setIsLoading(false)
        }
        catch (err) {
            console.log(err.message)
        }
        setIsRefreshing(false);
        setIsLoading(false)
    }, [])

    // useEffect(() => {
    //     loadItems();
    //     console.log('loaded wishlist items')
    // }, [dispatch])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'focus',
            loadItems
        );

        return willFocusSub;
    }, [loadItems]);

    if (!loggedIn) {
        return (
            <AuthRequiredScreen navigation={props.navigation} />
        )
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    if (items.length === 0) {
        return (
            <View>
                <Text>no wishlist items yet!</Text>
            </View>
        )
    }

    return (
        <View>
            <ProductList navigation={props.navigation} data={items} onRefresh={loadItems} refreshing={isRefreshing} />
        </View>
    )
}