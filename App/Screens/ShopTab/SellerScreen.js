import 'react-native-gesture-handler';

import React, { useEffect, useLayoutEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView, SectionList, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, Animated, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { useSelector, useDispatch } from 'react-redux';

import { SELLERS } from '../../dummy-data/Sellers'
import ProductList from '../../components/ProductList';
import PRODUCTS from '../../dummy-data/Products';

import renderProductGridItem from '../../components/RenderProductGridItem'
import ScreenStyle from '../../Styles/ScreenStyle';
import RatingStars from '../../components/RatingStars';

import * as shopsActions from '../../store/actions/shops'

import GenericHeaderButton from '../../components/GenericHeaderButton'
import Colors from '../../Styles/Colors';
import HOST from "../../components/host";
import * as productsActions from '../../store/actions/products'
import * as magazineActions from '../../store/actions/magazine'
import * as chatActions from '../../store/actions/chats'
import LoadingScreen from '../../components/LoadingScreen'
import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
// import { createAppContainer, FlatList } from 'react-navigation';
import { GroupChatScreen } from '../SocialTab/GroupChatScreen'
import Post from '../../components/Post';




const SellerShopScreen = (props) => {

    const shopId = props.route.params?.shopId
    const dispatch = useDispatch();
    const categories = useSelector(state => state.shops.categories)
    const products = useSelector(state => state.shops.shopProducts)
    const shopDetails = useSelector(state => state.shops.shopDetails)

    const [isLoading, setIsLoading] = useState(true);

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    let categoriesViews = [];
    // console.log(categories)
    let i = 2;


    const setProductsFn = useCallback(async (categoryId) => {
        try {
            await dispatch(productsActions.getProductsFn((iter = 0) => (productsActions.fetchProductsByCategory(categoryId, iter))))
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    const loadShopProducts = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(shopsActions.fetchShopProducts(shopId))
            await dispatch(shopsActions.fetchShopCategories(shopId))
            setIter(0)
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [shopId])




    useEffect(() => {
        loadShopProducts()
    }, [])

    const loadMoreShopProducts = useCallback(async () => {

        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(shopsActions.fetchShopProducts(shopId, iter))
                setIter(iter => iter + 1)
                setIterLoading(false)
            }

        }
        catch (err) {

            console.log(err)
        }
        setIterLoading(false)
    }, [iterLoading, iter, shopId])

    const renderCategory = (itemData) => {

        if (itemData.index < 2) {
            return (
                <View>
                    <View style={styles.categoryNameContainer}>
                        <Text style={styles.categoryName}>{itemData.item.name}</Text>
                        <TouchableOpacity onPress={() => {
                            setProductsFn(itemData.item.id)
                            props.navigation.navigate('ProductList')
                        }}>
                            <Text>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        // listKey="d"

                        horizontal={true}
                        data={itemData.item.inventory}
                        renderItem={renderProduct}
                        onEndReached={loadMoreShopProducts}

                    />
                </View>
            )
        }



    }
    const renderProduct = (itemData) => {


        let price;

        if (itemData.item.discount > 0) {
            const oldPrice = itemData.item.PRICE;
            const newPrice = oldPrice * (100 - itemData.item.DISCOUNT) / 100;
            price = (
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5 }}>
                    <Text style={styles.oldPrice}> {"BDT " + oldPrice}</Text>
                    <Text style={styles.price}> {"BDT " + newPrice}</Text>
                </View>
            )
        }

        else {
            price = (
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5 }}>
                    <Text style={styles.price}> {"BDT " + itemData.item.PRICE}</Text>
                </View>
            )
        }
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={() => (
                    props.navigation.navigate("Product", {
                        productId: itemData.item.PRODUCT_ID
                    })
                )}>

                    <Image source={{ uri: `${HOST}/img/temp/` + itemData.item.THUMBNAIL }} style={{ height: 150, width: 150, justifyContent: 'center', alignItems: 'center' }} />
                    <Text style={styles.itemName}> {itemData.item.PRODUCT_NAME}</Text>



                    <RatingStars rating={itemData.item.PRODUCT_RATING} />
                    {price}

                </TouchableOpacity>
            </View>
        )
    }



    while (i < categories.length) {


        if (i + 1 < categories.length) {
            const category1 = categories[i].id
            const category2 = categories[i + 1].id
            categoriesViews.push(
                <View
                    key={i.toString()}
                >
                    <TouchableOpacity
                        style={styles.smallCategory}
                        onPress={() => {
                            setProductsFn(category1)
                            props.navigation.navigate('ProductList')
                        }}>
                        <Text style={styles.smallCategoryName}>{categories[i].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.smallCategory}
                        onPress={() => {
                            setProductsFn(category2)
                            props.navigation.navigate('ProductList')
                        }}>
                        <Text style={styles.smallCategoryName}>{categories[i + 1].name}</Text>
                    </TouchableOpacity>
                </View>


            )
            i += 2;
        }
        else {
            const category1 = categories[i].id
            categoriesViews.push(
                <View
                    key={i.toString()}
                >
                    <TouchableOpacity style={styles.smallCategory} onPress={() => {
                        setProductsFn(category1)
                        props.navigation.navigate('ProductList')
                    }}>
                        <Text style={styles.smallCategoryName}>{categories[i].name}</Text>
                    </TouchableOpacity>
                </View>


            )
            i++;

        }

    }

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }
    return (

        <ProductList
            // listKey="a"
            bounces={false}


            ListHeaderComponent={
                <View>


                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Image source={shopDetails?.logo} style={{ height: 200, width: '99%' }} />
                    </View>

                    <View style={styles.ratingsContainer}>
                        <RatingStars rating={shopDetails?.rating} size={25} />

                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.title}>Description</Text>
                        <Text style={styles.description}>{shopDetails?.description}</Text>


                    </View>


                    <View style={styles.categoriesContainer}>
                        <Text style={styles.title}>Categories</Text>

                        <FlatList
                            // listKey="d"
                            data={categories}
                            renderItem={renderCategory}
                            ListFooterComponent={(
                                <View>
                                    <View style={styles.categoryNameContainer}>
                                        <Text>Browse All Categories</Text>
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate('Categories', {
                                                shopId: shopDetails.id
                                            })
                                        }}>
                                            <Text>View All</Text>
                                        </TouchableOpacity>

                                    </View>

                                    <ScrollView horizontal={true}>

                                        {categoriesViews}
                                    </ScrollView>

                                </View>

                            )}
                            ListEmptyComponent={
                                <Text>no categories yet</Text>
                            }
                        />

                        < Text style={styles.categoryName}>All Products</Text>
                    </View>



                </View>


            }
            showShopName={false}
            data={products} navigation={props.navigation} />


    )
}





