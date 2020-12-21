import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Dimensions, Image, Alert, ActivityIndicator, FlatList } from 'react-native';
import Modal from 'react-native-modal';

// import {Image} from "react-native-expo-image-cache";
import CachedImage from '../../components/CachedImage'


import PRODUCTS from '../../dummy-data/Products'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'; //FlatList import was here

import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ScreenStyle from '../../Styles/ScreenStyle';
import UIButton from '../../components/UIButton'
import Colors from '../../Styles/Colors';
import UIButtonTextStyle from '../../Styles/UIButtonTextStyle';
import RatingStars from '../../components/RatingStars'
import ColorCircles from '../../components/ColorCircles'

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as productActions from '../../store/actions/products'
import * as wishlistActions from '../../store/actions/wishlist'

import * as cartActions from '../../store/actions/cart'
import * as chatActions from '../../store/actions/chats'

import GenericHeaderButton from '../../components/GenericHeaderButton'
import SmallPopup from '../../components/SmallPopup';
import checkLoggedIn from '../../components/CheckLoggedIn'
import SizeCircles from '../../components/SizeCircles';
import HOST from "../../components/host";

import TouchableStars from '../../components/TouchableStars'




export default function TestScreen(props) {
    const dispatch = useDispatch();

    const productId = props.route.params?.productId;


    const loadProductDetails = useCallback(async () => {

        try {


            await dispatch(chatActions.getGroups()); // await dispatch(productActions.fetchProductReviews(productId))
            // await dispatch(productActions.fetchProductDetails(productId))



        } catch (err) {
            console.log(err)
        }


    }, [productId])

    useEffect(() => {
        loadProductDetails()

    }, []);




    const renderItem1 = (itemData) => {
        return (
            <View style={{ height: 10000, backgroundColor: 'grey', flex: 1, width: Dimensions.get('window').width }}>
                <Text style={{ flex: 1 }}> 1</Text>



            </View>
        )

    }

    const renderItem2 = (itemData) => {
        return (
            <View style={{ height: 100, width: Dimensions.get('window').width, backgroundColor: 'purple', flex: 1 }}>
                <Text style={{ flex: 1 }}> 2</Text>

            </View>
        )

    }



    return (
        <View style={{ flex: 1 }}>
            <Text>hi</Text>

            <FlatList
                data={[
                    {
                        id: '1',
                        view: (
                            <FlatList
                                data={[
                                    {
                                        id: '1'

                                    },
                                    {
                                        id: '2'

                                    }

                                ]}
                                renderItem={renderItem1}
                            />
                        )
                    },
                    {
                        id: '2',
                        view: (
                            <FlatList
                                data={[
                                    {
                                        id: '1'

                                    },
                                    {
                                        id: '2'

                                    }

                                ]}
                                renderItem={renderItem2}

                            />
                        )
                    }
                ]}
                renderItem={({ item }) => item.view}
                horizontal={true}
                pagingEnabled={true}
            />



        </View>
    )

}
