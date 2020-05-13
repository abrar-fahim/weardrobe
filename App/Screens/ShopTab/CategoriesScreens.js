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

import DrawerButton from '../../components/DrawerButton'
import ShopRightButtons from '../../components/ShopRightButtons';
import DrawerStack from './DrawerStack';
import ScreenStyle from '../../Styles/ScreenStyle';
import { CATEGORIES } from '../../dummy-data/Categories';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CategoriesStack({ navigation }) {
    return (
        <DrawerStack name="Categories" navigation={navigation} component={CategoriesScreen}/>
    )

}

function CategoriesScreen(props) {

    function renderItems(itemData) {
        return (
            
                <View style={styles.gridItem}>
                    <TouchableOpacity onPress={() => (props.navigation.navigate('Shop'))}>
                        <Image style={styles.imageStyle} source={itemData.item.picture}/>
                        <Text style={styles.textStyle}>{itemData.item.name}</Text>

                    </TouchableOpacity>
                </View>
            
            
        )

    }
    return (
        <View style={ScreenStyle}>
            
            <FlatList data={CATEGORIES} renderItem={renderItems} numColumns={2}/>
            
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    },

    gridItem: {
        flex: 1,
        width: '40%',
        margin: 10,
        height: 150,

    },
    imageStyle : {
        height: '80%',
        width: '80%',
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: 5
    }
})