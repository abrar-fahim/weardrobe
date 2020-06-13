import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from './Header.js'
import { Ionicons } from '@expo/vector-icons';


export default function RatingStars(props) {

    //md-star, md-star-outline, md-star-half


    let stars = []

    const ratingFloor = Math.floor(props.rating);

    for (let i = 0; i < ratingFloor; i++) {
        stars.push(


            <Ionicons key={i.toString() + 'c'} name="md-star" size={props.size} />


        )
    }

    if (props.rating > ratingFloor) {
        stars.push(


            <Ionicons key={i.toString() + 'b'} name="md-star-half" size={props.size} />


        )
    }

    const starOutlines = Math.floor(5 - props.rating)

    for (let i = 0; i < starOutlines; i++) {
        stars.push(


            <Ionicons key={i.toString() + 'a'} name="md-star-outline" size={props.size} />


        )
    }


    return (
        <View style={{ flexDirection: 'row' }}>
            {stars}

        </View>

    )


}

