import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { SearchBar } from 'react-native-elements';

import ProfileStackScreen from './Home/ProfileScreen';
import ShopStackScreen from './Home/ShopScreen'
import MagazineStackScreen from './Home/MagazineScreen'
import ChatStackScreen from './Home/ChatScreen'
import StudioStackScreen from './Home/StudioScreen'
import NotificationsStackScreen from './Home/NotificationsScreen'

export default function HomeScreen() {
    const Tab = createBottomTabNavigator();
    return (
            <Tab.Navigator>
                <Tab.Screen name="Magazine" component={MagazineStackScreen}/>
                <Tab.Screen name="Studio" component={StudioStackScreen}/>
                <Tab.Screen name="Shop" component={ShopStackScreen}/>
                <Tab.Screen name="Chat" component={ChatStackScreen}/>
                <Tab.Screen name="Weardrobe" component={ProfileStackScreen}/>
                <Tab.Screen name="Notifications" component={NotificationsStackScreen}/>
            </Tab.Navigator>
    );
}
