import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import {HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'

import { SHOPS } from '../../dummy-data/Sellers'
import PRODUCTS from '../../dummy-data/Products'

import CheckoutScreen from  './CheckoutScreen'
import CartScreen from './CartScreen';
import DealsStack from './DealsScreens'
import CategoriesStack from './CategoriesScreens'

import SearchOverlay from '../../components/SearchOverlay'

import DrawerButton from '../../components/DrawerButton'
import ShopRightButtons from '../../components/ShopRightButtons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GroupShopRightButtons from '../../components/GroupShopRightButtons';
import DrawerStack from './DrawerStack';
import ProductList from '../../components/ProductList';
import ScreenStyle from '../../Styles/ScreenStyle'



function ShopScreen({navigation}) {

    // const [visible, setVisible] = useState(false);

    // const  toggleOverlay = () => {
    //     setVisible(!visible);
    // }

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => {
    //             return(
    //                 <DrawerButton navigation={navigation}/>
    //             )
    //         }
    //     })
    // })
    
    return (
        <View style={ScreenStyle}>
        <ProductList data={PRODUCTS} navigation={navigation}/>

        </View>
    );

}



export default function ShopStack(props) {
    return (
        <DrawerStack name="Shop" navigation={props.navigation} component={ShopScreen} title="Shop"/>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    },

    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        width: 150
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
})