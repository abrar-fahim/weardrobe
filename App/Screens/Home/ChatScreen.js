import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


function ChatScreen() {
    return (
        <View>
            <Text> Chat Screen</Text>
        </View>
    );

}

export default function ChatStackScreen() {
    const ChatStack = createStackNavigator();
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name="ChatScreen" component={ChatScreen} options = {{}}/>
        </ChatStack.Navigator>
        
    )
}