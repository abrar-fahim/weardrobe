import 'react-native-gesture-handler';
import React, { useEffect, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SELLERS  } from '../../dummy-data/Sellers'
import ProductList from '../../components/ProductList';
import { PRODUCTS } from '../../dummy-data/Products';

import renderProductGridItem from '../../components/RenderProductGridItem'
import ScreenStyle from '../../Styles/ScreenStyle';
import RatingStars from '../../components/RatingStars';



export default function SellerScreen(props) {
    const sellerId = props.route.params?.sellerId ?? 'default'

    const selectedSeller = SELLERS.find(seller => seller.id === sellerId)
    const image = selectedSeller.picture
    const description = selectedSeller.description

    

    useLayoutEffect(() => {
        props.navigation.setOptions({
           headerTitle: selectedSeller.name
        })
    })
    return (
        <View style={ScreenStyle}>

            <ScrollView>

            <View style={{
                alignItems: 'center'
            }}>
                <Image source={image} style={{height: 200, width: '99%'}}/>
            </View>

            <View style={styles.ratingsContainer}>
                <RatingStars rating={4} size={25}/>

            </View>

            <View style={styles.descriptionContainer}>
                 <Text style={styles.description}>{description}</Text>
            </View>

            

            <ProductList data={PRODUCTS} navigation={props.navigation}/>

            </ScrollView>
            

            
                
        </View>
        
    )
}

const styles = StyleSheet.create({
    description : {
        fontWeight: '400',
        color: 'grey'
    },

    descriptionContainer : {
        padding: 10,
        //marginVertical: 20,
        
    

    },

    ratingsContainer : {
        padding: 20,
        alignItems: 'center'
    }
})