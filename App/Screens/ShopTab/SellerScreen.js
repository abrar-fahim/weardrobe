import 'react-native-gesture-handler';

import React, { useEffect, useLayoutEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView, SectionList, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


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
import Colors from '../../Styles/Colors';
import HOST from "../../components/host";
import * as productsActions from '../../store/actions/products'
import LoadingScreen from '../../components/LoadingScreen'
// import { createAppContainer, FlatList } from 'react-navigation';




const SellerShopScreen = (props) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.shops.categories)
    const products = useSelector(state => state.shops.shopProducts)
    const shopDetails = useSelector(state => state.shops.shopDetails)

    let categoriesViews = [];
    // console.log(categories)
    let i = 2;


    const setProductsFn = useCallback(async (categoryId) => {
        try {
            await dispatch(productsActions.getProductsFn(() => (productsActions.fetchProductsByCategory(categoryId))))
        }
        catch (err) {
            console.log(err)
        }
    }, [])

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

                        horizontal={true} data={itemData.item.inventory} renderItem={renderProduct} />
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
    return (

        <ProductList
            // listKey="a"
            bounces={false}

            ListHeaderComponent={
                <View>

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

                            )} />

                        < Text style={styles.categoryName}>All Products</Text>
                    </View>



                </View>


            }
            showShopName={false}
            data={products} navigation={props.navigation} />


    )
}





const SellerPostsScreen = (props) => {
    const dispatch = useDispatch();
    return <Text>hello</Text>
}



