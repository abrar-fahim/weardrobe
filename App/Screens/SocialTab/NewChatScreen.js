import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';

const PEOPLE = [
    {
        id: 1,
        name: "Abrar F"
    },
    {
        id: 2,
        name: "Nefez"
    },
    {
        id: 3,
        name: "SSSomik"
    },
    {
        id: 4,
        name: "Soyyod"
    },
    {
        id: 5,
        name: "Tosin"
    }
]

function renderItems(itemData) {

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{itemData.item.name}</Text>
            <CheckBox/>
            
        </View>
    )

}

export default function NewChatScreen(props) {
    return (
        <View style={ScreenStyle}>
            <SearchBar placeholder="Search for people..." lightTheme={true} containerStyle={{height: 55}} platform={Platform.OS}/>
            <Text> Create Chat</Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput placeholder="Enter Chat Name" style={{height: 60}}/>
                <Button title="Create Chat" onPress={ () => props.navigation.popToTop() }/>
            </View>
            
            <FlatList data={PEOPLE} renderItem={renderItems}/>

    
        </View>
    )
}