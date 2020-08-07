import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { TextInput, StyleSheet, Text, View, Dimensions, Image, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';
import RatingStars from '../../components/RatingStars'
import ColorCircles from '../../components/ColorCircles'

import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products'
import * as wishlistActions from '../../store/actions/wishlist'

import * as cartActions from '../../store/actions/cart'
import * as popupActions from '../../store/actions/Popup'

import GenericHeaderButton from '../../components/GenericHeaderButton'
import SmallPopup from '../../components/SmallPopup';
import SizeCircles from '../../components/SizeCircles';
import HOST from "../../components/host";

import TouchableStars from '../../components/TouchableStars'

import LoadingScreen from '../../components/LoadingScreen';
import Time from '../../components/Time';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.route.params?.productId



    const userId = useSelector(state => state.auth.userId);
    const loggedIn = userId ? true : false

    const product = useSelector(state => state.products.productDetails);

    const reviews = useSelector(state => state.products.productReviews)


    const [reviewText, setReviewText] = useState(null)
    const [rating, setRating] = useState(null);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const [colorImages, setColorImages] = useState([])
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    const [shareVisible, setShareVisible] = useState(false);
    const [picturesModalVisible, setPicturesModalVisible] = useState(false);




    const loadProductDetails = useCallback(async () => {

        try {

            setIsLoading(true)
            await dispatch(productActions.fetchProductReviews(productId))
            await dispatch(productActions.fetchProductDetails(productId))
            setIsLoading(false)


        } catch (err) {
            console.log(err)
        }


    }, [productId])

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


    }, [productId, iterLoading, iter])



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

                return {
                    size: item.SIZE,
                    quantity: item.QUANTITY
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
            if (sizes[0].size === null || sizes[0].size === "") {
                setSizes([])
            }
            else {
                setSizes(sizes)
            }
            if (gotColors[0] === undefined || gotColors[0] === "") setColors([])
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


        if (!loggedIn) {
            props.navigation.navigate('Login');
        }
        else {
            try {

                console.log(colors.length)
                if (colors.length !== 0 && selectedColor === null) {

                    // throw new Error('select color pless')
                    dispatch(popupActions.setMessage('select color pless'))

                }
                else if (sizes.length !== 0 && selectedSize === null) {
                    // throw new Error('select size pless')
                    dispatch(popupActions.setMessage('select size pless'))

                }
                else {
                    await dispatch(cartActions.addToCart(productId, color, size, quantity))
                    // setPopupMessage("added to cart!")

                    // setAddCartModalVisible(true)
                    //setAddCartMessage(cartMessage);
                    // window.setTimeout(() => (setAddCartModalVisible(false)), 2500)
                }





            } catch (err) {
                console.log(err.message)

                //setAddCartMessage('Failed to add to cart')
            }
        }


    }, [loggedIn, selectedColor, selectedSize, colors, sizes])



    const addToWishlist = useCallback(async () => {

        try {

            await dispatch(wishlistActions.addToWishlist(productId))

            await dispatch(productActions.fetchProductDetails(productId))
            // setPopupMessage("added to wishlist!")

        } catch (err) {
            console.log(err.message)

        }


    }, [productId])

    const removeFromWishlist = useCallback(async () => {

        try {

            await dispatch(wishlistActions.removeFromWishlist(productId))

            await dispatch(productActions.fetchProductDetails(productId))


        } catch (err) {

            console.log(err.message)
        }

    }, [productId])

    const addReview = useCallback(async (rating, review) => {


        if (!loggedIn) {
            props.navigation.navigate('Login');

        }
        else {
            try {
                await dispatch(productActions.addReview(productId, rating, review))
                await dispatch(productActions.fetchProductDetails(productId))
                // setAddReviewPopupVisible(true);

                //setAddCartMessage(cartMessage);


            } catch (err) {
                console.log(err.message)
                if (err.message === "Column 'RATING' cannot be null") {
                    dispatch(popupActions.setMessage('Give a rating', true))
                }
                //setAddCartMessage('Failed to add to cart')
            }
        }


    }, [loggedIn, productId])


    useEffect(() => {
        loadProductDetails()

    }, []);

    useEffect(() => {
        getInventory()
    }, [product, selectedColor]);



    useLayoutEffect(() => {
        const inWishlist = product?.isFavorite === 1

        const heartIcon = inWishlist ? "md-heart" : "md-heart-empty";
        props.navigation.setOptions({
            headerRight: () => (
                <GenericHeaderButton
                    title="heart"
                    iconName={heartIcon}
                    onPress={() => {
                        // if (!loggedIn) {
                        //     //setInWishlist(false);
                        //     props.navigation.navigate('Login');
                        // }
                        // else {
                        if (inWishlist === true) {
                            removeFromWishlist();
                        }
                        else {
                            addToWishlist();

                        }

                        // }

                    }

                    }
                />
            )
        });

    }, [product, loggedIn]);



    const renderPic = (itemData) => {

        return (
            <TouchableOpacity onPress={() => setPicturesModalVisible(true)}>
                <Image source={itemData.item.image} style={styles.image} resizeMethod="resize" />
            </TouchableOpacity>




        )

    }

    const productPage = //useCallback(() => ( 
        product ? (
            <View style={{ ...ScreenStyle, ...styles.screen }}>

                <Text style={styles.name} >{product.name}</Text>


                <View style={styles.imageContainer}>

                    <FlatList initialNumToRender={8} pagingEnabled={true} horizontal={true} data={colorImages} renderItem={renderPic} />

                </View>


                {colors[0] === null || colors[0] === undefined ? null :

                    <View style={styles.colorContainer}>
                        <Text style={styles.text}> COLOR </Text>

                        <ColorCircles setSelectedColor={setSelectedColor} selectedColor={selectedColor} colors={colors} size={45} />

                    </View>
                }
                {sizes[0]?.size === null || sizes[0]?.size === undefined || sizes[0]?.size === "" ? null :
                    <View style={styles.sizeContainer}>
                        <Text style={styles.text}> SIZE </Text>
                        <SizeCircles setSelectedSize={setSelectedSize} selectedSize={selectedSize} sizes={sizes.map(size => size.size)} size={45} />
                    </View>
                }
                <TouchableOpacity onPress={() => {
                    addToCart(selectedColor, selectedSize, 1);
                    //props.navigation.goBack();

                }} >

                    <View style={{ ...styles.cartButtonContainer }}>

                        <Text style={styles.cartText}>+ ADD TO CART</Text>
                        <Text style={styles.priceText}>{"৳ " + product.price}</Text>

                    </View>

                </TouchableOpacity>

                <View style={styles.descriptionContainer}>

                    <Text style={styles.heading}>Description</Text>


                    <Text style={styles.description}>{product.description} </Text>
                </View>

                <View style={styles.ratingShare}>
                    {product.rating ? <RatingStars rating={product.rating} size={30} /> : <Text style={styles.heading}>No Ratings yet</Text>}

                    {/* <Ionicons color={Colors.buttonColor} name="ios-share-alt" size={40}/> */}

                    <TouchableOpacity style={styles.share} onPress={() => {
                        setShareVisible(true)

                    }}>
                        {/* <View > */}


                        <Text style={styles.shareText}>SHARE</Text>


                        {/* </View> */}
                    </TouchableOpacity>


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




                        <TextInput multiline={true} placeholder="Add Review Text" style={styles.addReviewInput}
                            onChangeText={(value) => (setReviewText(value))} />

                    </> : null
                }



            </View>
        ) : null
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
                        <Text style={styles.reviewerName}>{itemData.item.reviewerName.toUpperCase()} - </Text>
                        <Time value={itemData.item.date} />
                    </View>



                    <Text style={styles.reviewText}>{itemData.item.review}</Text>

                </View>

            )
        }

    }
    const CustomView = Platform.OS === "ios" ? KeyboardAvoidingView : View;


    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }
    else {
        return (
            <CustomView
                behavior="padding"
                keyboardVerticalOffset={64}
            // style={{ flex: 1 }}
            >
                <SmallPopup />
                {/* <Modal
                    isVisible={picturesModalVisible}
                    onBackButtonPress={() => setPicturesModalVisible(false)}
                    onBackdropPress={() => setPicturesModalVisible(false)}
                    style={{
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                        margin: 0
                    }}
                >
                    <ImageZoom
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={Dimensions.get('window').width}
                        imageHeight={Dimensions.get('window').width}
                    >
                        <Image source={colorImages[0].image} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} />
                        <Image source={colorImages[1].image} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} />
                    </ImageZoom>

                </Modal> */}

                {shareVisible ?


                    <TouchableWithoutFeedback onPress={() => { setShareVisible(false) }}>
                        <View style={styles.modalBackdrop}>
                            <TouchableWithoutFeedback>
                                <View style={styles.shareModal}>
                                    <Text style={styles.title}>Sharing Options</Text>

                                    <TouchableOpacity style={styles.shareItem} onPress={() => {
                                        if (!userId) {
                                            props.navigation.navigate('Login')
                                        }
                                        else {
                                            props.navigation.navigate('NewPostChooseLayout', {
                                                product: product
                                            })

                                        }
                                    }}>
                                        <Text style={styles.shareText}>As Post</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.shareItem} onPress={() => {
                                        if (!userId) {
                                            props.navigation.navigate('Login')
                                        }
                                        else {
                                            props.navigation.navigate('ShareGroup', {
                                                productId: product.id
                                            })
                                        }

                                    }}>
                                        <Text style={styles.shareText}>As Chat</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.shareItem} onPress={() => {
                                        // Sharing.shareAsync('https://somerandomurl.com/productId')
                                    }}>
                                        <Text style={styles.shareText}>With Other apps</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { setShareVisible(false) }}>
                                        <Text style={styles.dismissText}>Dismiss</Text>
                                    </TouchableOpacity>


                                </View>
                            </TouchableWithoutFeedback>

                        </View>

                    </TouchableWithoutFeedback>

                    : null}
                <FlatList
                    ListHeaderComponent={productPage}
                    data={reviews}
                    renderItem={renderReview}
                    onEndReached={loadMoreReviews}

                />



            </CustomView>
        )
    }








}

