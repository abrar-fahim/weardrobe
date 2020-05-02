import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


export function MagazineScreen(props) {
    //console.log(props);
    return (
        <View>
            <Text> Magazine Screen</Text>
            <Button onPress={ () => {} } title="Button"/>
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