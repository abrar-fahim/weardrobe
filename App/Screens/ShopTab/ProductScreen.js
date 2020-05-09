import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { PRODUCTS  } from '../../dummy-data/Products'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ScreenStyle from '../../Styles/ScreenStyle';

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
        <View style={ScreenStyle}>
            <Text style={{fontWeight: 'bold', fontSize: 35}} >{product.name}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={product.picture} style={{height: 200, width: 200}}/>
            </View>
            <Text style={{
                textAlign: 'right',
                fontSize: 30,
                fontWeight: 'bold'

            }}>{"Price: "  + product.price}</Text>
            

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 250, backgroundColor: "#b19cd9", marginLeft: 75}}>
                    
                    <Text style={{fontSize: 25}}>Add to cart</Text>
                    <MaterialIcons name="add-shopping-cart" size={25} />
                    

                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 250, backgroundColor: "#b19cd9", marginLeft: 75, marginTop: 20}}>
                    
                    <Text style={{fontSize: 25}}>Add to WishList</Text>
                    <MaterialIcons name="star" size={25}/>
                    

                </View>
            </TouchableOpacity>

            <Text style ={{
                fontSize: 20,
            }}> {product.description} </Text>
            
        </View>
    )
}