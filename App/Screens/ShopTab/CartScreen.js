import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'

const cartItems = [
    {
        
    }
]

export default function CartScreen(props) {
    return (
        <View style={ScreenStyle}>
            <Text> My Cart</Text>
            <Button title="Checkout" onPress={ () => props.navigation.navigate('Checkout')}/>
        </View>
    )
}