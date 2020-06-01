import 'react-native-gesture-handler';
import React, { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList, Dimensions, TouchableOpacity } from 'react-native';


import Modal from 'react-native-modal';
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
    //const shopId = props.route.params?.shopId ?? 'default'

    const loggedIn = useSelector(state => state.auth.userId, (left, right) => (left.auth.userId === right.auth.userId)) === null ? false : true


    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: shopDetails === null ? "" : shopDetails.name,
        })
    })



    const [reviewText, setReviewText] = useState(null)
    const [rating, setRating] = useState(null);
    const [reviewModalVisible, setIsReviewModalVisible] = useState(false);


    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.userId)


    const shopDetails = useSelector(state => state.shops.shopDetails)
    const shopId = shopDetails.id

    const shopReviews = useSelector(state => state.shops.shopReviews)

    // const loadShopDetails = useCallback(async (shopId) => {
    //     try {
    //         await dispatch(shopsActions.())
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }, [dispatch])

    const loadShopReviews = useCallback(async () => {
        try {
            await dispatch(shopsActions.fetchShopReviews(shopId))
            
        }
        catch (err) {
            console.log(err)
        }

        
    })

    const addShopReview = useCallback(async (rating, review) => {
        try {
            await dispatch(shopsActions.addReview(shopId, rating, review))
        }
        catch (err) {
            if (err.message === 'UNAUTHORIZED') {
                props.navigation.navigate('Login')
            }

        }
        setIsReviewModalVisible(false)
    })


    useEffect(() => {
        loadShopReviews()
    }, [dispatch])

    //const shopDetails = props.route.params?.shopDetails


    const renderReviews = (itemData) => {
        if (itemData.length === 0) {
            return (
                <Text>No reviews yet!</Text>
            )
        }
        else {
            return (
                <View style={styles.reviews}>

                    <RatingStars rating={itemData.item.rating} size={20} />
                    <View style={styles.reviewerNameContainer}>
                        <Text style={styles.reviewerName}>{itemData.item.reviewerName.toUpperCase()} - {itemData.item.date}</Text>
                    </View>



                    <Text style={styles.reviewText}>{itemData.item.review}</Text>

                </View>

            )
        }

    }


    return (
        <View style={styles.screen}>

            <Modal
                isVisible={reviewModalVisible}
                onBackdropPress={() => (setIsReviewModalVisible(false))}
            >
                <View style={styles.addReviewContainer}>
                    <TextInput placeholder="Rating" keyboardType="decimal-pad" style={styles.addRatingInput}
                        onChangeText={(value) => (setRating(value))} />
                    <TextInput multiline={true} placeholder="Add Review Text" style={styles.addReviewInput}
                        onChangeText={(value) => (setReviewText(value))} />
                    <View style={styles.addReviewButtonContainer}>
                        <Button title="Add Review" onPress={() => {
                            //dispatch addreview action
                            addShopReview(rating, reviewText)
                            //setIsReviewModalVisible(false);
                        }} />
                    </View>

                </View>

            </Modal>

            <View>
                <Text style={styles.title}>Contact Us </Text>
                <Text>{shopDetails.contact}</Text>
                <Text>{shopDetails.email}</Text>
            </View>


            <Text style={styles.title}>About Us</Text>

            <Text>{shopDetails.description}</Text>

            <View style={styles.reviewTitleContainer}>
                <Text style={styles.heading}>Reviews (1)</Text>
                <TouchableOpacity onPress={() => {
                    if (loggedIn) {
                        setIsReviewModalVisible(true)
                    }
                    else {
                        props.navigation.navigate('Login')
                    }


                }}>
                    <Text style={styles.addReview}>{shopReviews.some(review => review.reviewerId === userId) ? "EDIT REVIEW" : "+ ADD REVIEW"}</Text>
                </TouchableOpacity>

            </View>


            <FlatList data={shopReviews} renderItem={renderReviews} />

        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle

    },
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
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    heading: {
        fontSize: 22,
        fontWeight: '700'
    },

    reviews: {
        width: '100%',
        margin: 10

    },
    addReview: {
        color: 'grey',
        fontWeight: '700',
        fontSize: 12
    },
    reviewTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 30
    },
    reviewerName: {
        fontWeight: '600',
        color: 'grey'
    },
    reviewerNameContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    reviewText: {
        fontSize: 15,
        marginVertical: 20,
        marginHorizontal: 10
    },
    addReviewContainer: {
        height: Dimensions.get('window').height * 0.8,
        maxHeight: 400,
        width: Dimensions.get('window').width * 0.9,
        maxWidth: 400,
        backgroundColor: 'white',
        flex: 1,
    },
    addReviewButtonContainer: {

    },
    addReviewInput: {
        marginTop: 20,
        margin: 20,
        backgroundColor: 'lightgrey',
        height: '50%'
    },
    addRatingInput: {
        margin: 20

    }
})