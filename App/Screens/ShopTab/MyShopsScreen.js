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


export default function MyShopsStack( {navigation} ) {
    return (
        <DrawerStack name="MyShops" navigation={navigation} component={MyShopsScreen} title="My Shops"/>
    )
}

function MyShopsScreen({navigation}) {


    const renderGridItem = (itemData) => {
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={ () => (navigation.navigate("Seller", {
                     sellerId: itemData.item.id

                }))}>
                    <Text> {itemData.item.name}</Text>
                    <Image source={itemData.item.picture} style={{height: 100, width: 100}}/>
                </TouchableOpacity>
            </View>
        )

    }
    
    return (
        <View style={ScreenStyle}>
        
        <Text> Shop Screen</Text>

        <FlatList data={SELLERS} renderItem={renderGridItem} numColumns={2}  />

        </View>
    );

}



const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    },

    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
})

