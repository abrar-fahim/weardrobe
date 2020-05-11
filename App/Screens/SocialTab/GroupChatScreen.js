import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShoppingSessionsListScreen from './ShoppingSessionsListScreen';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';

export default function GroupTabScreen(props) {
    const TopTab = createMaterialTopTabNavigator();
    return (
        <TopTab.Navigator
            tabBarOptions= {{
                indicatorStyle: {
                    backgroundColor: Colors.tabBarActiveTintColor
                }
            }}
        >
            <TopTab.Screen name="GroupChat" component={GroupChatScreen} />
            <TopTab.Screen name="ShoppingSessionList" component={ShoppingSessionsListScreen} />
        </TopTab.Navigator>
    )
}


 export function GroupChatScreen(props) {
    return (
        <View style={ScreenStyle}>
            <Text> Group Chat Screen</Text>
        </View>
    )
}