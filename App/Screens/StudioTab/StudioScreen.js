import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderOptions from '../../Styles/HeaderOptions';


function StudioScreen() {
    return (
        <View>
            <Text> Studio Screen</Text>
        </View>
    );

}

export default function StudioStackScreen() {
    const StudioStack = createStackNavigator();
    return (
        <StudioStack.Navigator
            screenOptions={HeaderOptions}
        >
            <StudioStack.Screen name="StudioScreen" component={StudioScreen} options = {{}}/>
        </StudioStack.Navigator>
        
    )
}