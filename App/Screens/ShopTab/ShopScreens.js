import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback, useDebugValue } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';

import PRODUCTS from '../../dummy-data/Products'


import DrawerStack from './DrawerStack';
import ProductList from '../../components/ProductList';
import ScreenStyle from '../../Styles/ScreenStyle'
import Colors from '../../Styles/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as productsActions from '../../store/actions/products'
import ShoppingSessionTimer from '../../components/ShoppingSessionTimer';
import { set } from 'react-native-reanimated';
import LoadingScreen from '../../components/LoadingScreen';



const SHOP = [
    {
        id: '1',
        type: 'grid',
        data: PRODUCTS
    },
    {
        id: '2',
        type: 'banner',
        data: {
            id: '1',
            picture: require('../../assets/Images/featured1.jpg')
        }
    },
    {

        id: '3',
        type: 'banner',
        data: {
            id: '2',
            picture: require('../../assets/Images/featured2.jpg')
        }
    },
    {

        id: '4',
        type: 'tile',
        data: {
            id: '2',
            picture: require('../../assets/Images/groom.jpg'),
            title: 'Grooming Essentials'
        }
    },
    {
        id: '5',
        type: '3x3',
        title: 'Featured Categories',
        data: [
            {
                id: '1',
                picture: require('../../assets/Images/shirt2.jpeg'),
                name: 'Shirts'
            },
            {
                id: '1',
                picture: require('../../assets/Images/shirt2.jpeg'),
                name: 'Shirts'
            },
            {
                id: '1',
                picture: require('../../assets/Images/shirt2.jpeg'),
                name: 'Shirts'
            },
            {
                id: '1',
                picture: require('../../assets/Images/shirt2.jpeg'),
                name: 'Shirts'
            },
            {
                id: '1',
                picture: require('../../assets/Images/shirt2.jpeg'),
                name: 'Shirts'
            }
        ]
    }


]


const TOPSCROLLER = [
    {
        id: '1',
        picture: require('../../assets/Images/eidSale.jpg')
    },
    {
        id: '2',
        picture: require('../../assets/Images/eidSale.jpg')
    }
]



function ShopScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false)

    const dispatch = useDispatch();
    const allProducts = useSelector(
        state => state.products.products
    )

    const feed = useSelector(state => state.products.feed);
    const activeSessionId = useSelector(state => state.social.activeSessionId);
    const sessionGroupId = useSelector(state => state.social.sessionGroupId);

    const [iterLoading, setIsIterLoading] = useState(false)

    const [iter, setIter] = useState(0);


    const loadFeed = useCallback(async () => {
        try {
            setIsLoading(true);
            setIsRefreshing(true);

            await dispatch(productsActions.fetchShopFeed());
            setIsRefreshing(false)
            setIsLoading(false)
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false)
    })


    const setProductFn = useCallback(async (fn) => {
        try {
            await dispatch(productsActions.getProductsFn(fn))
        }
        catch (err) {

        }
    }, [])

    const loadAllProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            await dispatch(productsActions.fetchProducts())
            setIsLoading(false)
            setIter(0)
        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    })

    const loadMoreProducts = useCallback(async () => {

        if (!iterLoading) {
            try {


                setIsIterLoading(true);
                console.log('size' + allProducts.length)
                console.log('iter: ' + iter)
                await dispatch(productsActions.fetchProducts(iter))


                setIter(iter => iter + 1)
                setIsIterLoading(false)
            }

            catch (err) {
                console.log(err)
            }
        }

        setIsIterLoading(false)


    }, [iter, iterLoading])



    useEffect(() => {
        setIter(0)
        loadFeed()
        loadAllProducts()
    }, [])



    function renderTopScroller(itemData) {
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    setProductFn(productsActions.fetchProducts)
                    navigation.navigate('ProductList', {
                        showShopName: true
                    })

                }}>

                    <Image
                        style={styles.scrollerImage}
                        source={itemData.item.image}
                        resizeMode="cover"
                    />

                </TouchableOpacity>
            </View >
        )
    }

    const render4by4GridItem = (itemData) => {
        return (
            <View style={styles.smallGridItem}>
                <TouchableOpacity onPress={() => (navigation.navigate("Product", {
                    productId: itemData.item.id,
                }))}>
                    <Image source={itemData.item.image} style={styles.productGridImage} />
                </TouchableOpacity>
            </View>
        )
    }

    const render3by3GridItem = (itemData) => {
        return (
            <View style={styles.bigGridItem}>
                <TouchableOpacity
                    style={styles.bigGridTouch}
                    onPress={() => {
                        navigation.navigate('Product', {
                            productId: itemData.item.id
                        })
                    }}>

                    <Image source={itemData.item.image} style={styles.bigGridImage} resizeMode="cover" />
                    <Text style={styles.bigGridLabel}>{itemData.item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderShopFeedItems(itemData) {

        if (itemData.item.type === 1) {
            //scrollable horizontal banners
            return (
                <View style={styles.scrollerImageContainer}>
                    <FlatList style={styles.scoller} data={itemData.item.banners} horizontal={true} pagingEnabled={true} renderItem={renderTopScroller} />
                </View>

            )

        }

        if (itemData.item.type === 2) {
            //horizontal banner

            return (
                <View style={styles.banner}>
                    <TouchableOpacity onPress={() => (navigation.navigate('ProductList'))}>

                        <Image source={itemData.item.banners[0].image} style={styles.featuredImage} />

                    </TouchableOpacity>
                </View>

            )

        }

        if (itemData.item.type === 3) {
            return (
                <TouchableOpacity>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <View style={styles.tile}>
                        <Image source={itemData.item.banners[0].image} style={styles.tileImage} resizeMode="cover" />

                    </View>


                </TouchableOpacity>
            )
        }
        if (itemData.item.type === 4) {

            return (
                <>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <View style={styles.productGridContainer}>
                        <FlatList data={itemData.item.lists} renderItem={render4by4GridItem} numColumns={2} />
                    </View>
                </>
            )
        }





        if (itemData.item.type === 5) {
            //3by3 grid

            return (
                <>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <View style={styles.bigGrid}>

                        <FlatList data={itemData.item.lists} renderItem={render3by3GridItem} numColumns={3} />
                        {/* <View style={styles.bigGridRow}>
                            <TouchableOpacity>

                                <Image source={itemData.item.data[0].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={itemData.item.data[0].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={itemData.item.data[0].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>


                        </View>
                        <View style={styles.bigGridRow}>
                            <TouchableOpacity>
                                <Image source={itemData.item.data[0].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={itemData.item.data[0].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={itemData.item.data[1].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>


                        </View>
                        <View style={styles.bigGridRow}>
                            <TouchableOpacity>
                                <Image source={itemData.item.data[1].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={itemData.item.data[2].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Image source={itemData.item.data[3].picture} style={styles.bigGridImage} resizeMode="cover" />
                                <Text style={styles.bigGridLabel}>{itemData.item.data[0].name}</Text>
                            </TouchableOpacity>


                        </View> */}

                    </View>
                </>
            )
        }


    }



    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <View style={styles.screen}>
            <ShoppingSessionTimer />


            <FlatList
                data={feed} renderItem={renderShopFeedItems}
                // onEndReached={loadAllProducts}
                onRefresh={loadFeed}
                refreshing={isRefreshing}
                ListFooterComponent={
                    <View style={styles.screen}>
                        <Text style={styles.title}>All Products</Text>
                        <ProductList
                            onEndReached={loadMoreProducts}
                            navigation={navigation}
                            data={allProducts}
                            showShopName={true}
                        />
                    </View>

                }
                style={styles.list}
            />
        </View>
    );

}



export default function ShopStack(props) {
    return (
        <DrawerStack name="Shop" navigation={props.navigation} component={ShopScreen} title="Shop" />
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, //ensures that this view takes all space it can get,
        backgroundColor: Colors.screenBackgroundColor,
        alignItems: 'center',
        maxWidth: Dimensions.get('window').width
    },
    list: {
        maxWidth: Dimensions.get('window').width
    },

    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        width: 150
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    scroller: {
        backgroundColor: Colors.screenBackgroundColor
    },
    scrollerImageContainer: {

        width: Dimensions.get('window').width,
        maxWidth: 600,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300

    },
    scrollerImage: {

        width: Dimensions.get('window').width,
        maxWidth: 600,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300

    },
    productGridContainer: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: Dimensions.get('window').width
    },
    smallGridItem: {
        margin: 20,
    },
    productGridImage: {
        height: 100,
        width: Dimensions.get('window').width / 2.5,

        resizeMode: 'contain',
    },
    productGridTitle: {
        alignSelf: 'flex-start',
        fontSize: 22,
        marginBottom: 5,
        fontWeight: '500'
    },
    banner: {
        height: 200,
        width: Dimensions.get('window').width,

    },
    featuredImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    title: {
        fontSize: 25,
        color: Colors.primaryColor,
        fontWeight: '700',
        margin: 10,
        alignSelf: 'flex-start',
        width: '100%'
    },
    tile: {
        width: '100%',
        height: Dimensions.get('window').width,
        maxWidth: 600,
        maxHeight: 600
    },
    tileImage: {
        height: '100%',
        width: '100%'

    },
    bigGrid: {
        width: '100%',
        maxWidth: 600,
        // height: 500,
        
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    bigGridRow: {
        flexDirection: 'row',
        width: '100%',
        height: '33%',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    bigGridTouch: {
        margin: 0,
        padding: 0
    },
    bigGridImage: {
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        borderRadius: Dimensions.get('window').width / 8,
        maxHeight: 150,
        maxWidth: 150,

    },
    bigGridLabel: {
        alignSelf: 'center',
        fontWeight: '500',
        marginTop: 10,
        flex: 1,
        maxHeight: 50
    },
    bigGridItem: {

        
        width: Dimensions.get('window').width / 4,
        margin: 10,
        alignItems: 'center',

    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupShopBanner: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.anotherColor,
        justifyContent: 'center',
        padding: 10
    }


})