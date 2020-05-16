import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, TouchableOpacity } from 'react-native';
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

import SellerScreen from './SellerScreen'
import DrawerStack from './DrawerStack';
import ScreenStyle from '../../Styles/ScreenStyle';


export default function ShopsListStack( {navigation} ) {
    return (
        <DrawerStack name="MyShops" navigation={navigation} component={AllShopsScreen} title="Browse Stores"/>
    )
}


function AllShopsScreen(props) {
    return (
        <ShopsListScreen navigation={props.navigation} sellers={SELLERS}/>
    )
}


export function ShopsListScreen(props) {


    const renderGridItem = (itemData) => {
        return (
            <View style={styles.listItem}>
                <TouchableOpacity onPress={ () => (props.navigation.navigate("Seller", {
                     sellerId: itemData.item.id

                }))}>

                    <Image source={itemData.item.picture} style={{height: '100%', width: '100%'}}/>
                </TouchableOpacity>
            </View>
        )

    }
    
    return (
        <View style={ScreenStyle}>

        <FlatList data={props.sellers} renderItem={renderGridItem} numColumns={1}  />

        </View>
    );

}



const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    },

    listItem: {
        margin: 15,
        width:'90%',
        marginVertical: 5,
        height: 120

    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
})

