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
import ShopDrawer from './ShopDrawer'
import ShopStack from './ShopScreens'
import SearchScreen from './SearchScreen'

import DrawerButton from '../../components/DrawerButton'
import FavoritesScreen from './FavoritesScreen';
import ProductScreen from './ProductScreen';
import GroupShoppingScreen from './GroupShoppingScreen'
import ShopRightButtons from '../../components/ShopRightButtons';
import SellerScreen from './SellerScreen';

export default function ShopStackScreen({navigation}) {
    const ShopStack = createStackNavigator();
    

    return (
        <ShopStack.Navigator
        
            screenOptions={{
                headerTintColor: 'purple',
                headerStyle:{
                    backgroundColor: 'white',
                    
                }
                
            }}
            
        >
            <ShopStack.Screen name="ShopDrawer" component={ShopDrawer}
                options={{
                    headerShown: false
                }}
           />
            <ShopStack.Screen name="Checkout" component={CheckoutScreen}/>
            <ShopStack.Screen name="Cart" component={CartScreen}/>
            <ShopStack.Screen name="Search" component={SearchScreen} 
                options={{
                    headerShown: false,
                    headerTitle: 'asdasd'
                    
                }}
            />
            <ShopStack.Screen name="Favorites" component={FavoritesScreen}/>
            <ShopStack.Screen name="Product" component={ProductScreen}/>
            <ShopStack.Screen name="GroupShopping" component={GroupShoppingScreen}/>
            <ShopStack.Screen name="Seller" component={SellerScreen}/>

        </ShopStack.Navigator>
    )
}

