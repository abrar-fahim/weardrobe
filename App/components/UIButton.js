import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../Styles/Colors';
import UIButtonTextStyle from '../Styles/UIButtonTextStyle';




export default function UIButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ backgroundColor: Colors.buttonColor, height: props.height, width: props.width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <Text style={UIButtonTextStyle}> {props.text}</Text>

            </View>
        </TouchableOpacity>
       
    )
}



