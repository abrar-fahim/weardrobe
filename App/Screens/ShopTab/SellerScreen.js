import 'react-native-gesture-handler';
import React, { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView, SectionList, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';


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



export default function SellerScreen(props) {
    const shopId = props.route.params?.shopId ?? 'default'

    const loggedIn = useSelector(state => state.auth.userId, (left, right) => (left.auth.userId === right.auth.userId)) === null ? false : true


    const dispatch = useDispatch();


    const products = useSelector(state => state.shops.shopProducts)
    const shopDetails = useSelector(state => state.shops.shopDetails)
    const myShops = useSelector(state => state.shops.myShops)
    const categories = useSelector(state => state.shops.categories)

    const [isLoading, setIsLoading] = useState(true);

    const followShop = useCallback(async (shopId) => {
        try {
            await dispatch(shopsActions.followShop(shopId))
        }
        catch (err) {
            console.log(err);

        }
    }, [])

    const unFollowShop = useCallback(async (shopId) => {
        try {
            await dispatch(shopsActions.unFollowShop(shopId))
        }
        catch (err) {
            console.log(err);

        }
    }, [])


    const setProductsFn = useCallback(async (categoryId) => {
        try {
            await dispatch(productsActions.getProductsFn(() => (productsActions.fetchProductsByCategory(categoryId))))
        }
        catch (err) {
            console.log(err)
        }
    }, [])


    const loadShopProducts = useCallback(async (shopId) => {
        try {
            setIsLoading(true)
            await dispatch(shopsActions.fetchShopProducts(shopId))
            await dispatch(shopsActions.fetchShopDetails(shopId))
            await dispatch(shopsActions.fetchMyShops())
            await dispatch(shopsActions.fetchShopCategories(shopId))
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }, [])


    useEffect(() => {

        loadShopProducts(shopId)
    }, [])


    useLayoutEffect(() => {

        const liked = myShops.some(shop => shop.id === shopId) ? true: false

        const heartIcon = liked ? "md-heart" : "md-heart-empty"

        props.navigation.setOptions({
            headerTitle: shopDetails === null ? "" : shopDetails.name,
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <GenericHeaderButton iconName="md-information-circle-outline" onPress={() => {
                        props.navigation.navigate('SellerInfo', {
                            shopDetails: shopDetails
                        })

                    }} />
                    <GenericHeaderButton iconName={heartIcon} onPress={() => {
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
    }, [shopDetails, loggedIn, myShops])

    

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

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

                    <FlatList horizontal={true} data={itemData.item.inventory} renderItem={renderProduct} />
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

    let categoriesViews = [];
    // console.log(categories)
    let i = 2;

    while (i < categories.length) {


        if (i + 1 < categories.length) {
            const category1 = categories[i].id
            const category2 = categories[i + 1].id
            categoriesViews.push(
                <View>
                    <TouchableOpacity style={styles.smallCategory} onPress={() => {
                        setProductsFn(category1)
                        props.navigation.navigate('ProductList')
                    }}>
                        <Text style={styles.smallCategoryName}>{categories[i].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallCategory} onPress={() => {
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
                <View>
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
        <View style={ScreenStyle}>


            <ProductList ListHeaderComponent={
                <View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Image source={shopDetails.logo} style={{ height: 200, width: '99%' }} />
                    </View>

                    <View style={styles.ratingsContainer}>
                        <RatingStars rating={shopDetails.rating} size={25} />

                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{shopDetails.description}</Text>
                    </View>
                    <View style={styles.categoriesContainer}>
                        <Text style={styles.title}>Categories</Text>

                        <FlatList data={categories} renderItem={renderCategory} ListFooterComponent={(
                            <>
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

                            </>

                        )} />

                        < Text style={styles.categoryName}>All Products</Text>
                    </View>



                </View>


            }
                showShopName={false}
                data={products} navigation={props.navigation} />

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
        fontSize: 20,
        color: Colors.primaryColor
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