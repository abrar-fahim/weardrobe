import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

function ProfileScreen() {
    return (
        <View>
            <Text> Profile Screen</Text>
        </View>
    );

}

export default function ProfileStackScreen() {
    const ProfileStack = createStackNavigator();
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options = {{headerShown: false}}/>
        </ProfileStack.Navigator>
        
    )
}