import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'
import { useSelector, useDispatch } from 'react-redux';

import { SELLERS } from '../../dummy-data/Sellers'
import DrawerButton from '../../components/DrawerButton';
import ShopRightButtons from '../../components/ShopRightButtons';

import SellerScreen from './SellerScreen'
import DrawerStack from './DrawerStack';
import ScreenStyle from '../../Styles/ScreenStyle';
import { ShopsListScreen } from './ShopsListScreen';

import AuthRequiredScreen from '../AuthRequiredScreen'


export default function MyShopsStack({ navigation }) {
    return (
        <DrawerStack name="MyShops" navigation={navigation} component={MyShopsScreen} title="My Shops" />
    )
}

function MyShopsScreen({ navigation }) {



    const loggedIn = useSelector(state => (state.auth.userId == null ? false : true));

    const myShops = useSelector(state => state.shops.myShops)

    if (!loggedIn) {
        return (
            <AuthRequiredScreen navigation={navigation} />
        )
    }


    return (
        <ShopsListScreen navigation={navigation} sellers={myShops} />
    );

}

