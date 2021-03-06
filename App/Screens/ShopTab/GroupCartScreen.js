import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, Entypo, AntDesign,SimpleLineIcons } from '@expo/vector-icons';

import UIButton from '../../components/UIButton'



export default function CartScreen(props) {

    const renderItems = (itemData) => {
        return (

           <View style={styles.cartEntry}>
               <Image  style={{...styles.picture, alignSelf: 3 > 5? 'flex-end' : 'flex-start'}} source={require('../../assets/Images/pic1.jpeg')}/>
                <View style={styles.cartRow}>
        
                    
                    <View style={styles.cartItem}>
                        
                        <TouchableOpacity onPress={ () => (props.navigation.navigate("Product", {
                            productId: itemData.item.id,
                         }))}>
                            <Image source={itemData.item.picture} style={{height: 70, width: 70}}/> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => (props.navigation.navigate("Product", {
                             productId: itemData.item.id,
                         }))}>
                            <View>
                                <Text style={{fontSize: 17, fontWeight: '400'}}> {itemData.item.name}</Text>
                                <Text style={{fontWeight:'200'}} > {"Ref: " + itemData.item.id}</Text>
                            </View>
                        </TouchableOpacity>
                    
                        
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 70, alignItems: 'center'}}>
                            <Text style={styles.quantity}> Qty: </Text>
                            <Text>5000</Text>
                            
                        </View>
                        
                        <View style={{ justifyContent: 'center', height: 50, marginTop: 37}}>
                                
                            <Text > {"BDT " + itemData.item.price} </Text>
                            <Text style={styles.itemStatus}> Added to Cart</Text>
                                
                        </View>
                       
                        
                    </View>

                    <TouchableOpacity onPress={() => (props.navigation.navigate('GroupChat'))}>
                        <SimpleLineIcons name="bubble" size={20} color="grey"/>
                    </TouchableOpacity>
                    
                    
                        


                </View>
            </View>
        )
    }
    return (
        <View style={ScreenStyle}>
            <FlatList data={CARTITEMS} renderItem={renderItems}/>
            
            
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
        },
        cartRow : {
            flexDirection: 'row', 
            flex: 1, 
            justifyContent: 'flex-start',
            padding: 10,
            height: 120,
            alignItems: 'center'
        },
        cartEntry: {
            marginHorizontal: 10,
            marginVertical: 10
        },
        picture: {
            height: 30,
            width: 30,
            borderRadius: 15,
        },
        quantity: {
            fontSize: 12,
            fontWeight: '300',
            color: 'grey'
        },
        itemStatus: {
            fontWeight: '200',
            marginTop: 20
        }
    }
)
