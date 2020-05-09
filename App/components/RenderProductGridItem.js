import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';


import {HeaderButtons, Item } from 'react-navigation-header-buttons';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';


const renderProductGridItem = (itemData) => {
    return (
        <View style={styles.gridItem}>
            <TouchableOpacity onPress={ () => (props.navigation.navigate("Product", {
                 productId: itemData.item.id,
            }))}>
                
                <Image source={itemData.item.picture} style={{height: 120, width: 120, justifyContent: 'center', alignItems: 'center'}}/>
                <Text> {itemData.item.name}</Text>
                <Text> {itemData.item.price + "/-"}</Text>
                <Text> {"From " + itemData.item.shopname} </Text>
            </TouchableOpacity>
        </View>
    )

}



const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    },

    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        width: 150
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
})

export default renderProductGridItem;