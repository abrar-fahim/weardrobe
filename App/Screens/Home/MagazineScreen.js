import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


function MagazineScreen() {
    return (
        <View>
            <Text> Magazine Screen</Text>
        </View>
    );

}

export default function MagazineStackScreen() {
    const MagazineStack = createStackNavigator();
    return (
        <MagazineStack.Navigator>
            <MagazineStack.Screen name="MagazineScreen" component={MagazineScreen} options = {{}}/>
        </MagazineStack.Navigator>
        
    )
}