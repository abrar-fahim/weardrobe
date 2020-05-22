import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PRODUCTS from '../../dummy-data/Products';

import ProductList from '../../components/ProductList'
import * as productActions from '../../store/actions/products'
import { useSelector, useDispatch } from 'react-redux';


export default function ProductListScreen(props) {

    const [isRefreshing, setIsRefreshing] = useState(false);

    const products = useSelector(state => state.products.products)

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        }
        catch (err) {
            console.log('error')
        }
        setIsRefreshing(false);
    }, [dispatch, setIsRefreshing])
    return (
        <View>
            <ProductList navigation={props.navigation} data={products} onRefresh={loadProducts} refreshing={isRefreshing} />
        </View>
    )
}