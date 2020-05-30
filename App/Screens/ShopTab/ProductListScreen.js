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
import SmallPopup from '../../components/SmallPopup';


export default function ProductListScreen(props) {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage]  = useState('error')

    const products = useSelector(state => state.products.products)

    //const errorMessage = useSelector(state => state.products.errorMessage)

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {

        let mounted = true;
        setIsRefreshing(true);
        try {
            if (mounted) {
                await dispatch(productActions.fetchProducts());
            }

        }
        catch (err) {
            //console.log('error heter')
            setErrorMessage('Couldnt get products')
            setIsModalVisible(true);
        }
        setIsRefreshing(false);
        return () => mounted = false;

    }, [dispatch, setIsRefreshing])

    useEffect(() => {
        loadProducts();

    }, [dispatch])

    return (
        <>
        <SmallPopup  setIsVisible={setIsModalVisible} text={errorMessage} isVisible={isModalVisible}/>
            <View>
                <ProductList navigation={props.navigation} data={products} onRefresh={loadProducts} refreshing={isRefreshing} />
            </View>
        </>

    )
}