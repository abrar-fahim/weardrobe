import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

const SEARCHRESULTS = [
    {
        id: 1,
        name: "Abrar A"
    },
    {
        id: 2,
        name: "Abrar B"
    },
    {
        id: 3,
        name: "Abrar C"
    },
    {
        id: 4,
        name: "Abrar D"
    },
    {
        id: 5,
        name: "Abrar E"
    },
    {
        id: 6,
        name: "Abrar F"
    },
]

function renderItems(itemData) {

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{itemData.item.name}</Text>
            <CheckBox/>
            
        </View>
    )

}

export default function PeopleSearchScreen(props) {
    return (
        <View>
            <SearchBar placeholder="Search for people..." lightTheme={true} containerStyle={{height: 55}} platform={Platform.OS}/>
            <Text> Create Chat</Text>
            <FlatList data={SEARCHRESULTS} renderItem={renderItems}/>
        </View>
    )
}