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
import MyOrdersStack from './MyOrdersScreen';
import ShopsListStack from './ShopsListScreen';
import FavoritesStack from './FavoritesScreen';


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
            <ShopDrawer.Screen  name="Shop" component={ShopStack} options={{
                title: 'Shop'
                
            }} />
            <ShopDrawer.Screen name="Categories" component={CategoriesStack} />
            <ShopDrawer.Screen name="Deals" component={DealsStack} />
            <ShopDrawer.Screen name="MyShops" component={MyShopsStack} options={{
                title: 'My Shops'
            }} />
            <ShopDrawer.Screen name="MyOrders" component={MyOrdersStack} options={{
                title: 'My Orders'
            }} />
            <ShopDrawer.Screen name="ShopsList" component={ShopsListStack} options={{
                title: 'Browse Stores'
            }} />
            <ShopDrawer.Screen name="Favorites" component={FavoritesStack} options={{
                title: 'My Favorites'
            }} />
            
        </ShopDrawer.Navigator>
        
    )
}