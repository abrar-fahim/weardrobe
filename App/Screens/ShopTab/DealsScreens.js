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

import { SELLERS } from '../../dummy-data/Sellers'
import DrawerButton from '../../components/DrawerButton';
import ShopRightButtons from '../../components/ShopRightButtons';
import DrawerStack from './DrawerStack';
import ScreenStyle from '../../Styles/ScreenStyle'

import ProductList from '../../components/ProductList'
import PRODUCTS from '../../dummy-data/Products'


export default function DealsStack( {navigation} ) {
    return (
        <DrawerStack name="Deals" navigation={navigation} component={DealsScreen}/>
    )
}

function DealsScreen({navigation}) {
    return (
        <View style={ScreenStyle}>
            <ProductList navigation={navigation} data={PRODUCTS}/>
        </View>
    )
}

