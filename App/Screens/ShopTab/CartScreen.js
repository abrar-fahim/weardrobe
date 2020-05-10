import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems'
import { FlatList } from 'react-native-gesture-handler';



export default function CartScreen(props) {

    const renderItems = (itemData) => {
        return (
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                <View>
                    <Image source={itemData.item.picture} style={{height: 150, width: 150}}/>
                    <Text> {itemData.item.name}</Text>
                </View>
                <View style={{marginRight: 50}}>
                    <Text> {"BDT " + itemData.item.price} </Text>
                    <Text>Quantity: 5000</Text>
                    <Text> {"BDT " + itemData.item.price} </Text>
                    <Text>Quantity: 5000</Text>
                    <Text> {"BDT " + itemData.item.price} </Text>
                    <Text>Quantity: 5000</Text>

                </View>
                <View style={{marginRight: 50}}>
                    <Text> {"BDT " + itemData.item.price} </Text>
                    <Text>Quantity: 5000</Text>
                    <Text> {"BDT " + itemData.item.price} </Text>
                    <Text>Quantity: 5000</Text>
                    <Text> {"BDT " + itemData.item.price} </Text>
                    <Text>Quantity: 5000</Text>

                </View>

            </View>
        )
    }
    return (
        <View style={ScreenStyle}>
            <FlatList data={CARTITEMS} renderItem={renderItems}/>
            
            <Button title="Checkout" onPress={ () => props.navigation.navigate('Checkout')}/>
        </View>
    )
}