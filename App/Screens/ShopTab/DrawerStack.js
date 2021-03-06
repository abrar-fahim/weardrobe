import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'

import { SHOPS } from '../../dummy-data/Sellers'
import DrawerButton from '../../components/DrawerButton';
import ShopRightButtons from '../../components/ShopRightButtons';
import HeaderOptions from '../../Styles/HeaderOptions';


export default function DrawerStack(props) {
    const DrawerStack = createStackNavigator();

    return (
        <DrawerStack.Navigator
            screenOptions={{
                headerShown: true,
                ...HeaderOptions
            }}


        >
            <DrawerStack.Screen
                name={props.name}
                component={props.component}
                options={{
                    headerRight: () => (
                        <ShopRightButtons
                            navigation={props.navigation}
                            search={props.search}
                        />
                    ),
                    headerLeft: () => (
                        <DrawerButton navigation={props.navigation} />
                    ),
                    title: props.title ?? props.name

                }}
            />
        </DrawerStack.Navigator>
    )
}


