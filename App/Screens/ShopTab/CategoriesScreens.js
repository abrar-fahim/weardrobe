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

export default function CategoriesStack({ navigation }) {
    return (
        <DrawerStack
            name="Categories"
            navigation={navigation}
            component={CategoriesScreen}
            search="CATEGORY"
        />
    )

}

export function CategoriesScreen(props) {

    const dispatch = useDispatch();

    const categories = props.route.params?.shopId ? useSelector(state => state.shops.categories) : props.route.params?.parentCategoryId ? null : useSelector(state => state.products.categories)

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(true);

    const [childCategories, setChildCategories] = useState([]);


    const laodCategories = useCallback(async () => {

        try {
            if (props.route.params?.shopId) {
                setIsLoading(true)

                await dispatch(shopActions.fetchShopCategories(props.route.params?.shopId))

                setIsLoading(false)
            }
            else {
                setChildCategories(await productsActions.fetchChildrenCategoriesDirect(props.route.params.parentCategoryId));
            }
            setIter(0)


        }
        catch (err) {
            console.log(err)
        }

        setIsLoading(false)
    }, [props.route.params])

    const laodMoreCategories = useCallback(async () => {

        try {

            if (!iterLoading) {
                setIterLoading(true);
                if (props.route.params?.shopId) {

                    await dispatch(shopActions.fetchShopCategories(props.route.params?.shopId, iter))
                }
                else {
                    await dispatch(productsActions.fetchCategories(iter))
                }

                setIter(iter => iter + 1)

                setIterLoading(false)

            }


        }
        catch (err) {
            console.log(err)
        }
        setIterLoading(false)

    }, [iterLoading, iter])




    useEffect(() => {

        laodCategories()
    }, [])

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


            <TouchableOpacity
                onPress={() => {
                    setProductsFn(itemData.item.id)
                    props.navigation.navigate('ProductList')
                }}
                style={styles.gridItem}
            >
                <Image style={styles.image} source={itemData.item.thumbnail} />

                <View style={itemData.index % 4 === 0 ? styles.textContainer : itemData.index % 4 === 1 ? styles.textContainer1 : itemData.index % 4 === 2 ? styles.textContainer2 : styles.textContainer3}>
                    <Text style={styles.text}>{itemData.item.name.toUpperCase()}</Text>
                </View>



            </TouchableOpacity>



        )

    }
    return (
        <View style={styles.screen}>

            <FlatList
                data={props.route.params?.parentCategoryId ? childCategories : categories}
                renderItem={renderItems}

                onEndReached={laodMoreCategories}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        flex: 1  //ensures that this view takes all space it can get
    },

    gridItem: {
        width: '100%',
        height: 300,

    },
    image: {
        height: '100%',
        width: '100%',
        alignSelf: 'center'
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(119,66,168,0.4)',

    },
    textContainer1: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(178,24,0,0.4)',

    },

    textContainer2: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,164,172,0.4)',

    },

    textContainer3: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(227,158,61,0.4)',

    },

    text: {
        fontFamily: 'WorkSans_500Medium',
        fontSize: 30,
        color: 'white'


    }
})