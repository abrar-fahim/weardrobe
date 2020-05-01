import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


export function NotificationsScreen(props) {
    console.log(props);
    return (
        <View>
            <Text> Notifications Screen</Text>
            <Button onPress={ () => {} } title="Button"/>
        </View>
    );

}

export default function NotificationsStackScreen() {
    const NotificationsStack = createStackNavigator();
    return (
        <NotificationsStack.Navigator>
            <NotificationsStack.Screen name="NotificationsScreen" component={NotificationsScreen} options = {{}}/>
        </NotificationsStack.Navigator>
        
    )
}