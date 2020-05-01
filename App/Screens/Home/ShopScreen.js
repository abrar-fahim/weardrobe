import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import {HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'


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

function CategoriesScreen(props) {
    return (
        <View>
            <Header title="Categories"/>
            <Text> Categories Screen</Text>
        </View>
    )
}

function ShopStack(props) {
    const ShopStack = createStackNavigator();
    return (
    
        <ShopStack.Navigator>
            <ShopStack.Screen 
                name="ShopScreen" 
                component={ShopScreen} 
                options = {{
                    headerRight: () => (
                    <Button onPress={ () => props.navigation.navigate('Cart')} title="My Cart" color="#000"/>
                    ),
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                title='DrawerButton'
                                iconName='md-menu'
                                onPress={ () => props.navigation.openDrawer()} 
                            />
                        </HeaderButtons>
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
                    headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title='DrawerButton'
                        iconName='md-menu'
                        onPress={ () => navigation.openDrawer()} 
                    />
                </HeaderButtons>)
            }}
             />
        </CategoriesStack.Navigator>
        
    )

}

function DealsStack( {navigation} ) {
    const DealsStack = createStackNavigator();

    return (
        <DealsStack.Navigator>
            <DealsStack.Screen name="DealsScreen" component = {DealsScreen} 
                options={{ headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item 
                        title='DrawerButton'
                        iconName='md-menu'
                        onPress={ () => navigation.openDrawer()} 
                    />
                    </HeaderButtons>)
                    
            }}
            />
        </DealsStack.Navigator>
    )
}

function DealsScreen() {
    return (
        <View style={styles.screen}>
            <Text> Deals!!</Text>
        </View>
    )
}

export default function ShopStackScreen() {
    const ShopDrawer = createDrawerNavigator();
    
    return (
        <ShopDrawer.Navigator 

            screenOptions={
                {}
            }>
            <ShopDrawer.Screen  name="Shop" component={ShopStack} title="Shop"/>
            <ShopDrawer.Screen name="Categories" component={CategoriesStack} />
            <ShopDrawer.Screen name="Deals" component={DealsStack} />
            
        </ShopDrawer.Navigator>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    }
})