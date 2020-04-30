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

function ShopStack({ navigation }) {
    const ShopStack = createStackNavigator();
    return (
    
        <ShopStack.Navigator>
            <ShopStack.Screen 
                name="ShopScreen" 
                component={ShopScreen} 
                options = {{
                    headerRight: () => (
                    <Button onPress={ () => navigation.navigate('Cart')} title="My Cart" color="#000"/>
                    ),
                    headerLeft: () => (
                        <Button onPress={ () => navigation.openDrawer()} title="Drawer"  />
                    )
            
                }}

          />
        </ShopStack.Navigator>

    )
}

function CategoriesStack({ navigation }) {
    const CategoriesStack = createStackNavigator();

    return(
        <CategoriesStack.Navigator>
            <CategoriesStack.Screen name="CategoriesScreen" component={CategoriesScreen}
                options={{
                    headerLeft: () => (
                    <Button onPress={ () => navigation.openDrawer()} title="Drawer" />
                )}}
             />
        </CategoriesStack.Navigator>
        
    )

}

function DealsStack( {navigation} ) {
    const DealsStack = createStackNavigator();

    return (
        <DealsStack.Navigator>
            <DealsStack.Screen name="DealsScreen" component = {DealsScreen} 
                options={{
                    headerLeft: () => (
                    <Button onPress={ () => navigation.openDrawer()} title="Drawer" />
                )}}
            />
        </DealsStack.Navigator>
    )
}

function DealsScreen() {
    return (
        <View>
            <Text> Deals!!</Text>
        </View>
    )
}

export default function ShopStackScreen() {
    const ShopDrawer = createDrawerNavigator();
    
    return (
        <ShopDrawer.Navigator>
            <ShopDrawer.Screen  name="Shop" component={ShopStack} title="Shop"/>
            <ShopDrawer.Screen name="Categories" component={CategoriesStack} />
            <ShopDrawer.Screen name="Deals" component={DealsStack} />
            
        </ShopDrawer.Navigator>
        
    )
}