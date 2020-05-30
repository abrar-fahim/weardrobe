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
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ColorCircles(props) {

    //md-star, md-star-outline, md-star-half

    // let colors = []


    // for (let i = 0; i < props.colors.length; i++) {
    //     if (props.selectedColor === props.colors[i]) {
    //         colors.push(
    //             <TouchableOpacity >
    //                 <FontAwesome name="check-circle" color={props.colors[i]} size={30} />
    //             </TouchableOpacity>

    //         )
    //     }
    //     else {
    //         colors.push(
    //             <TouchableOpacity onPress={() => (
    //                 props.setSelectedColor(props.colors[i])
    //             )}>
    //                 <FontAwesome name="circle" color={props.colors[i]} size={30} />
    //             </TouchableOpacity>
    //         )
    //     }

    // }

    const render = (itemData) => {
        if (props.selectedColor === itemData.item) {
            return (
                <TouchableOpacity style={styles.circleContainer}>
                    <FontAwesome name="check-circle" color={itemData.item} size={30} />
                </TouchableOpacity>

            )
        }
        else {
            return (
                <TouchableOpacity style={styles.circleContainer} onPress={() => (
                    props.setSelectedColor(itemData.item)
                )}>
                    <FontAwesome name="circle" color={itemData.item} size={30} />
                </TouchableOpacity>
            )
        }
    }



    return (

        <FlatList horizontal={true} data={props.colors} renderItem={render}/>
        // <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100 }}>
        //     {colors}

        // </View>

    )


}

const styles = StyleSheet.create({
    circleContainer: {
        marginHorizontal: 5
    }

})

