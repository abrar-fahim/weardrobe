import 'react-native-gesture-handler';
import React, { useEffect, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';


import { useSelector, useDispatch } from 'react-redux';

import { SELLERS } from '../../dummy-data/Sellers'
import ProductList from '../../components/ProductList';
import PRODUCTS from '../../dummy-data/Products';

import renderProductGridItem from '../../components/RenderProductGridItem'
import ScreenStyle from '../../Styles/ScreenStyle';
import RatingStars from '../../components/RatingStars';

import * as shopsActions from '../../store/actions/shops'
import { Ionicons } from '@expo/vector-icons';
import GenericHeaderButton from '../../components/GenericHeaderButton'



export default function SellerInfoScreen(props) {
    const shopId = props.route.params?.shopId ?? 'default'

    
   


    const dispatch = useDispatch();


    const products = useSelector(state => state.shops.shopProducts)

    const loadShopDetails = useCallback(async (shopId) => {
        try {
            await dispatch(shopsActions.fetchShopProducts())
        }
        catch (err) {
            console.log(err)
        }
    }, [dispatch])


    useEffect(() => {
        loadShopDetails()
    }, [dispatch])



    return (
        <View style={ScreenStyle}>


        <Text>details</Text>

        </View>

    )
}

const styles = StyleSheet.create({
    description: {
        fontWeight: '400',
        color: 'grey'
    },

    descriptionContainer: {
        padding: 10,
        //marginVertical: 20,



    },

    ratingsContainer: {
        padding: 20,
        alignItems: 'center'
    },
    headerButtons: {
        flexDirection: 'row'
    }
})