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

import GenericHeaderButton from '../../components/GenericHeaderButton'
import SmallPopup from '../../components/SmallPopup';
import checkLoggedIn from '../../components/CheckLoggedIn'
import SizeCircles from '../../components/SizeCircles';
import HOST from "../../components/host";

import TouchableStars from '../../components/TouchableStars'




export default function TestScreen(props) {
    const dispatch = useDispatch();


    const loggedIn = useSelector(state => state.auth.userId, (left, right) => (left.auth.userId === right.auth.userId)) === null ? false : true
    const product = useSelector(state => state.products.productDetails)

    const reviews = useSelector(state => state.products.productReviews)
    const wishlistItems = useSelector(state => state.wishlist.items)

    const [colorImages, setColorImages] = useState([])
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);

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
            if (sizes[0] === null) {
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


    }, [product])

    const loadProductDetails = useCallback(async () => {
        let mounted = true;
        try {
            if (mounted) {
                await dispatch(productActions.fetchProductReviews('b1fdfbcd-d7c4-4680-80ee-622459e19054'))
                await dispatch(wishlistActions.fetchItems())
                await dispatch(productActions.fetchProductDetails('b1fdfbcd-d7c4-4680-80ee-622459e19054'))


            }
        } catch (err) {
            console.log(err)
        }
        finally {
            return () => mounted = false;
        }

    }, [])

    const addToWishlist = useCallback(async () => {
        let mounted = true;
        try {
            if (mounted) {
                await dispatch(wishlistActions.addToWishlist('b1fdfbcd-d7c4-4680-80ee-622459e19054'))
                // setPopupMessage("added to wishlist!")

            }

        } catch (err) {
            console.log(err.message)
            // setPopupMessage(err.message)
        }
        finally {
            return () => mounted = false;
        }
    })

    const removeFromWishlist = useCallback(async () => {
        let mounted = true;
        try {
            if (mounted) {
                await dispatch(wishlistActions.removeFromWishlist('b1fdfbcd-d7c4-4680-80ee-622459e19054'))
                // setPopupMessage("removed from wishlist!")
            }
        } catch (err) {
            // setPopupMessage(err.message)
            console.log(err.message)
        }
        finally {
            return () => mounted = false;
        }

    }, [])


    useEffect(() => {
        loadProductDetails()
    }, []);

    useEffect(() => {
        getInventory()
    }, [product]);

    // useEffect(() => {

    // }, [wishlistItems])


    useLayoutEffect(() => {
        const inWishlist = wishlistItems.some(item => item.id === 'b1fdfbcd-d7c4-4680-80ee-622459e19054');

        const heartIcon = inWishlist ? "md-heart" : "md-heart-empty";
        props.navigation.setOptions({
            headerRight: () => (
                <GenericHeaderButton iconName={heartIcon}
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

    }, [wishlistItems]);



    const [random, setRandom] = useState(false)

    // const callRandom = () => {
    //    JSON.parse("[{\"SIZE\": \"XXL\", \"QUANTITY\": 2},{\"SIZE\": \"L\", \"QUANTITY\": 30}]")
    //    console.log('asdasd')
    //     setRandom(state => !state)
    // }




    const PictureView = useCallback(() => {
        return (
            <>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                >
                    {colorImages.map((item, index) => (
                        // <Image style={styles.image} {...item.image} transitionDuration={500} />

                        <Image style={styles.image} source={item.image} />
                        // <Image style={styles.image} source={require('../../assets/Images/groom.jpg')} />
                    ))}


                </ScrollView>
                {/* <Text>{reviews[0]?.reviewerName}</Text> */}
                <Text > {random ? 'whaddup' : 'nothin much wbu'}</Text>
                <Text > {product?.name}</Text>
            </>
        )

    }, [colorImages])

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

    return (
        <View>
            {/* <PictureView colorImages={[1, 2, 3]} /> */}
            <Text > {random ? 'whaddup' : 'nothin much wbu'}</Text>

            <Button title="Random" onPress={() => {
                console.log(random)
                setRandom(state => !state)
                wishlistItems.some(item => item.id === 'b1fdfbcd-d7c4-4680-80ee-622459e19054') ? removeFromWishlist() : addToWishlist()
                addToWishlist()


            }} />

            <FlatList ListHeaderComponent={PictureView} data={reviews} renderItem={renderReview} />
        </View>
    )

}


const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'flex-end'
    },
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
        margin: 20,
        fontSize: 22,
        fontWeight: '700',
        flex: 1,
        alignSelf: 'flex-start',
        color: 'black'
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
        padding: 10,
        marginTop: 30,
        width: '100%',
        justifyContent: 'space-between'
    },
    addReview: {
        color: 'grey',
        fontWeight: '700',
        fontSize: 12,
        flex: 1,
        width: 100,
        textAlign: 'right'

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
        maxHeight: 400,
        width: Dimensions.get('window').width * 0.9,
        maxWidth: 400,
        backgroundColor: 'white',
        marginTop: Dimensions.get('window').height / 1.8,
        borderRadius: 20

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

    },
    cartText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        flex: 1

    },
    priceText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        flex: 1,
        textAlign: 'right'

    },
    cartButtonContainer: {
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10
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

    },
    starsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }



}

)