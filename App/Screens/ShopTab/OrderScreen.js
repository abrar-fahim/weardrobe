import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle'
import CARTITEMS from '../../dummy-data/CartItems'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, Entypo, AntDesign, Feather } from '@expo/vector-icons';

import UIButton from '../../components/UIButton'
import Colors from '../../Styles/Colors';



export default function OrderScreen(props) {

    const renderItems = (itemData) => {
        return (

            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 10, height: 120, alignItems: 'center'}}>
        
                    
                <View style={styles.cartItem}>
                    
                    <TouchableOpacity>
                        <Image source={itemData.item.picture} style={{height: 70, width: 70, borderRadius: 35}}/> 
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <Text style={{fontSize: 17, fontWeight: '400'}}> {itemData.item.name}</Text>
                            <Text style={{fontWeight:'200'}} > {"Ref: " + itemData.item.id}</Text>
                        </View>
                    </TouchableOpacity>
                  
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 70, alignItems: 'center'}}>
                        <Text> Qty 5000</Text>
                        <View style={{ justifyContent: 'space-between', height: 50}}>
                           
                        </View>
                    </View>
                    
                    
                    <Text > {"BDT " + itemData.item.price} </Text>
                    
                </View>
                

            </View>
        )
    }

    function orderFlow() {
        return (
            <View style={styles.flowContainer}>
                <Text style={styles.heading}>Order Summary</Text>
                <View style={styles.stepContainer}>
                    <View style={styles.iconText}>
                        <Feather name="check-circle" size={20}/>
                        <Text style={styles.stepText}> Order Placed</Text>

                    </View>
                    <View style={styles.flowLine}>

                        <Text> |</Text>
                        <Text> |</Text>
                        <Text> |</Text>
                        <Text> |</Text>

                    </View>

                    <View style={styles.iconText}>
                        <Feather name="check-circle"  size={20}/>
                        <Text style={styles.stepText}> Order Accepted</Text>

                    </View>
                    <View style={styles.flowLine}>

                        <Text> |</Text>
                        <Text> |</Text>
                        <Text> |</Text>
                        <Text> |</Text>

                    </View>

                    <View style={styles.iconText}>
                        <Feather name="circle"  size={20}/>
                        <Text style={styles.stepText}> Processing Order and Assigning Rider</Text>

                    </View>
                    <View style={styles.flowLine}>

                        <Text> |</Text>
                        <Text> |</Text>
                        <Text> |</Text>
                        <Text> |</Text>

                    </View>

                    
                    <View style={styles.iconText}>
                        <Feather name="circle"  size={20}/>
                        <Text style={styles.stepText}> Delivered</Text>

                    </View>

                </View>
            </View>
        )
    }
        return (
        <View style={{...ScreenStyle, ...styles.screen}}>

            
            <FlatList ListHeaderComponent={orderFlow} data={CARTITEMS} renderItem={renderItems}
                ListFooterComponent={
                    <View style={styles.bottom}>
                        
                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> Subtotal: </Text>
                            <Text style={styles.price} > BDT 700</Text>
                        </View>

                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> VAT: </Text>
                            <Text style={styles.price} > BDT 20</Text>
                        </View>

                        <View style={styles.bottomRow}>
                            <Text style={styles.price}> Total Payable: </Text>
                            <Text style={styles.price} > BDT 720</Text>
                        </View>
                       
                    </View>

                }
            />

            
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
        screen: {
            paddingBottom: 10
        },
        heading: {
            fontSize: 30,
            fontWeight: '700'

        },
        flowContainer: {
            marginLeft: 20,
            marginTop: 40,
            marginBottom: 30

        },
        stepContainer: {
            marginTop: 20,
            marginLeft: 10

        },
        iconText: {
            flexDirection: 'row',
            width: '80%'

        },
        flowLine: {
            alignItems: 'flex-start'

        },
        stepText: {
            fontWeight: '500',
            marginLeft: 20
        },
        bottom: {
            backgroundColor: Colors.buttonColor,
            width: '100%',
            height: 80,
            flexDirection: 'column',
            justifyContent: 'center',

        },
        price: {
            color: 'white',
            fontWeight: '600',
            fontSize: 16,
            alignSelf: 'flex-end'
        },
        bottomRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 2,
            marginHorizontal: 5,
            alignItems: 'center',
        }
    }
)