const SellerPostsScreen = (props) => {

    const userId = useSelector(state => state.auth.userId)

    const shopId = props.route.params?.shopId

    const shopPosts = useSelector(state => state.shops.posts)

    const shopPostComments = useSelector(state => state.magazine.shopPostComments);
    const shopPostReacts = useSelector(state => state.magazine.shopPostReacts);
    const shopDetails = useSelector(state => state.shops.shopDetails);



    const [showComments, setShowComments] = useState(false)

    const [showReacts, setShowReacts] = useState(false)

    const [isLoading, setIsLoading] = useState(true);

    const [comment, setComment] = useState('');

    const [change, setChange] = useState(0);    //this forces like icon to re render on each touch

    const [iters, setIters] = useState({
        shopPostComments: 1
    })

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)


    const dispatch = useDispatch();

    const loadPosts = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(shopsActions.getSellerPosts(shopId))
            setIsLoading(false)

        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [])

    const loadMorePosts = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true);
                await dispatch(shopsActions.getSellerPosts(shopId, iter))
                setIter(iter => iter + 1)
                setIterLoading(false);

            }




        }
        catch (err) {

            console.log(err)
        }
        setIterLoading(false);
    }, [iterLoading, iter])




    useEffect(() => {
        loadPosts();
    }, [])


    const renderPost = (itemData) => {

        return (
            <Post post={{
                ...itemData.item,
                name: shopDetails.name,
                username: shopDetails.username

            }}
                navigation={props.navigation}
                setChange={setChange}
                logo={shopDetails.logo}
            />
        )
    }
    if (isLoading) {
        return <LoadingScreen />
    }
    return (
        <View style={ScreenStyle}>



            <FlatList

                listKey="b"
                extraData={change}
                bounces={false}

                viewabilityConfig={{
                    waitForInteraction: false,
                    viewAreaCoveragePercentThreshold: 95
                }}
                data={shopPosts}
                renderItem={renderPost}
                onEndReached={loadMorePosts}
                ListEmptyComponent={
                    <Text>no posts yet</Text>
                }

            />

        </View>
    );
}



