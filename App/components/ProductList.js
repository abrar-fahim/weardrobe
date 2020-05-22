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
import RatingStars from './RatingStars';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Styles/Colors';


export default function ProductList(props) {
    //props= navigation, data

    


    const renderGridItem = (itemData) => {
        let price;

        if(itemData.item.oldPrice??0 > itemData.item.price) {
            price=(
                <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5}}>
                    <Text style={styles.oldPrice}> {"BDT " + itemData.item.oldPrice}</Text>
                    <Text style={styles.price}> {"BDT " + itemData.item.price}</Text>
                </View> 
            )
        }

        else {
            price = (
                <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5}}>
                        <Text style={styles.price}> {"BDT " + itemData.item.price}</Text>
                    </View>
            )
        }
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={ () => (props.navigation.navigate("Product", {
                     productId: itemData.item.id,
                }))}>
                    
                    <Image source={itemData.item.picture} style={{height: 150, width: 150, justifyContent: 'center', alignItems: 'center'}}/>
                    <Text style={styles.itemName}> {itemData.item.name}</Text>
                    <Text style={styles.sellerName}> {"From " + itemData.item.shopname} </Text>
                    

                    <RatingStars rating={itemData.item.rating}/>
                    {price}
                    
                </TouchableOpacity>
            </View>
        )

    }
    
    return (
        <View>

            <FlatList ListHeaderComponent={props.ListHeaderComponent} 
            data={props.data} renderItem={renderGridItem} numColumns={2}/>

        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    },

    gridItem: {
        margin: 20,
        height: 250,
        width: 150,
        backgroundColor: '#eae9e9'
    },
    itemName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    sellerName: {
        fontSize: 12,
        fontWeight: '300',
        color: 'grey'
    },
    price: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600'
        
    },
    oldPrice: {
        fontSize: 15,
        color: 'black',
        fontWeight: '400',
        textDecorationLine: 'line-through',
        color: 'grey'
    }
    
})