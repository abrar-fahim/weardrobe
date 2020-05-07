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

import CheckoutScreen from  './CheckoutScreen'
import CartScreen from './CartScreen';
import DealsStack from './DealsScreens'
import CategoriesStack from './CategoriesScreens'
import ShopStack from './ShopScreens'
import MyShopsStack from './MyShopsScreen';


export default function ShopDrawer() {
    const ShopDrawer = createDrawerNavigator();
    return (
        <ShopDrawer.Navigator 
            drawerStyle={{
                width: 250
            }}
            drawerContentOptions={{
                itemStyle: {marginRight: 20},
                labelStyle: {width: 100}
            }}
         >
            <ShopDrawer.Screen  name="Shop" component={ShopStack} />
            <ShopDrawer.Screen name="Categories" component={CategoriesStack} />
            <ShopDrawer.Screen name="Deals" component={DealsStack} />
            <ShopDrawer.Screen name="MyShops" component={MyShopsStack} />
            
        </ShopDrawer.Navigator>
        
    )
}