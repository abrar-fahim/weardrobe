import 'react-native-gesture-handler';
import React, { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


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
import TouchableStars from '../../components/TouchableStars'
import LoadingScreen from '../../components/LoadingScreen';



export default function SellerInfoScreen(props) {
    //const shopId = props.route.params?.shopId ?? 'default'

    const loggedIn = useSelector(state => state.auth.userId, (left, right) => (left.auth.userId === right.auth.userId)) === null ? false : true

    //const shopDetails = props.route.params?.shopDetails







    const [reviewText, setReviewText] = useState(null)
    const [rating, setRating] = useState(null);
    const [reviewModalVisible, setIsReviewModalVisible] = useState(false);


    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.userId)


    // const shopDetails = useSelector(state => state.shops.shopDetails)

    const shopDetails = props.route.params?.shopDetails;
    const shopId = shopDetails.id

    const shopReviews = useSelector(state => state.shops.shopReviews)

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

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

            setIsLoading(true)
            await dispatch(shopsActions.fetchShopReviews(shopId))
            setIsLoading(false)
            setIter(0);

        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false)


    }, [shopId])

    const loadMoreShopReviews = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true);
                await dispatch(shopsActions.fetchShopReviews(shopId, iter))
                setIter(iter => iter + 1)
                setIterLoading(false);
            }


        }
        catch (err) {
            console.log(err)
        }

        setIterLoading(false)


    }, [iter, shopId, iterLoading])

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


    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: shopDetails === null ? "" : shopDetails.name,
        })
    })




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

    const shopDetailsPage = (
        <View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Contact Us </Text>
                <Text>{shopDetails.contact}</Text>
                <Text>{shopDetails.email}</Text>


            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>About Us</Text>
                <Text>{shopDetails.description}</Text>
            </View>





            <View style={styles.reviewTitleContainer}>
                <Text style={styles.heading}>Reviews ({shopDetails.ratingCount})</Text>

            </View>

            {shopDetails.hasReviewed == 0 ?
                <>
                    <View style={styles.addReviewHeading}>

                        <TouchableStars rating={rating} setRating={setRating} size={40} />


                        <TouchableOpacity
                            style={styles.addReviewButtonContainer}
                            onPress={() => {
                                if (!loggedIn) {
                                    props.navigation.navigate('Login')
                                }
                                else {
                                    addShopReview(rating, reviewText)
                                }

                            }}
                        >
                            <Text style={styles.addReview}>+ ADD REVIEW</Text>


                        </TouchableOpacity>
                    </View>



                    <KeyboardAvoidingView>
                        <TextInput multiline={true} placeholder="Add Review Text" style={styles.addReviewInput}
                            onChangeText={(value) => (setReviewText(value))} />
                    </KeyboardAvoidingView>
                </> : null
            }


        </View>
    )



    if (isLoading) {
        return <LoadingScreen />
    }
    return (
        <View style={styles.screen}>





            <FlatList
                ListHeaderComponent={shopDetailsPage}
                data={shopReviews}
                renderItem={renderReviews}
                onEndReached={loadMoreShopReviews}
            />

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

    infoContainer: {
        margin: 10,
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
        fontSize: 15,

        textAlign: 'right'

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
        // backgroundColor: Colors.primaryColor,
        // width: '100%',
        // height: 40,
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderRadius: 30
        flex: 1,



    },
    addReviewInput: {
        // backgroundColor: 'lightgrey',
        height: 100,
        borderWidth: 0.5,
        borderRadius: 2,
        margin: 10,
        padding: 10,

    },
    addRatingInput: {
        margin: 20

    },
    addReviewHeading: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
})