import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SearchBar, Overlay } from 'react-native-elements';

import BackButton from '../../components/BackButton'
import ScreenStyle from '../../Styles/ScreenStyle';
import ProductList from '../../components/ProductList'
import PRODUCTS from '../../dummy-data/Products'

import * as searchActions from '../../store/actions/search'

import { useSelector, useDispatch } from 'react-redux';
import GenericHeaderButton from '../../components/GenericHeaderButton';
import { Ionicons } from '@expo/vector-icons';
import MySearchBar from '../../components/MySearchBar';
import LoadingScreen from '../../components/LoadingScreen';


export default function SearchScreen(props) {

    const dispatch = useDispatch();
    const products = useSelector(state => state.search.products)

    const [name, setName] = useState('')

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    

    const searchAllProducts = useCallback(async (name) => {
        try {

            

            await dispatch(searchActions.searchAllProducts(name, 0))
            
            setIter(0)
        }
        catch (err) {
            console.log(err)
        }

        

    })

    const loadMoreProducts = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true);
                await dispatch(searchActions.searchAllProducts(name, iter))
                setIterLoading(false);


            }

        }
        catch (err) {
            console.log(err)
        }

        setIterLoading(false);
    }, [name, iter, iterLoading])



    return (
        <View style={{ flexDirection: 'column', marginTop: 30, ...ScreenStyle }}>
            {/* <View style={styles.searchBarContainer}>
                <BackButton navigation={props.navigation}/>
                <SearchBar placeholder="Search..." lightTheme={true} containerStyle={{flex: 1}} platform={Platform.OS}/>
            </View> */}

            <MySearchBar
                placeholder="Search for products..."
                onChangeText={(text) => {
                    setName(text);
                    searchAllProducts(text)
                }}
                navigation={props.navigation}
                showBackButton={true}
            />



            <View style={styles.productsContainer}>
                <ProductList
                    navigation={props.navigation}
                    data={products}
                    onEndReached={loadMoreProducts}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',


    },
    productsContainer: {

    }
})