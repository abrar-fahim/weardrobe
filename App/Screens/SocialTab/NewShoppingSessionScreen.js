import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';


export default function NewShoppingSessionScreen(props) {
    return (
        <View style={ScreenStyle}>
            <TextInput placeholder="Enter shopping session name"/>
            <Text> New Shopping Session</Text>

            <Button title="Start Shopping!" onPress={() => props.navigation.navigate('Shop', {
                isGroupShopping: true
            })}/>
    
        </View>
    )
}