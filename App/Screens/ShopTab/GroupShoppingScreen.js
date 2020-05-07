import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {GroupChatScreen} from '../SocialTab/GroupChatScreen'
import GroupCartScreen from './GroupCartScreen';


export default function GroupShoppingScreen(props) {
    const TopTab = createMaterialTopTabNavigator();
    return (
        <TopTab.Navigator>

            <TopTab.Screen name="GroupChat" component={GroupChatScreen}/>
            <TopTab.Screen name="GroupCart" component={GroupCartScreen}/>
        </TopTab.Navigator>
        
    )
}
