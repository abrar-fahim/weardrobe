import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function NewPostScreen2(props) {
    return (
        <View>
            <Text> Create Post</Text>
            <Text> Screen 2</Text>
        </View>
    )
}