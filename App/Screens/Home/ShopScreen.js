import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar } from 'react-native-elements';
import { Drawer } from 'react-native-paper';


function ShopScreen() {
    const [searchText, updateSearchText] = useState('')
    return (
        <View>
            <SearchBar 
                placeholder = "Search..."
                onChangeText = {updateSearchText}
                value={searchText}
                platform="default"
                lightTheme = {true}
            />
            <Text> Shop Screen</Text>
        </View>
    );

}

function CategoriesScreen() {
    return (
        <View>
            <Text> Categories Screen</Text>
        </View>
    )
}

function ShopStack() {
    const ShopStack = createStackNavigator();
    return (
    
        <ShopStack.Navigator>
            <ShopStack.Screen name="ShopScreen" component={ShopScreen} options = {{headerShown: false}}/>
        </ShopStack.Navigator>

    )
}

export default function ShopStackScreen() {
    const ShopDrawer = createDrawerNavigator();
    
    return (
        <ShopDrawer.Navigator>
            <ShopDrawer.Screen  name="ShopStack" component={ShopStack}/>
            <ShopDrawer.Screen name="Categories" component={CategoriesScreen} />
            
        </ShopDrawer.Navigator>
        
    )
}