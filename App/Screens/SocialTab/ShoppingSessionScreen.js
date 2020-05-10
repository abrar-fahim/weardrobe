import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenStyle from '../../Styles/ScreenStyle'
import ITEMSBOUGHT from '../../dummy-data/ItemsBought'



export default function ShoppingSessionScreen(props) {
    function renderItems(itemData) {
        return(
            <TouchableOpacity>
                <View style={{height: 35, margin: 30}}>
                    <Text> {itemData.item.name}</Text>
                </View>
            </TouchableOpacity>

            
        )
    }
    return (
        <View style={ScreenStyle}>
            <Text> Shopping Sessions Screen</Text>
            <FlatList data={ITEMSBOUGHT} renderItem={renderItems}/>
        </View>
    )
}