import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ScreenStyle from '../../Styles/ScreenStyle'
import DrawerStack from './DrawerStack';
import ProductList from '../../components/ProductList';
import { PRODUCTS } from '../../dummy-data/Products';

export default function FavoritesStack( {navigation} ) {
    return (
        <DrawerStack name="Favorites" navigation={navigation} component={FavoritesScreen} title="My Favorites"/>
    )
}


 function FavoritesScreen(props) {
    return (
        <View style={ScreenStyle}>
            <ProductList data={PRODUCTS} navigation={props.navigation}/>
        </View>
    )
}