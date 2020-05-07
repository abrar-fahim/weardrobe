import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { PRODUCTS  } from '../../dummy-data/Products'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProductScreen(props) {
    const productId = props.route.params?.productId ?? 'default'

    const product= PRODUCTS.find(product => product.id === productId)


    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => {
    //             return(
    //                 <DrawerButton navigation={navigation}/>
    //             )
    //         }
    //     })
    // })
    return (
        <View>
            <Text> Product Screen</Text>
            <Text style={{fontWeight: 'bold', fontSize: 25}} >{product.name}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={product.picture} style={{height: 200, width: 200}}/>
            </View>
            <Text>{"Price: "  + product.price}</Text>
            <Text> {product.description} </Text>

            <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 200, backgroundColor: "#b19cd9", marginLeft: 100}}>
                    
                    <Text style={{fontSize: 25}}>Add to cart</Text>
                    <MaterialIcons name="add-shopping-cart" size={25} onPress={() => 
                        
                        props.navigation.popToTop()
                }/>
                    

                </View>
            </TouchableOpacity>
            
        </View>
    )
}