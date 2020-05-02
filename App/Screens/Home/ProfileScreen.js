import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { useSelector, useDispatch } from 'react-redux';

import BlogScreen from './BlogScreen'


export function ProfileScreen(props) {
    return (
        <View>
            <Text> Profile Screen</Text>
            
        </View>
    );

}

export function ProfileTabsScreen() {
    const TopTab = createMaterialTopTabNavigator();

    return(
        <TopTab.Navigator>
            <TopTab.Screen name="profileStack" component={ProfileScreen} />
            <TopTab.Screen name="blogScreen" component={BlogScreen} />
        </TopTab.Navigator>
        // <View>
        //     <Text> jello</Text>
        // </View>
    )
}


export default function ProfileStackScreen(props) {
    const ProfileStack = createStackNavigator();
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileTabsScreen} options = {{
                headerRight: () => {    
                    return (
                        <Button title="Login/Signup" onPress = { () => props.navigation.navigate('Login') }/>
                    );    
                }
            }}/>
        </ProfileStack.Navigator>
        
    )
}