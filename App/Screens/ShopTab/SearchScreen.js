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
import ProductList from '../../components/ProductList'
import PRODUCTS from '../../dummy-data/Products'


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
            <View style={styles.searchBarContainer}>
                <BackButton navigation={props.navigation}/>
                <SearchBar placeholder="Search..." lightTheme={true} containerStyle={{flex: 1}} platform={Platform.OS}/>
            </View>
            
            

            <View style={styles.productsContainer}>
                <ProductList navigation={props.navigation} data={PRODUCTS}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        

    },
    productsContainer: {
        
    }
})