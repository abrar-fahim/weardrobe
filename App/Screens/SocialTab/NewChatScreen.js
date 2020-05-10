import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';

import {USERS}from '../../dummy-data/users'

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
            
            <FlatList data={USERS} renderItem={renderItems}/>

    
        </View>
    )
}