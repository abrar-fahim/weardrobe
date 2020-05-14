import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

import UIButton from '../../components/UIButton'



export default function CartScreen(props) {

    const renderItems = (itemData) => {
        return (

            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 10, height: 120, alignItems: 'center'}}>
        
                    
                <View style={styles.cartItem}>
                    
                    <TouchableOpacity>
                        <Image source={itemData.item.picture} style={{height: 70, width: 70}}/> 
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <Text style={{fontSize: 17, fontWeight: '400'}}> {itemData.item.name}</Text>
                            <Text style={{fontWeight:'200'}} > {"Ref: " + itemData.item.id}</Text>
                        </View>
                    </TouchableOpacity>
                  
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 70, alignItems: 'center'}}>
                        <Text>5000</Text>
                        <View style={{ justifyContent: 'space-between', height: 50}}>
                            <TouchableOpacity>
                                <AntDesign name="pluscircle" size={20} color='grey'/>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <AntDesign name="minuscircle" size={20} color='grey'/> 
                            </TouchableOpacity>
                            
                            
                            
                        </View>
                    </View>
                    
                    
                    <Text > {"BDT " + itemData.item.price} </Text>
                    
                </View>
                   
                    
                <TouchableOpacity>
                    <View style={{justifyContent: 'center', marginRight: 0, alignItems: 'center'}}>
                        <Text>X</Text>
                    </View>
                </TouchableOpacity>
                

            </View>
        )
    }
    return (
        <View style={ScreenStyle}>
            <FlatList data={CARTITEMS} renderItem={renderItems}/>
            
            <UIButton text="CHECKOUT" onPress={ () => props.navigation.navigate('Login')} width={400} height={50}/>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        cartItem : {
            marginRight: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#eae9e9',
            flex: 1,
            height: 100,
            width: 400,
            marginLeft: 1,
            padding: 10
        }
    }
)