export default function SellerScreen(props) {
    const shopId = props.route.params?.shopId ?? 'default'

    const loggedIn = useSelector(state => state.auth.userId) ? true : false;
    const chatId = useSelector(state => state.social.groupId)

    const shopDetails = useSelector(state => state.shops.shopDetails);
    // const myShops = useSelector(state => state.shops.myShops)


    const dispatch = useDispatch();


    const [isLoading, setIsLoading] = useState(true);
    const [ChatVisible, setChatVisible] = useState(false);




    const horizontalPageRef = useRef(null)
    const topBarAnim = useRef(new Animated.Value(0)).current;









    const followShop = useCallback(async () => {
        try {
            await dispatch(shopsActions.followShop(shopId))
            await dispatch(shopsActions.fetchShopDetails(shopId))
        }
        catch (err) {
            console.log(err);

        }
    }, [shopId])

    const unFollowShop = useCallback(async () => {
        try {
            await dispatch(shopsActions.unFollowShop(shopId))
            await dispatch(shopsActions.fetchShopDetails(shopId))
        }
        catch (err) {
            console.log(err);

        }
    }, [shopId])

    const loadShopDetails = useCallback(async () => {
        try {
            setIsLoading(true)

            await dispatch(shopsActions.fetchShopDetails(shopId))



            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [shopId])


    const startShopChat = useCallback(async () => {
        try {
            setIsLoading(true)

            await dispatch(chatActions.createShopChat(shopId))



            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [shopId])







    useEffect(() => {
        loadShopDetails()
    }, [])



    useLayoutEffect(() => {

        const liked = shopDetails?.isFavorite === 1

        const heartIcon = liked ? "md-heart" : "md-heart-empty"

        props.navigation.setOptions({
            headerTitle: shopDetails === null ? "" : shopDetails.name,
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <GenericHeaderButton
                        title="chat"
                        iconName="md-chatbubbles"
                        onPress={async () => {
                            if (loggedIn) {
                                await startShopChat();
                                setChatVisible(state => !state);
                            }
                            else {
                                props.navigation.navigate('Login')
                            }



                        }} />
                    <GenericHeaderButton
                        title="info"
                        iconName="md-information-circle-outline"
                        onPress={() => {
                            props.navigation.navigate('SellerInfo', {
                                shopDetails: shopDetails
                            })

                        }} />
                    <GenericHeaderButton
                        title="heart"
                        iconName={heartIcon}
                        onPress={() => {
                            if (!loggedIn) {

                                props.navigation.navigate('Login');
                            }
                            else {
                                if (liked === false) {
                                    followShop()
                                }
                                else {
                                    unFollowShop()
                                }
                            }


                        }} />
                </View>
            )
        })
    }, [shopDetails, loggedIn])



    const scrollVal = topBarAnim.interpolate({
        inputRange: [0, Dimensions.get('window').width],
        outputRange: [0, Dimensions.get('window').width / 2],
        extrapolate: 'clamp'

    })

    if (isLoading) {
        return (
            <LoadingScreen />
        )

    }

    const TopTab = createMaterialTopTabNavigator()
    return (
        <View style={ScreenStyle}>

            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={300}
                animationOutTiming={300}
                isVisible={ChatVisible}
                onBackButtonPress={() => setChatVisible(false)}
                onBackdropPress={() => setChatVisible(false)}
                style={styles.chatModal}
            >

                <TouchableNativeFeedback
                    onPress={() => {
                        setChatVisible(false)
                    }

                    }
                    useForeground={true}
                >
                    <View style={styles.modalHeader}>
                        <AntDesign name="caretdown" size={20} color="grey" />
                    </View>

                </TouchableNativeFeedback>


                <GroupChatScreen
                    route={{
                        params: {
                            groupId: chatId,
                            type: 'SHOP',
                            name: shopDetails?.name,
                            logo: shopDetails?.logo
                        }

                    }}
                    navigation={props.navigation}
                    setChatVisible={setChatVisible}
                />


            </Modal>

            <TopTab.Navigator
                tabBarOptions={{
                    indicatorStyle: {
                        backgroundColor: Colors.tabBarActiveTintColor
                    }
                }}
            >
                <TopTab.Screen
                    name="Shop"
                    component={SellerShopScreen}
                    initialParams={{ shopId: shopId }}
                />
                <TopTab.Screen
                    name="Posts"
                    component={SellerPostsScreen}
                    initialParams={{ shopId: shopId }}
                />
            </TopTab.Navigator>



        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    modalHeader: {
        height: 40,
        backgroundColor: Colors.accentColor,
        justifyContent: 'center',
        alignItems: 'center'

    },
    description: {
        fontWeight: '400',
        color: 'grey'
    },

    descriptionContainer: {
        padding: 10,
        //marginVertical: 20,
    },

    topTab: {
        height: 50,
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.2,
        elevation: 10

    },
    topTabText: {

        textAlign: 'center',
        fontSize: 15,
        color: 'black'

    },
    topTabTouch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    barInactiveIndicator: {
        width: Dimensions.get('window').width / 2,
        backgroundColor: Colors.screenBackgroundColor,
        height: 3

    },
    barActiveIndicator: {
        width: Dimensions.get('window').width / 2,
        backgroundColor: Colors.primaryColor,
        height: 3,
        position: 'absolute',
        top: 0,
        left: 0

    },



    ratingsContainer: {
        padding: 20,
        alignItems: 'center'
    },
    headerButtons: {
        flexDirection: 'row'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',

    },
    categoryName: {
        fontSize: 22,
        color: Colors.primaryColor,
        fontWeight: '400',
        flex: 1
    },
    categoriesContainer: {
        margin: 20
    },
    gridItem: {
        margin: 20,
        height: 250,
        width: 150,
        backgroundColor: '#eae9e9'
    },
    itemName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600'

    },
    oldPrice: {
        fontSize: 15,
        color: 'black',
        fontWeight: '400',
        textDecorationLine: 'line-through',
        color: 'grey'
    },
    categoryNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    smallCategory: {
        height: 50,
        width: 100,
        borderRadius: 50,
        backgroundColor: Colors.primaryColor,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallCategoryName: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center'

    },
    gridItem: {
        flex: 1,
        padding: 10,
        margin: 0,
        width: '100%',
        flexDirection: 'column'
    },
    nameDP: {
        paddingLeft: 5
    },
    nameDP2:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    DP:
    {
        borderRadius: 25,
        overflow: 'hidden'
    },
    DPImage:
    {
        width: 40,
        height: 40
    },
    Name:
    {
        fontWeight: 'bold',
        fontSize: 20
    },
    Post:
    {
        paddingTop: 10
    },
    Post2:
    {
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: 400,
        borderRadius: 30,
        // overflow: 'hidden'
    },
    postImage:
    {
        height: '100%',
        width: Dimensions.get('window').width,
        alignSelf: 'center'
        // flex: 7,
    },
    Caption:
    {
        paddingTop: 10,
        borderLeftColor: 'black',
        fontWeight: 'bold',
        backgroundColor: 'grey',
        height: 50,
        width: '100%'
    },
    nums: {
        width: '100%',
        alignItems: 'center'
    },
    LikeComment:
    {
        paddingTop: 15,
        flexDirection: 'row'
    },
    Like:
    {
        paddingRight: 15,
        paddingLeft: 10,
        flex: 1
    },
    Comment:
    {
        flex: 3,
        paddingLeft: 5,
        height: 40,
        borderColor: 'black',
        backgroundColor: 'grey'
    },
    comment: {
        flexDirection: 'row',
        height: 100,
        margin: 10
    },
    commentX: {
        marginLeft: 30
    },

    commentContainer: {
        flexDirection: 'row',
        flex: 1
    },
    sendComment: {
        marginLeft: 3
    }

})