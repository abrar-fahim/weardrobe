import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, Alert, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PRODUCTS from '../../dummy-data/Products'
import { TouchableOpacity, ScrollView, FlatList } from 'react-native-gesture-handler';

import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ScreenStyle from '../../Styles/ScreenStyle';
import UIButton from '../../components/UIButton'
import Colors from '../../Styles/Colors';
import UIButtonTextStyle from '../../Styles/UIButtonTextStyle';
import RatingStars from '../../components/RatingStars'
import ColorCircles from '../../components/ColorCircles'

import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products'
import * as wishlistActions from '../../store/actions/wishlist'

import * as cartActions from '../../store/actions/cart'

import GenericHeaderButton from '../../components/GenericHeaderButton'
import SmallPopup from '../../components/SmallPopup';
import checkLoggedIn from '../../components/CheckLoggedIn'
import SizeCircles from '../../components/SizeCircles';




export default function ProductScreen(props) {

    //const [isLoading, setIsLoading] = useState(false);

    const loggedIn = useSelector(state => state.auth.userId, (left, right) => (left.auth.userId === right.auth.userId)) === null ? false : true

    const userId = useSelector(state => state.auth.userId);

    const [addCartModalVisible, setAddCartModalVisible] = useState(false);
    const [addWishlistModalVisible, setAddWishlistModalVisible] = useState(false);
    const [reviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [addReviewPopupVisible, setAddReviewPopupVisible] = useState(false);

    const [reviewText, setReviewText] = useState(null)
    const [rating, setRating] = useState(null);


    //const product= PRODUCTS.find(product => product.id === productId)
    const productId = props.route.params?.productId ?? 'default'
    // console.log(productId)

    const product = useSelector(state => state.products.productDetails);

    const cartMessage = useSelector(state => state.cart.message);
    const wishlistMessage = useSelector(state => state.wishlist.message);
    const reviewMessage = useSelector(state => state.products.errorMessage)

    const reviews = useSelector(state => state.products.productReviews)





    //product = PRODUCTS[0];
    const dispatch = useDispatch();


    const loadProductDetails = useCallback(async () => {
        let mounted = true;
        //setIsLoading(true);
        try {
            if (mounted) {
                await dispatch(productActions.fetchProductReviews(productId))
                await dispatch(productActions.fetchProductDetails(productId))

            }
        } catch (err) {
            console.log('error in product screen')
        }
        finally {
            return () => mounted = false;
        }
        //setIsLoading(false);

    }, [dispatch])




    useEffect(() => {
        loadProductDetails()
    }, [props.navigation]);

    const addToCart = useCallback(async () => {
        let mounted = true;

        if (!loggedIn) {
            props.navigation.navigate('Login');
        }
        else {
            try {
                if (mounted) {
                    await dispatch(cartActions.addToCart(productId))
                    setAddCartModalVisible(true)
                    //setAddCartMessage(cartMessage);
                    window.setTimeout(() => (setAddCartModalVisible(false)), 2500)
                }

            } catch (err) {
                console.log(err.message)
                //setAddCartMessage('Failed to add to cart')
            }

            finally {
                return () => mounted = false;
            }
        }


    }, [loggedIn])



    const addToWishlist = useCallback(async () => {
        let mounted = true;
        try {
            if (mounted) {
                await dispatch(wishlistActions.addToWishlist(productId))
                setAddWishlistModalVisible(true);
                //setAddWishlistMessage(wishlistMessage)
                //window.setTimeout(() => (setAddWishlistModalVisible(false)), 2500)
            }

        } catch (err) {
            console.log(err.message)
            setAddWishlistMessage('Failed to add to wishlist')
        }
        finally {
            return () => mounted = false;
        }

    }, [])

    const removeFromWishlist = useCallback(async () => {
        let mounted = true;
        try {
            if (mounted) {
                await dispatch(wishlistActions.removeFromWishlist(productId))
                setAddWishlistModalVisible(true);
                //setAddWishlistMessage(wishlistMessage)
                window.setTimeout(() => (setAddWishlistModalVisible(false)), 2500)
            }
        } catch (err) {
            console.log(err.message)
            setAddWishlistMessage('Failed to add to wishlist')
        }
        finally {
            return () => mounted = false;
        }

    }, [])

    const addReview = useCallback(async (rating, review) => {
        let mounted = true;

        if (!loggedIn) {
            props.navigation.navigate('Login');
            setIsReviewModalVisible(false);
        }
        else {
            try {
                if (mounted) {

                    await dispatch(productActions.addReview(productId, rating, review))
                    setIsReviewModalVisible(false);
                    setAddReviewPopupVisible(true);

                    //setAddCartMessage(cartMessage);
                }

            } catch (err) {
                console.log(err.message)
                //setAddCartMessage('Failed to add to cart')
            }

            finally {
                return () => mounted = false;
            }
        }


    }, [loggedIn])

    let wishlistItems = useSelector(state => state.wishlist.items)

    const isInWishlist = wishlistItems.some(item => item.id === productId);



    const [inWishlist, setInWishlist] = useState(isInWishlist);

    const heartIcon = inWishlist ? "md-heart" : "md-heart-empty";


    React.useLayoutEffect(() => {
        const sub = props.navigation.setOptions({
            headerRight: () => (<GenericHeaderButton iconName={heartIcon} onPress={() => {
                if (!loggedIn) {
                    setInWishlist(false);
                    props.navigation.navigate('Login');
                }
                else {
                    if (inWishlist) {
                        removeFromWishlist();
                    }
                    else {
                        addToWishlist();
                    }

                    setInWishlist(!inWishlist);
                }

            }

            } />)
        });
        return sub;
    }, [inWishlist, loggedIn]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     loadProductDetails().then(() => {
    //         setIsLoading(false);
    //     });
    // }, [dispatch, loadProductDetails, setIsLoading]);




    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //             <ActivityIndicator size="large" color="black" />
    //         </View>
    //     )
    // }
    //let colors = []




    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const getInventory = useCallback(() => {

        if (product !== null) {


            const gotColors = product.colors.map(item => item.COLOR.toLowerCase())
            const data = selectedColor === null ? product.colors[0] : product.colors.filter(item => (item.COLOR.toLowerCase() === selectedColor))[0]

            const images = product.photos.map(item => item.IMAGE_URL)    //array of strings 

            const gotColorImages = selectedColor === null ? product.colors[0].IMAGES : product.colors.filter(item => item.COLOR.toLowerCase() === selectedColor)[0].IMAGES

            const colorImageNames = JSON.parse(gotColorImages)
            //console.log(colorImageNames)

            const colorImages = colorImageNames.map(item => ({ uri: "http://localhost:3000/img/temp/" + item.IMAGE_URL }))



            // console.log(colorImages)


            const inventory = JSON.parse(data.INVENTORY)


            const sizes = inventory.map(item => {
                if (item.QUANTITY > 0) {
                    return item.SIZE
                }
            })



            // setSelectedColor(gotColors[0]);
            return {
                colors: gotColors,
                sizes: sizes,
                images: images,
                colorImages: colorImages

            };
        }

        else return {
            colors: null,
            sizes: null,
            images: null
        }


    }, [product, props.navigation, selectedColor])



    const { colors, sizes, images, colorImages } = getInventory();




    const renderPic = (itemData) => {
        //console.log(itemData.item)


        //const url = { uri: "http://localhost:3000/img/temp/" + itemData.item}
        return (

            <Image source={itemData.item} style={styles.image} />


        )

    }

    const renderReview = (itemData) => {
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

    if (product === null) {
        console.log("reviews: " + reviews)
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )

    }

    else {
        console.log("reviews not null: " + reviews)
        return (
            <>

                <SmallPopup setIsVisible={setAddCartModalVisible} isVisible={addCartModalVisible} text={cartMessage} />
                <SmallPopup setIsVisible={setAddWishlistModalVisible} isVisible={addWishlistModalVisible} text={wishlistMessage} />
                <SmallPopup setIsVisible={setAddReviewPopupVisible} isVisible={addReviewPopupVisible} text={reviewMessage} />
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
                                addReview(rating, reviewText)
                                //setIsReviewModalVisible(false);
                            }} />
                        </View>

                    </View>

                </Modal>



                <ScrollView style={{ ...ScreenStyle, ...styles.screen }}>

                    <View style={{ padding: 10, justifyContent: 'center', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 35 }} >{product.name}</Text>
                    </View>

                    <View style={styles.imageContainer}>
                        <FlatList pagingEnabled={true} horizontal={true} data={colorImages} renderItem={renderPic} />

                    </View>

                    <View style={{ justifyContent: 'flex-start', padding: 10, marginRight: 10, flexDirection: 'row' }}>
                        <RatingStars rating={product.rating} size={30} />
                        <Ionicons color={Colors.buttonColor} name="ios-share-alt" size={40} style={{ marginLeft: Dimensions.get('window').width / 1.9 }} />
                    </View>





                    <View style={{ marginTop: 30, padding: 5 }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '400',
                            color: 'grey'
                        }}> {product.description} </Text>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 30 }}>


                        <View>
                            <View>
                                <Text style={styles.text}> COLOR </Text>
                            </View>

                            <ColorCircles setSelectedColor={setSelectedColor} selectedColor={selectedColor} colors={colors} />
                        </View>


                        <View>
                            <Text style={styles.text}> SIZE </Text>
                            <SizeCircles setSelectedSize={setSelectedSize} selectedSize={selectedSize} sizes={sizes} />

                        </View>



                    </View>



                    <TouchableOpacity onPress={() => {
                        addToCart();
                        //props.navigation.goBack();

                    }} >
                        <View style={{ backgroundColor: Colors.buttonColor, height: 50, justifyContent: 'center', marginTop: 40 }}>
                            <View style={{ marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                                <Text style={UIButtonTextStyle}> ADD TO CART</Text>
                                <Text style={UIButtonTextStyle}>{"BDT " + product.price}</Text>

                            </View>


                        </View>
                    </TouchableOpacity>

                    {/* <View style={styles.qa}>
    
                        <Text style={styles.heading}>Customer Questions</Text>
                        <Text>{product.qa[0].question.asker}</Text>
                        <Text>{product.qa[0].question.question}</Text>
                        <Text>{product.qa[0].ans}</Text>
    
                    </View> */}


                    <View style={styles.reviewTitleContainer}>
                        <Text style={styles.heading}>Reviews ({product.ratingCount})</Text>
                        <TouchableOpacity onPress={() => {
                            if (loggedIn) {
                                setIsReviewModalVisible(true)
                            }
                            else {
                                props.navigation.navigate('Login')
                            }


                        }}>
                            <Text style={styles.addReview}>{reviews.some(review => review.reviewerId === userId) ? "EDIT REVIEW" : "+ ADD REVIEW"}</Text>
                        </TouchableOpacity>

                    </View>





                    <FlatList data={reviews} renderItem={renderReview} />


                </ScrollView>
            </>
        )
    }





}

const styles = StyleSheet.create({
    text: {
        fontWeight: '600',
    },
    screen: {
        marginBottom: 10
    },
    qa: {
        width: '100%',
        margin: 10

    },
    reviews: {
        width: '100%',
        margin: 10

    },
    heading: {
        fontSize: 22,
        fontWeight: '700'
    },
    shareButton: {
        alignItems: 'flex-end'

    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 350,
        width: Dimensions.get('window').width,
        resizeMode: "contain"
    },
    imageContainer: {


    },
    reviewTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 30
    },
    addReview: {
        color: 'grey',
        fontWeight: '700',
        fontSize: 12
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



}

)