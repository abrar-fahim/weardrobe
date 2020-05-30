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



export default function SellerScreen(props) {
    const shopId = props.route.params?.shopId ?? 'default'

    const selectedSeller = SELLERS.find(seller => seller.id === shopId)
    //const image = selectedSeller.picture
    //2const description = selectedSeller.description


    const dispatch = useDispatch();


    const products = useSelector(state => state.shops.shopProducts)

    const loadShopProducts = useCallback(async (shopId) => {
        try {
            await dispatch(shopsActions.fetchShopProducts())
        }
        catch (err) {
            console.log(err)
        }
    }, [dispatch])


    useEffect(() => {
        loadShopProducts()
    }, [dispatch])




    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: "whaddip",
            headerRight: () => (
                <View style={styles.headerButtons}>
                <GenericHeaderButton iconName="md-information-circle-outline" onPress={() => (props.navigation.navigate('SellerInfo'))}/>
                <GenericHeaderButton iconName="md-heart" />
                </View>
            )
        })
    })
    return (
        <View style={ScreenStyle}>


            <ProductList ListHeaderComponent={
                <View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        {/* <Image source={image} style={{ height: 200, width: '99%' }} /> */}
                    </View>

                    <View style={styles.ratingsContainer}>
                        <RatingStars rating={4} size={25} />

                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>hellop</Text>
                    </View>
                </View>

            }
                data={PRODUCTS} navigation={props.navigation} />

            {/* <SectionList 
                sections={[
                    {data: PRODUCTS, key: '1', renderItem: renderProductGridItem}

                ]}
            /> */}








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