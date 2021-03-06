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
import { ShopsListScreen } from './ShopsListScreen';

import * as searchActions from '../../store/actions/search'

import { useSelector, useDispatch } from 'react-redux';
import GenericHeaderButton from '../../components/GenericHeaderButton';
import { Ionicons } from '@expo/vector-icons';
import MySearchBar from '../../components/MySearchBar';
import LoadingScreen from '../../components/LoadingScreen';


export default function ShopSearchScreen(props) {

    const dispatch = useDispatch();
    const shops = useSelector(state => state.search.shops)

    const [name, setName] = useState('')

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const searchAllShops = useCallback(async (name) => {
        try {
            setIsLoading(true)
            await dispatch(searchActions.searchAllShops(name, 0))
            setIsLoading(false)
            setIter(0)
        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false)

    })

    const loadMoreShops = useCallback(async () => {
        try {

            if (!iterLoading) {
                setIterLoading(true);
                await dispatch(searchActions.searchAllShops(name, iter))
                setIter(iter => iter + 1)
                setIterLoading(false);
            }

        }
        catch (err) {
            console.log(err)
        }
        setIterLoading(false);

    }, [name, iterLoading, iter])


    
    return (
        <View style={{ flexDirection: 'column', marginTop: 30, ...ScreenStyle }}>
            <MySearchBar
                placeholder="Search for Shops..."
                onChangeText={(text) => {
                    setName(text)
                    searchAllShops(text)
                }}
                navigation={props.navigation}
                showBackButton={true}

            />

            



            <View style={styles.productsContainer}>
                <ShopsListScreen
                    onEndReached={loadMoreShops}
                    navigation={props.navigation}
                    sellers={shops}
                    ListEmptyComponent={
                        <View>
                            <Text>no shops found!</Text>
                        </View>
                    } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',


    },
    productsContainer: {
        flex: 1

    }
})