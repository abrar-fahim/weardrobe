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
import LoadingScreen from '../../components/LoadingScreen'


export default function ProductListScreen(props) {

    const fetchProducts = props.route.params?.getProducts
    const categoryId = props.route.params?.categoryId
    const showShopName = props.route.params?.showShopName

    const [isRefreshing, setIsRefreshing] = useState(false);
    // const [isModalVisible, setIsModalVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const products = useSelector(state => state.products.products)
    const getProductsFn = useSelector(state => state.products.getProductsFn)

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        try {
            setIsLoading(true);

            await dispatch(getProductsFn(0));
            setIter(0)

            setIsLoading(false)

        }
        catch (err) {
        }


    }, [isLoading])

    const loadMoreProducts = useCallback(async () => {
        // console.log(iterLoading)
        try {
            if (!iterLoading) {
                setIterLoading(true);
                await dispatch(getProductsFn(iter));
                setIter(iter => iter + 1)
                setIterLoading(false)
            }
        }
        catch (err) {

        }
        setIterLoading(false)
    }, [iter, iterLoading])


    useEffect(() => {
        loadProducts();

    }, [dispatch])

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }



    return (
        <>

            <View>
                <ProductList
                    showShopName={showShopName}
                    navigation={props.navigation}
                    data={products}
                    onRefresh={loadProducts}
                    refreshing={isRefreshing}
                    onEndReached={() => {

                        loadMoreProducts()
                    }}
                />
            </View>
        </>

    )
}