import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SELLERS  } from '../../dummy-data/Sellers'

export default function SellerScreen(props) {
    const sellerId = props.route.params?.sellerId ?? 'default'

    const selectedSeller = SELLERS.find(seller => seller.id === sellerId)

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
            <Text> Seller Screen</Text>
            <Text>{selectedSeller.name}</Text>
        </View>
    )
}