const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'flex-end',
        marginVertical: 20
    },

    modalBackdrop: {
        position: "absolute",
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',




    },
    shareModal: {
        flexDirection: 'column',
        height: 300,
        width: 200,
        backgroundColor: 'white',
        zIndex: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: "flex-start",
        alignItems: 'center'

    },
    shareItem: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    dismissText: {
        color: Colors.primaryColor,
        marginTop: 30

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
    ratingShare: {
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
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
    description: {
        fontFamily: 'WorkSans_400Regular',
        color: 'grey',
        fontSize: 18,
        letterSpacing: -1,
        marginVertical: 20

    },
    share: {
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 30
    },
    shareText: {
        fontSize: 13,
        fontWeight: '700',
        width: 100,
        textAlign: 'center',
        color: 'black',
        width: '100%'


    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontFamily: 'PlayfairDisplay_600SemiBold',
        fontSize: 40,
        marginVertical: 30,
        marginHorizontal: 20

    },
    image: {
        height: 500,
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
        alignItems: 'center',


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
        // flex: 1
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

    addReviewButtonContainer: {
        flex: 1,
    },
    addReviewInput: {

        height: 100,
        borderWidth: 0.5,
        borderRadius: 2,
        margin: 10,
        padding: 10,

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
        // borderRadius: 40,
        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.5,
        elevation: 20
    },
    cartText: {
        color: 'white',
        fontFamily: 'WorkSans_400Regular',
        fontSize: 20,
        letterSpacing: -0.5,
        flex: 1

    },
    priceText: {
        fontFamily: 'WorkSans_500Medium',
        color: 'white',
        fontSize: 18,
        flex: 1,
        textAlign: 'right'

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