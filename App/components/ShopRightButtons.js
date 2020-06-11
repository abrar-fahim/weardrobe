import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from './Header.js'


export default function ShopRightButtons(props) {


    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='groupButton'
                iconName='md-people'
                //onPress={() => navigation.navigate('Shop',{screen:'SearchScreen'})}
                onPress={() => props.navigation.navigate('GroupShopping')}
            />
            <Item
                title='CartButton'
                iconName='md-cart'
                onPress={() => props.navigation.navigate('Cart')}
            />
            <Item
                title='SearchButton'
                iconName='md-search'
                //onPress={() => navigation.navigate('Shop',{screen:'SearchScreen'})}
                onPress={() => {
                    props.search === 'SHOP' ? props.navigation.navigate('ShopSearch') : 
                    props.search === 'CATEGORY' ?  props.navigation.navigate('CategorySearch')  :  props.navigation.navigate('Search')
                }}
            />

        </HeaderButtons>
    )


}

