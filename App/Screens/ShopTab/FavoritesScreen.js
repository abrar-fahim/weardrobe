import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ScreenStyle from '../../Styles/ScreenStyle'

export default function FavoritesScreen(props) {
    return (
        <View style={ScreenStyle}>
            <Text> Your Favorites here!!</Text>
        </View>
    )
}