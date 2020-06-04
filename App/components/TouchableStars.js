import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, TouchableWithoutFeedback } from 'react-native';
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
import { } from 'react-native-gesture-handler';


export default function TouchableStars(props) {

    //md-star, md-star-outline, md-star-half


    let stars = []

    //const ratingFloor = Math.floor(props.rating);

    let i;

    for (i = 0; i < props.rating; i++) {
        const n = i + 1;
        stars.push(
            {
                id: n.toString(),

                item: (
                    <TouchableWithoutFeedback onPressIn={() => (props.setRating(n))}
                        onPressOut={() => {}}


                    >
                        <Ionicons name="md-star" size={props.size} />
                    </TouchableWithoutFeedback>

                )
            }

        )
    }

    //const starOutlines = Math.floor(5 - props.rating)

    for (; i < 5; i++) {
        const n = i + 1;
        stars.push(
            {
                id: n.toString(),
                item: (
                    <TouchableWithoutFeedback onPressIn={() => (props.setRating(n))}
                    >
                        <Ionicons name="md-star-outline" size={props.size} />
                    </TouchableWithoutFeedback>
                )
            }

        )
    }



    return (
        <View style={{ flexDirection: 'row' }}>
            {stars.map(item => item.item)}

        </View>

    )


}

