import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'

import { SHOPS } from '../../dummy-data/Sellers'

import DrawerButton from '../../components/DrawerButton'
import ShopRightButtons from '../../components/ShopRightButtons';
import DrawerStack from './DrawerStack';
import ScreenStyle from '../../Styles/ScreenStyle';
import { CATEGORIES } from '../../dummy-data/Categories';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import * as productsActions from '../../store/actions/products'
import * as shopActions from '../../store/actions/shops'
import * as searchActions from '../../store/actions/search'
import MySearchBar from '../../components/MySearchBar';

export function CategoriesSearchScreen(props) {

    const dispatch = useDispatch();

    const categories = useSelector(state => state.search.categories)

    const [name, setName] = useState('')

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    const searchCategories = useCallback(async (name) => {
        try {
            await dispatch(searchActions.searchCategories(name, 0))
            setIter(0)
        }
        catch (err) {
            console.log(err)
        }

    })

    const laodMoreCategories = useCallback(async () => {
        console.log(name)
        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(searchActions.searchCategories(name, iter))
                setIter(iter => iter + 1)
                setIterLoading(false)
            }

        }
        catch (err) {
            console.log(err)
        }
        setIterLoading(false)

    }, [name, iter, iterLoading])



    const setProductsFn = useCallback(async (categoryId) => {
        try {
            await dispatch(productsActions.getProductsFn(() => (productsActions.fetchProductsByCategory(categoryId))))
        }
        catch (err) {
            console.log(err)
        }
    }, [dispatch])

    function renderItems(itemData) {
        return (

            <View style={styles.gridItem}>
                <TouchableOpacity onPress={() => {
                    setProductsFn(itemData.item.id)
                    props.navigation.navigate('ProductList')
                }}>
                    <Image style={styles.imageStyle} source={itemData.item.picture} />
                    <Text style={styles.textStyle}>{itemData.item.name}</Text>

                </TouchableOpacity>
            </View>


        )

    }
    return (
        <View style={styles.screen}>

            <MySearchBar
                placeholder="Search for categories..."
                onChangeText={(text) => {
                    setName(text)
                    searchCategories(text)
                }}
                navigation={props.navigation}
                showBackButton={true}
            />

            <FlatList
                data={categories}
                renderItem={renderItems}
                numColumns={2}
                ListEmptyComponent={
                    <Text>No categories found!</Text>
                }
                onEndReached={laodMoreCategories}

            />

        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        flex: 1,  //ensures that this view takes all space it can get
        paddingTop: 20
    },

    gridItem: {
        width: '40%',
        margin: 10,
        height: 150,

    },
    imageStyle: {
        height: '80%',
        width: '80%',
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: 5
    }
})