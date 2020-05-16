import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';
import UIButton from '../../components/UIButton';


export default function NewShoppingSessionScreen(props) {
    return (
        <View style={{...ScreenStyle, ...styles.screen}}>
            <TextInput style={styles.textInput} placeholder="Enter shopping session name"/>

                <UIButton text="Start Shopping!" height={60} width={200} onPress={() => (props.navigation.navigate("Shop"))}/>  
            

           
    
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#eae9e9',
        height: 50,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 50
    },
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})