export default function SellerScreen(props) {
    const shopId = props.route.params?.shopId ?? 'default'

    const loggedIn = useSelector(state => state.auth.userId, (left, right) => (left.auth.userId === right.auth.userId)) === null ? false : true


    const dispatch = useDispatch();

    const horizontalPageRef = useRef(null)
    const topBarAnim = useRef(new Animated.Value(0)).current;



    const shopDetails = useSelector(state => state.shops.shopDetails)
    // const myShops = useSelector(state => state.shops.myShops)

    const [isLoading, setIsLoading] = useState(true);

    const followShop = useCallback(async (shopId) => {
        try {
            await dispatch(shopsActions.followShop(shopId))
            await dispatch(shopsActions.fetchShopDetails(shopId))
        }
        catch (err) {
            console.log(err);

        }
    }, [])

    const unFollowShop = useCallback(async (shopId) => {
        try {
            await dispatch(shopsActions.unFollowShop(shopId))
            await dispatch(shopsActions.fetchShopDetails(shopId))
        }
        catch (err) {
            console.log(err);

        }
    }, [])




    const loadShopProducts = useCallback(async (shopId) => {
        try {
            setIsLoading(true)
            await dispatch(shopsActions.fetchShopProducts(shopId))
            await dispatch(shopsActions.fetchShopDetails(shopId))
            // await dispatch(shopsActions.fetchMyShops())
            await dispatch(shopsActions.fetchShopCategories(shopId))
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [])


    useEffect(() => {
        loadShopProducts(shopId)
    }, [])


    useLayoutEffect(() => {

        const liked = shopDetails?.isFavorite === 1

        const heartIcon = liked ? "md-heart" : "md-heart-empty"

        props.navigation.setOptions({
            headerTitle: shopDetails === null ? "" : shopDetails.name,
            headerRight: () => (
                <View style={styles.headerButtons}>
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
                                    followShop(shopId)
                                }
                                else {
                                    unFollowShop(shopId)
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





    // const TopTab = createMaterialTopTabNavigator();
    // console.log(topBarAnim._value)

    return (
        <View style={ScreenStyle}>

            <FlatList

                ListHeaderComponent={
                    <>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Image source={shopDetails.logo} style={{ height: 200, width: '99%' }} />
                        </View>

                        <View style={styles.ratingsContainer}>
                            <RatingStars rating={shopDetails.rating} size={25} />

                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.title}>Description</Text>
                            <Text style={styles.description}>{shopDetails.description}</Text>


                        </View>
                    </>
                }
                data={[
                    {
                        id: '2',
                        view: <>

                            <View style={styles.topTab}>
                                <TouchableOpacity
                                    style={styles.topTabTouch}
                                    onPress={() => {
                                        horizontalPageRef.current.scrollToIndex({
                                            Animated: true,
                                            index: 0,
                                        })
                                    }}
                                >
                                    <Text style={styles.topTabText} >1</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.topTabTouch}
                                    onPress={() => {
                                        horizontalPageRef.current.scrollToIndex({
                                            Animated: true,
                                            index: 1,
                                        })
                                    }}
                                >
                                    <Text style={styles.topTabText}>2</Text>
                                </TouchableOpacity>


                            </View>
                            <View style={styles.barInactiveIndicator}>
                                <Animated.View style={[styles.barActiveIndicator, {
                                    left: scrollVal
                                }]

                                } />

                            </View>




                            {/* <TopTab.Navigator
                            tabBarOptions={{
                                indicatorStyle: {
                                    backgroundColor: Colors.tabBarActiveTintColor
                                }
                            }}
                        >


                            <TopTab.Screen
                                name="SellerShop"
                                component={SellerShopScreen}
                                initialParams={{ shopId: shopId }}


                            />
                            <TopTab.Screen
                                name="SellerPosts"
                                component={SellerShopScreen2}
                                initialParams={{ shopId: shopId }}
                            />

                        </TopTab.Navigator> */}
                        </>


                    },
                    {
                        id: '3',
                        view: (
                            <FlatList
                                data={[
                                    { id: '1', component: SellerShopScreen },
                                    { id: '2', component: SellerPostsScreen },
                                ]}
                                horizontal={true}
                                pagingEnabled={true}
                                initialNumToRender={2}
                                persistentScrollbar={true}
                                ref={horizontalPageRef}
                                // scrollBarThumbImage={require('../../assets/Images/bubbleMe.png')}

                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={10}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: topBarAnim } } }]
                                )}



                                bounces={false}
                                renderItem={({ item }) => (
                                    <View style={styles.screen}>
                                        <item.component navigation={props.navigation} />
                                    </View>

                                )}


                            />

                        )
                    }
                ]}
                stickyHeaderIndices={[1]}

                renderItem={({ item }) => (
                    item.view

                )}
            />


            {/* <SectionList
                // initialNumToRender={3}

                keyExtractor={({ item, index }) => index}
                stickySectionHeadersEnabled={true}
                invertStickyHeaders={false}
                nestedScrollEnabled={true}




                sections={
                    [{
                        title: 'top',
                        renderItem: ({ item }) => {
                            return item;

                        },
                        data: [(
                            <>
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <Image source={shopDetails.logo} style={{ height: 200, width: '99%' }} />
                                </View>

                                <View style={styles.ratingsContainer}>
                                    <RatingStars rating={shopDetails.rating} size={25} />

                                </View>

                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.title}>Description</Text>
                                    <Text style={styles.description}>{shopDetails.description}</Text>


                                </View>
                            </>
                        )]
                    },
                    {
                        title: 'header',
                        data: [(
                            <TopTab.Navigator
                                tabBarOptions={{
                                    indicatorStyle: {
                                        backgroundColor: Colors.tabBarActiveTintColor
                                    }
                                }}
                            >


                                <TopTab.Screen
                                    name="SellerShop"
                                    component={SellerShopScreen}
                                    initialParams={{ shopId: shopId }}
                                    

                                />
                                <TopTab.Screen
                                    name="SellerPosts"
                                    component={SellerPostsScreen}
                                    initialParams={{ shopId: shopId }}
                                />

                            </TopTab.Navigator>
                        )]
                    }]
                }

                renderItem={({ item, index }) => null}
                renderSectionHeader={({ section: { title, data } }) => {
                    if (title === 'header') {
                        return data
                    }
                }}

            /> */}

        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: Dimensions.get('window').width
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

    }
})