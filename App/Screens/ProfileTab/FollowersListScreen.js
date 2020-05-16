import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';

function FollowersListScreen({navigation}) {
    return (
        <View>
            <Text> Followers</Text>
        </View>
    )
    
}

function FollowingListScreen({navigation}) {
    return (
        <View style={ScreenStyle}>
            <Text> Following</Text>
        </View>
    )
    
}


export default function FollowersListTabScreen(props) {
    const TopTab = createMaterialTopTabNavigator();



    return (
        <TopTab.Navigator
        tabBarOptions= {{
            indicatorStyle: {
                backgroundColor: Colors.tabBarActiveTintColor
            }
        }}
        >
            <TopTab.Screen name="FollowersList" component={FollowersListScreen} />
            <TopTab.Screen name="FollowingList" component={FollowingListScreen} />

        </TopTab.Navigator>
    )
}