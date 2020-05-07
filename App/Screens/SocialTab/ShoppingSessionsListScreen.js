import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const SHOPPINGSESSIONS = [
    {
        id: 1, 
        name: "Eid"
    },
    {
        id: 2, 
        name: "Eid"
    },
    {
        id: 3, 
        name: "Eid"
    },
    {
        id: 4, 
        name: "Eid"
    }
]


export default function ShoppingSessionsListScreen(props) {
    
    function renderItems(itemData) {
        return(
            <TouchableOpacity onPress={() => props.navigation.navigate('ShoppingSession')}>
                <View style={{height: 35, margin: 30}}>
                    <Text> {itemData.item.name}</Text>
                </View>
            </TouchableOpacity>

            
        )
    }

    return (
        <View>
            <Text> Shopping Sessions Screen</Text>
            <FlatList data={SHOPPINGSESSIONS} renderItem={renderItems}/>
        </View>
    )
}