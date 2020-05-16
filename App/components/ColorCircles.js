import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import {HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from './Header.js'
import { Ionicons, FontAwesome } from '@expo/vector-icons';


export default function RatingStars(props) {

    //md-star, md-star-outline, md-star-half

    
    let colors = []

    for(let i = 0; i < props.colors.length; i++) {
        colors.push(
            <FontAwesome name="circle" color={props.colors[i]} size={30}/>
        )
    }


    
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 100}}>
            {colors}

        </View>
        
    )
    
    
}

