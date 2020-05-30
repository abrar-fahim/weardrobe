import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';
import RatingStars from './RatingStars';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Styles/Colors';

import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../store/actions/products'


export default function ProductList(props) {
    //props= navigation, data


   

    const renderGridItem = (itemData) => {
        let price;

        if (itemData.item.discount > 0) {
            const oldPrice = itemData.item.price;
            const newPrice = oldPrice * (100 - itemData.item.discount) / 100;
            price = (
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5 }}>
                    <Text style={styles.oldPrice}> {"BDT " + oldPrice}</Text>
                    <Text style={styles.price}> {"BDT " + newPrice}</Text>
                </View>
            )
        }

        else {
            price = (
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5 }}>
                    <Text style={styles.price}> {"BDT " + itemData.item.price}</Text>
                </View>
            )
        }
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={() => (
                    props.navigation.navigate("Product", {
                        productId: itemData.item.id
                    })
                )}>

                    <Image source={itemData.item.thumbnail} style={{ height: 150, width: 150, justifyContent: 'center', alignItems: 'center' }} />
                    <Text style={styles.itemName}> {itemData.item.name}</Text>
                    <Text style={styles.sellerName}> {"From " + itemData.item.shopname} </Text>


                    <RatingStars rating={itemData.item.rating} />
                    {price}

                </TouchableOpacity>
            </View>
        )

    }

    if(props.data.length === 0) {
        return (
            <View>
                <Text> no products yet!</Text>
            </View>
        )

    }

    return (
        <View style={styles.screen}>

            <FlatList ListHeaderComponent={props.ListHeaderComponent}
                data={props.data} renderItem={renderGridItem} numColumns={2} onRefresh={props.onRefresh} refreshing={props.refreshing}
            />

        </View>
    );

}

const styles = StyleSheet.create({
    screen: { 
        height: '100%'
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