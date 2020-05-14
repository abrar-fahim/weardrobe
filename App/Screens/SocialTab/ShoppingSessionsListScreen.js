import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

import ScreenStyle from '../../Styles/ScreenStyle'
import SHOPPINGSESSIONS from '../../dummy-data/ShoppingSessions'



export default function ShoppingSessionsListScreen(props) {
    
    const renderItems = (itemData) => {
        return (

            <TouchableOpacity onPress={() => (props.navigation.navigate('ShoppingSession'))}>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 10, height: 120, alignItems: 'center'}}>
                

               
        
                    
                <View style={styles.cartItem}>

                    <Text> {itemData.item.name }</Text>
                    
                   
                  
                
                    
    
                    
                </View>

                   

                

            </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={ScreenStyle}>
            <FlatList data={SHOPPINGSESSIONS} renderItem={renderItems}/>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        cartItem : {
            marginRight: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#eae9e9',
            flex: 1,
            height: 100,
            width: 400,
            marginLeft: 1,
            padding: 10
        }
    }
)
