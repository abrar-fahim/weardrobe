import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';
import GROUPS from '../../dummy-data/Groups'

export default function GroupListScreen(props) {

    function renderItems(itemData) {
        return (
            <TouchableOpacity onPress={ () => props.navigation.navigate('GroupTab') }>
                <View style={{height: 70, margin: 20}}>
                    <Text>{itemData.item.name}</Text>
                </View>
            </TouchableOpacity>
            
        )
    }
    return (
        <View style={ScreenStyle}>
            <Text> Group Screen</Text>
            <FlatList data={GROUPS} renderItem={renderItems}/>
        </View>
    )
}