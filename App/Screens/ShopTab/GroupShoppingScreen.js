import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { GroupChatScreen } from '../SocialTab/GroupChatScreen'
import GroupCartScreen from './GroupCartScreen';
import Colors from '../../Styles/Colors';
import { useSelector } from 'react-redux';
import ShoppingSessionScreen from '../SocialTab/ShoppingSessionScreen'


export default function GroupShoppingScreen(props) {
    const TopTab = createMaterialTopTabNavigator();

    const groupId = useSelector(state => state.social.sessionGroupId)
    const activeSessionId = useSelector(state => state.social.activeSessionId)
    return (
        <TopTab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: Colors.tabBarActiveTintColor
                }
            }}
        >

            <TopTab.Screen name="GroupChat" component={GroupChatScreen} initialParams={{
                groupId: groupId

            }} />
            <TopTab.Screen name="GroupCart" component={ShoppingSessionScreen} initialParams={{
                sessionId: activeSessionId

            }} />
        </TopTab.Navigator>

    )
}
