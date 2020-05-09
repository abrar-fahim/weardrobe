import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SearchBar, Overlay } from 'react-native-elements';

import BackButton from '../../components/BackButton'
import ScreenStyle from '../../Styles/ScreenStyle';


export default function SearchScreen(props) {

    // useLayoutEffect(() => {
    //         props.navigation.setOptions({
    //             headerRight: () => {
    //                 return(
                        
    //                 )
    //             }
    //         })
    //     })
    return (
        <View style={{flexDirection: 'column', marginTop: 30, ...ScreenStyle}}>
            <View style={{flexDirection: 'row'}}>
                <BackButton navigation={props.navigation}/>
                <SearchBar placeholder="Search..." lightTheme={true} containerStyle={{flex: 1}} platform={Platform.OS}/>
            </View>
            
            <View style={{flexDirection: 'row'}}>
                {/*place filters here*/}
            </View>
        </View>
    )
}