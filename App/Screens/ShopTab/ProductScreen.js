import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Dimensions, Image, Alert, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';

// import {Image} from "react-native-expo-image-cache";
import CachedImage from '../../components/CachedImage'


import PRODUCTS from '../../dummy-data/Products'
import { } from 'react-native-gesture-handler'; //FlatList import was here

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
import * as popupActions from '../../store/actions/Popup'

import GenericHeaderButton from '../../components/GenericHeaderButton'
import SmallPopup from '../../components/SmallPopup';
import SizeCircles from '../../components/SizeCircles';
import HOST from "../../components/host";

import TouchableStars from '../../components/TouchableStars'

import LoadingScreen from '../../components/LoadingScreen'




// const selectProduct = createSelector(
//     state => state.products.productDetails
// )

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.route.params?.productId ?? 'default'

    const loggedIn = useSelector(state => state.auth.userId, (left, right) => (left.auth.userId === right.auth.userId)) === null ? false : true

    const userId = useSelector(state => state.auth.userId);

    const product = useSelector(state => state.products.productDetails);

    const reviews = useSelector(state => state.products.productReviews)

    // const wishlistItems = useSelector(state => state.wishlist.items)


    const [reviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [reviewText, setReviewText] = useState(null)
    const [rating, setRating] = useState(null);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const [colorImages, setColorImages] = useState([])
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [popupMessage, setPopupMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)




    const loadProductDetails = useCallback(async () => {
        let mounted = true;
        try {
            if (mounted) {
                setIsLoading(true)
                await dispatch(productActions.fetchProductReviews(productId))
                // await dispatch(wishlistActions.fetchItems())
                await dispatch(productActions.fetchProductDetails(productId))
                setIsLoading(false)

            }
        } catch (err) {
            console.log(err)
        }
        finally {
            return () => mounted = false;
        }

    }, [])

    const loadMoreReviews = useCallback(async () => {

        try {

            if (!iterLoading) {
                setIterLoading(true)

                await dispatch(productActions.fetchProductReviews(productId, iter))
                setIter(iter => iter + 1)
                setIterLoading(false)

            }




        } catch (err) {
            console.log(err)
        }
        setIterLoading(false)


    }, [iterLoading, iter])



    const getInventory = useCallback(() => {

        console.log('INVENTORY')

        if (product !== null) {
            //console.log('invenroty')


            const gotColors = product.colors.map(item => item.COLOR?.toLowerCase())
            const data = selectedColor === null ? product.colors[0] : product.colors.filter(item => (item.COLOR.toLowerCase() === selectedColor))[0]

            const images = product.photos.map((item, index) => ({ id: index.toString() + item.IMAGE_URL, image: { uri: `${HOST}/img/temp/` + item.IMAGE_URL } }))

            let colorImageNames = null

            if (gotColors[0] !== null || gotColors[0] === undefined) {
                const gotColorImages = selectedColor === null ? product.colors[0].IMAGES : product.colors.filter(item => item.COLOR.toLowerCase() === selectedColor)[0].IMAGES
                colorImageNames = JSON.parse(gotColorImages)
            }



            //console.log(colorImageNames)

            const colorImages = colorImageNames !== null ? colorImageNames.map((item, index) => (
                {
                    id: index.toString() + item.IMAGE_URL, image: { uri: `${HOST}/img/temp/` + item.IMAGE_URL }
                }
            )) : []


            const finalColorImages = colorImages.concat(images)

            const inventory = JSON.parse(data.INVENTORY)


            const sizes = inventory.map(item => {
                if (item.QUANTITY > 0) {
                    return item.SIZE
                }
            })



            let legitImages = []
            for (const key in finalColorImages) {

                legitImages.push(
                    <Image source={finalColorImages[key].image} style={styles.image} resizeMode="cover" resizeMethod="scale" />
                )
            }

            // setSelectedColor(gotColors[0]);
            setColorImages(finalColorImages);
            if (sizes[0] === null || sizes[0] === "") {
                setSizes([])
            }
            else {
                setSizes(sizes)
            }
            if (gotColors[0] === undefined) setColors([])
            else {
                setColors(gotColors);
            }

            // return {
            //     colors: gotColors,
            //     sizes: sizes,
            //     // colorImages: finalColorImages

            // };

        }

        else {
            return {
                colors: null,
                sizes: null,
                images: null,
                // colorImages: null
            }
        }


    }, [product, selectedColor])


    const addToCart = useCallback(async (color, size, quantity) => {
        let mounted = true;

        if (!loggedIn) {
            props.navigation.navigate('Login');
        }
        else {
            try {
                if (mounted) {
                    console.log(colors.length)
                    if (colors.length !== 0 && selectedColor === null) {

                        // throw new Error('select color pless')
                        dispatch(popupActions.setMessage('select color pless'))

                    }
                    else if (sizes.length !== 0 && selectedSize === null) {
                        // throw new Error('select size pless')
                        dispatch(popupActions.setMessage('select color pless'))

                    }
                    else {
                        await dispatch(cartActions.addToCart(productId, color, size, quantity))
                        // setPopupMessage("added to cart!")
                        dispatch(popupActions.setMessage('select color pless'))
                        // setAddCartModalVisible(true)
                        //setAddCartMessage(cartMessage);
                        // window.setTimeout(() => (setAddCartModalVisible(false)), 2500)
                    }



                }

            } catch (err) {
                console.log(err.message)
                setPopupMessage(err.message)
                //setAddCartMessage('Failed to add to cart')
            }

            finally {
                return () => mounted = false;
            }
        }


    }, [loggedIn, selectedColor, selectedSize, colors, sizes])



    const addToWishlist = useCallback(async () => {
        let mounted = true;
        try {
            if (mounted) {
                await dispatch(wishlistActions.addToWishlist(productId))

                await dispatch(productActions.fetchProductDetails(productId))



                // setPopupMessage("added to wishlist!")

            }

        } catch (err) {
            console.log(err.message)
            setPopupMessage(err.message)
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

                await dispatch(productActions.fetchProductDetails(productId))
                // setPopupMessage("removed from wishlist!")
            }
        } catch (err) {
            setPopupMessage(err.message)
            console.log(err.message)
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
                    // setAddReviewPopupVisible(true);

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


    useEffect(() => {
        loadProductDetails()

    }, []);

    useEffect(() => {
        getInventory()
    }, [product, selectedColor]);



    useLayoutEffect(() => {
        console.log(product?.isFavorite)
        const inWishlist = product?.isFavorite === 1

        const heartIcon = inWishlist ? "md-heart" : "md-heart-empty";
        props.navigation.setOptions({
            headerRight: () => (
                <GenericHeaderButton
                    title="heart"
                    iconName={heartIcon}
                    onPress={() => {
                        if (!loggedIn) {
                            //setInWishlist(false);
                            props.navigation.navigate('Login');
                        }
                        else {
                            if (inWishlist === true) {
                                removeFromWishlist();
                            }
                            else {
                                addToWishlist();

                            }

                        }

                    }

                    }
                />
            )
        });

    }, [product, loggedIn]);



    const renderPic = (itemData) => {

        return (

            <Image source={itemData.item.image} style={styles.image} resizeMode="cover" resizeMethod="scale" />


        )

    }
    const PictureView = useCallback((props) => {
        //console.log('pic')
        return (
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                style={styles.imageContainer}
            >
                {colorImages.map((item, index) => (
                    // <Image style={styles.image} {...item.image} transitionDuration={500} />

                    <Image style={styles.image} source={item.image} />
                    // <Image style={styles.image} source={require('../../assets/Images/groom.jpg')} />
                ))}

            </ScrollView>
        )

    }, [colorImages]) //, [colorImages]) a useCallback was here

    const productPage = //useCallback(() => ( 
        isLoading ? null : (
            <View style={{ ...ScreenStyle, ...styles.screen }}>

                <View style={{ padding: 10, justifyContent: 'center', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 35 }} >{product.name}</Text>
                </View>

                <View style={styles.imageContainer}>

                    {/* <PictureView /> */}
                    <FlatList initialNumToRender={8} pagingEnabled={true} horizontal={true} data={colorImages} renderItem={renderPic} />

                </View>


                {colors[0] === null | colors[0] === undefined ? null :

                    <View style={styles.colorContainer}>
                        <Text style={styles.text}> COLOR </Text>

                        <ColorCircles setSelectedColor={setSelectedColor} selectedColor={selectedColor} colors={colors} size={45} />

                    </View>
                }
                {sizes[0] === null | sizes[0] === undefined ? null :
                    <View style={styles.sizeContainer}>
                        <Text style={styles.text}> SIZE </Text>
                        <SizeCircles setSelectedSize={setSelectedSize} selectedSize={selectedSize} sizes={sizes} size={45} />
                    </View>
                }
                <TouchableOpacity onPress={() => {
                    addToCart(selectedColor, selectedSize, 1);
                    //props.navigation.goBack();

                }} >

                    <View style={styles.cartButtonContainer}>

                        <Text style={styles.cartText}>+ ADD TO CART</Text>
                        <Text style={styles.priceText}>{"BDT " + product.price}</Text>

                    </View>

                </TouchableOpacity>

                <View style={styles.descriptionContainer}>

                    <Text style={styles.heading}>Description</Text>


                    <Text style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: 'grey'
                    }}> {product.description} </Text>
                </View>

                <View style={{ justifyContent: 'flex-start', padding: 10, marginRight: 10, flexDirection: 'row' }}>
                    <RatingStars rating={product.rating} size={30} />
                    <Ionicons color={Colors.buttonColor} name="ios-share-alt" size={40} style={{ marginLeft: Dimensions.get('window').width / 1.9 }} />
                </View>

                {/* <View style={styles.qa}>

            <Text style={styles.heading}>Customer Questions</Text>
            <Text>{product.qa[0].question.asker}</Text>
            <Text>{product.qa[0].question.question}</Text>
            <Text>{product.qa[0].ans}</Text>

        </View> */}


                <View style={styles.reviewTitleContainer}>
                    <Text style={styles.heading}>Reviews ({product.ratingCount})</Text>

                </View>

                {product.hasReviewed === 0 ?
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
                                        addReview(rating, reviewText)
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
    // , [product, colors, selectedColor, selectedSize, loggedIn, reviews])

    const renderReview = (itemData) => {
        // if (itemData.index === 0) {
        //     return productPage
        // }
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


    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }
    else {
        return (
            <View>

                {/* <SmallPopup setMessage={setPopupMessage} message={popupMessage} /> */}
                <Modal
                    isVisible={reviewModalVisible}
                    onBackdropPress={() => {
                        setIsReviewModalVisible(false)
                        console.log('done')
                    }}
                    onBackButtonPress={() => {
                        setIsReviewModalVisible(false)

                    }
                    }
                    // customBackdrop={
                    //     <TouchableWithoutFeedback onPress={() => {
                    //         setIsReviewModalVisible(false)
                    //         console.log('done')
                    //     }}
                    //     style={{flex: 1}}
                    //     >
                    //         <View style={{ flex: 1, backgroundColor: 'purple' }} />
                    //     </TouchableWithoutFeedback>
                    // }
                    avoidKeyboard={true}
                    hasBackdrop={true}
                    backdropOpacity={0.8}
                    hideModalContentWhileAnimating={true}

                    swipeDirection={["down"]}
                    swipeThreshold={100}
                    onSwipeComplete={() => (setIsReviewModalVisible(false))}
                    scrollOffset={50}
                    scrollOffsetMax={500}

                >
                    <View
                    // behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >


                        <View style={styles.addReviewContainer}>

                            {/* <View style={styles.reviewModalTopHandle} /> */}

                            {/* <View style={styles.titleContainer}>
                                <Text style={styles.title}>ADD REVIEW</Text>
    
                            </View> */}


                            <View style={styles.starsContainer}>
                                <TouchableStars rating={rating} setRating={setRating} size={35} />
                            </View>

                            <TextInput multiline={true} placeholder="Add Review Text" style={styles.addReviewInput}
                                onChangeText={(value) => (setReviewText(value))} />
                            <View style={styles.addReviewButtonContainer}>
                                <TouchableOpacity onPress={() => {
                                    addReview(rating, reviewText)
                                }}>
                                    <Text style={styles.cartText}>+ ADD REVIEW</Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </Modal>
                <FlatList
                    ListHeaderComponent={productPage}
                    data={reviews}
                    renderItem={renderReview}
                    onEndReached={loadMoreReviews}

                />



            </View>
        )
    }








}

const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'flex-end',
        marginVertical: 20
    },
    text: {
        fontWeight: '700',
        marginBottom: 10,
        marginRight: 30,
        width: 70,
        color: 'grey'
    },
    screen: {
        marginBottom: 10
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 70,
        borderBottomWidth: 0.8,
        borderBottomColor: 'grey',
        marginHorizontal: 20,
        alignItems: 'center',
        marginTop: 20
    },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 70,
        marginHorizontal: 20,
        marginBottom: 20
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
        fontWeight: '700',
        flex: 1,
        width: 200,
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

        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.5,
        elevation: 100

    },
    addReviewHeading: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    addReview: {
        color: 'grey',
        fontWeight: '700',
        fontSize: 15,

        textAlign: 'right'

    },
    reviewTitleContainer: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 30,
        width: '100%',
        justifyContent: 'space-between'
    },

    reviewerName: {
        fontWeight: '600',
        color: 'grey',
        flex: 1
    },
    reviewerNameContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    reviewText: {
        fontSize: 15,
        marginVertical: 20,
        marginHorizontal: 10,
        flex: 1
    },
    addReviewContainer: {
        height: Dimensions.get('window').height * 0.8,
        maxHeight: 500,
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: Dimensions.get('window').height,
        borderRadius: 10,
        padding: 10

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
    cartText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        flex: 1,
        textAlignVertical: 'center'

    },
    priceText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        flex: 1,
        textAlign: 'right'

    },
    cartButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        backgroundColor: Colors.primaryColor,
        height: 60,
        alignItems: 'center',
        padding: 20,
        borderRadius: 40,
        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.5,
        elevation: 20
    },
    descriptionContainer: {
        marginTop: 40,
        padding: 10,

        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textContainer: {
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        padding: 5
    },
    reviewModalTopHandle: {
        height: 3,
        width: '40%',
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginTop: 5,
        borderRadius: 2,
        marginBottom: 5

    },
    // starsContainer: {
    //     // alignItems: 'flex-start',
    //     // justifyContent: 'center',
    //     // margin: 20,

    // },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
        color: Colors.primaryColor,
        marginBottom: 10
    },
    titleContainer: {

    }



}

)