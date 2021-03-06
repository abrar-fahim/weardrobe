import 'react-native-gesture-handler';
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

import Header from '../../components/Header.js'

import { SELLERS } from '../../dummy-data/Sellers'
import DrawerButton from '../../components/DrawerButton';
import ShopRightButtons from '../../components/ShopRightButtons';

import SellerScreen from './SellerScreen'
import DrawerStack from './DrawerStack';
import ScreenStyle from '../../Styles/ScreenStyle';
import * as shopsActions from '../../store/actions/shops'





export default function ShopsListStack({ navigation }) {
    return (
        <DrawerStack
            name="MyShops"
            navigation={navigation}
            component={AllShopsScreen}
            title="Browse Stores"
            search='SHOP'

        />
    )
}



function AllShopsScreen(props) {

    const shops = useSelector(state => state.shops.shops)

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)


    const dispatch = useDispatch();

    const loadShops = useCallback(async () => {
        try {
            await dispatch(shopsActions.getShops(0))
            setIter(0)
        }
        catch (err) {
            console.log(err)
        }


    }, [])

    const loadMoreShops = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(shopsActions.getShops(iter))
                setIter(iter => iter + 1)
                setIterLoading(false)
            }

        }
        catch (err) {
            console.log(err)
        }

        setIterLoading(false)


    }, [iter, iterLoading])

    useEffect(() => {
        loadShops();

    }, [])

    return (
        <ShopsListScreen navigation={props.navigation} sellers={shops} onEndReached={loadMoreShops} />
    )
}


export function ShopsListScreen(props) {

    //props = sellers


    const renderGridItem = (itemData) => {
        return (
            <View style={styles.listItem}>
                <Text style={styles.name}>{itemData.item.name}</Text>
                <TouchableOpacity onPress={() => (props.navigation.navigate("Seller", {
                    shopId: itemData.item.id

                }))}>

                    <Image source={itemData.item.logo} style={{ height: '100%', width: '100%' }} />
                </TouchableOpacity>
            </View>
        )

    }

    return (
        <View style={ScreenStyle}>

            <FlatList
                data={props.sellers}
                renderItem={renderGridItem}
                numColumns={1}
                {...props}
            />

        </View>
    );

}



const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    },

    listItem: {
        margin: 15,
        width: '90%',
        height: 120

    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    name: {
        fontWeight: '700',
        fontSize: 15,
        margin: 5
    }
})

