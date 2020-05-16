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
        <View style={styles.listItem}>
            <Image source={require('../../assets/Images/pic2.jpg')} style={styles.image}/>

            <Text style={styles.name} >{itemData.item.name}</Text>
            
            <View style={styles.checkBoxContainer}>
                <CheckBox/>
            </View>
           
            
        </View>
    )

}

export default function NewChatScreen(props) {
    return (
        <View style={ScreenStyle}>
            <SearchBar placeholder="Search for people..." lightTheme={true} containerStyle={{height: 55}} platform={Platform.OS}/>
        
            <FlatList data={USERS} renderItem={renderItems}/>

    
        </View>
    )
}

const styles = StyleSheet.create({
    listItem : {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eae9e9',
        width: '90%',
        margin: 10,
        padding: 5
    },
    image: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    name: {
        marginLeft: 10
       
    },
    checkBoxContainer: {
        flex: 1,
        alignItems: 'flex-end',

    }
})