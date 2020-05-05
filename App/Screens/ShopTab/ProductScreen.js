import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { PRODUCTS  } from '../../dummy-data/Products'

export default function ProductScreen(props) {
    const productId = props.route.params?.productId ?? 'default'

    const selectedProduct = PRODUCTS.find(product => product.id === productId)

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
            <Text>{selectedProduct.name}</Text>
        </View>
    )
}