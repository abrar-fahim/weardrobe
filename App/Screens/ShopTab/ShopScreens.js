import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback, useDebugValue } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';



import DrawerStack from './DrawerStack';
import ProductList from '../../components/ProductList';
import ScreenStyle from '../../Styles/ScreenStyle'
import Colors from '../../Styles/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as productsActions from '../../store/actions/products';
import ShoppingSessionTimer from '../../components/ShoppingSessionTimer';
import LoadingScreen from '../../components/LoadingScreen';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';



// const SHOP = [
//     {
//         id: '1',
//         type: 'grid',
//         data: PRODUCTS
//     },
//     {
//         id: '2',
//         type: 'banner',
//         data: {
//             id: '1',
//             picture: require('../../assets/Images/featured1.jpg')
//         }
//     },
//     {

//         id: '3',
//         type: 'banner',
//         data: {
//             id: '2',
//             picture: require('../../assets/Images/featured2.jpg')
//         }
//     },
//     {

//         id: '4',
//         type: 'tile',
//         data: {
//             id: '2',
//             picture: require('../../assets/Images/groom.jpg'),
//             title: 'Grooming Essentials'
//         }
//     },
//     {
//         id: '5',
//         type: '3x3',
//         title: 'Featured Categories',
//         data: [
//             {
//                 id: '1',
//                 picture: require('../../assets/Images/shirt2.jpeg'),
//                 name: 'Shirts'
//             },
//             {
//                 id: '1',
//                 picture: require('../../assets/Images/shirt2.jpeg'),
//                 name: 'Shirts'
//             },
//             {
//                 id: '1',
//                 picture: require('../../assets/Images/shirt2.jpeg'),
//                 name: 'Shirts'
//             },
//             {
//                 id: '1',
//                 picture: require('../../assets/Images/shirt2.jpeg'),
//                 name: 'Shirts'
//             },
//             {
//                 id: '1',
//                 picture: require('../../assets/Images/shirt2.jpeg'),
//                 name: 'Shirts'
//             }
//         ]
//     }


// ]


// const TOPSCROLLER = [
//     {
//         id: '1',
//         picture: require('../../assets/Images/eidSale.jpg')
//     },
//     {
//         id: '2',
//         picture: require('../../assets/Images/eidSale.jpg')
//     }
// ]



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
            setIsLoading(false)
        }

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
            setIsLoading(false)
        }

    })

    const loadMoreProducts = useCallback(async () => {

        if (!iterLoading) {
            try {


                setIsIterLoading(true);
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

    const render4ItemGrid = (itemData) => {
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
            // <View >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Product', {
                        productId: itemData.item.id
                    })
                }}
                style={styles.bigGridItem}
            >

                <Image source={itemData.item.image} style={styles.bigGridImage} resizeMode="cover" />
                <Text style={styles.bigGridLabel}>{itemData.item.name}</Text>
                <Text style={styles.bigGridPrice}>৳ {itemData.item.price}</Text>
            </TouchableOpacity>
            // </View>
        )
    }

    function renderShopFeedItems(itemData) {

        if (itemData.item.type === 1) {
            //scrollable horizontal banners
            return (
                <View style={styles.scrollerImageContainer}>

                    <TouchableOpacity onPress={() => {
                        setProductFn(productsActions.fetchProducts)
                        navigation.navigate('ProductList', {
                            showShopName: true
                        })


                    }}
                        style={styles.topBanner}
                    >

                        <View style={styles.topBannerTitleContainer}>
                            <Text style={styles.topBannerTitle}>{itemData.item.title}</Text>
                            <Text style={styles.topBannerSubTitle}>{itemData.item.description.toUpperCase()}</Text>

                        </View>



                        <Image

                            style={styles.scrollerImage}
                            source={itemData.item.banners[2]?.image}
                            resizeMode="cover"
                        />

                        <Image
                            style={styles.scrollerImage}
                            source={itemData.item.banners[3]?.image}
                            resizeMode="cover"
                        />

                    </TouchableOpacity>

                    {/* <FlatList style={styles.scoller} data={itemData.item.banners} horizontal={true} pagingEnabled={true} renderItem={renderTopScroller} /> */}
                </View>

            )

        }

        if (itemData.item.type === 2) {
            //horizontal banner

            if (itemData.index % 2 === 0) {

                return (

                    <View style={styles.item2Container}>
                        <TouchableOpacity onPress={() => navigation.push('ParentCategories')}>
                            <Image
                                source={require('../../assets/Images/categories.jpg')}
                                style={styles.categoryImage}

                            />
                            <Text style={styles.categoryText}>BROWSE CATEGORIES</Text>

                        </TouchableOpacity>


                        <View style={styles.banner}>

                            <View style={styles.bannerTitleContainer}>
                                <Text style={styles.bannerTitle}>{itemData.item.title}</Text>
                                <Text style={styles.bannerSubTitle}>{itemData.item.description}</Text>

                            </View>


                            <TouchableOpacity
                                onPress={() => (navigation.navigate('ProductList'))}
                                style={styles.bannerImageContainer}

                            >

                                <Image
                                    style={styles.bannerImage}
                                    key="abc"
                                    source={itemData.item.banners[0].image}
                                    resizeMode="cover"
                                />

                            </TouchableOpacity>
                        </View >

                    </View>


                )

            }

            else {
                return (
                    <View style={styles.banner}>
                        <TouchableOpacity
                            onPress={() => (navigation.navigate('ProductList'))}
                            style={styles.bannerImageContainer}
                        >

                            <Image
                                style={styles.bannerImage}
                                key="abc"
                                source={itemData.item.banners[0].image}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>

                        <View style={styles.bannerTitleContainerAlternate}>
                            <Text style={styles.bannerTitle}>{itemData.item.title}</Text>
                            <Text style={styles.bannerSubTitle}>{itemData.item.description}</Text>

                        </View>



                    </View >

                )

            }



        }

        if (itemData.item.type === 3) {
            return (
                <TouchableOpacity style={styles.tile}>
                    <View style={styles.tileTitleContainer}>
                        <Text style={styles.tileTitle}>{itemData.item.title}</Text>

                    </View>



                    <Image source={itemData.item.banners[0].image} style={styles.tileImage} resizeMode="cover" />




                </TouchableOpacity>
            )
        }
        if (itemData.item.type === 4) {

            return (
                <>
                    <Text style={styles.grid4ItemTitle}>{itemData.item.title}</Text>
                    <View style={styles.productGridContainer}>
                        <FlatList data={itemData.item.lists} renderItem={render4ItemGrid
                        } numColumns={2} />
                    </View>
                </>
            )
        }





        if (itemData.item.type === 5) {
            //3by3 grid

            return (
                <>

                    <View style={styles.bigGrid}>
                        <Text style={styles.bigGridTitle}>
                            {itemData.item.title}
                        </Text>
                        <Text style={styles.bigGridDescription}>{itemData.item.description}</Text>

                        <FlatList data={itemData.item.lists} renderItem={render3by3GridItem} horizontal={true} />

                        <TouchableOpacity style={styles.bigGridButton}>
                            <Text style={styles.bigGridButtonText}>Browse all latest products</Text>

                        </TouchableOpacity>







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
                onRefresh={() => {
                    loadFeed();
                    loadAllProducts();
                }}
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
        backgroundColor: 'white',
        alignItems: 'center'
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
        // maxWidth: 600,
        justifyContent: 'center',
        alignItems: 'center',
        height: 500

    },
    topBanner: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
    },
    topBannerTitleContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2

    },
    topBannerTitle: {
        fontFamily: 'PlayfairDisplay_600SemiBold',
        fontSize: 70,
        color: 'white',
        zIndex: 2

    },
    topBannerSubTitle: {
        fontFamily: 'WorkSans_400Regular',
        fontSize: 18,
        color: 'white',
        zIndex: 2,
        letterSpacing: 1

    },
    scrollerImage: {


        width: Dimensions.get('window').width / 2,
        // maxWidth: 600,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'

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
    item2Container: {
        flexDirection: 'column',
    },
    categoryImage: {
        height: 300,
        width: '100%',
        resizeMode: "cover",
        justifyContent: 'flex-end'
    },
    categoryText: {
        fontFamily: 'WorkSans_400Regular',
        fontSize: 22,
        position: 'absolute',
        top: 5,
        width: '100%',
        textAlign: 'center',


    },
    banner: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 300,
        width: Dimensions.get('window').width,

    },
    bannerImageContainer: {
        height: '100%',
        width: '50%',


    },
    bannerImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    bannerTitleContainer: {
        flexDirection: 'column',
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        padding: 20

    },
    bannerTitleContainerAlternate: {
        flexDirection: 'column',
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: "flex-end",
        padding: 20,
        zIndex: 2

    },

    bannerTitle: {
        fontFamily: 'WorkSans_500Medium',
        fontSize: 20,
        letterSpacing: -0.1

    },

    bannerSubTitle: {
        fontFamily: 'WorkSans_400Regular',
        fontSize: 16,
        letterSpacing: -0.5

    },
    grid4ItemTitle: {
        fontFamily: 'PlayfairDisplay_400Regular',
        fontSize: 25,
        margin: 10,
        width: '100%'


    },
    tileTitleContainer: {
        position: 'absolute',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2

    },
    tileTitle: {
        fontFamily: 'PlayfairDisplay_600SemiBold',
        fontSize: 35,
        margin: 10,
        color: 'white',
        backgroundColor: 'rgba(212,212,212,0.7)',
        width: '100%',
        textAlign: 'center',
        zIndex: 2

    },
    tile: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
       
    },
    tileImage: {
        height: '100%',
        width: '100%',


    },
    bigGridTitle: {
        fontFamily: 'PlayfairDisplay_600SemiBold',
        fontSize: 35,
        width: '100%',
        marginVertical: 20

    },
    bigGrid: {
        flexDirection: 'column',
        width: '100%',
        padding: 5,
        marginVertical: 40,
        backgroundColor: 'white'

    },
    bigGridDescription: {

        fontFamily: 'WorkSans_400Regular',
        margin: 10,
        fontSize: 18,
        letterSpacing: -0.8
    },

    bigGridItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: 200,
        marginHorizontal: 40,

    },
    bigGridImage: {
        width: '100%',
        height: 300,
        resizeMode: "cover"
    },
    bigGridLabel: {
        fontFamily: 'PlayfairDisplay_400Regular',
        fontSize: 26,
        width: '100%',
        textAlign: 'left',
    },
    bigGridPrice: {
        fontFamily: 'WorkSans_500Medium',
        fontSize: 16,
        letterSpacing: -0.1,
        width: '100%',
        textAlign: 'left',

    },
    bigGridButton: {
        borderWidth: 1,
        borderColor: Colors.accentColor,
        height: 40,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 30
    },

    bigGridButtonText: {
        fontFamily: 'WorkSans_500Medium',
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        letterSpacing: -0.5,


    },
    groupShopBanner: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.anotherColor,
        justifyContent: 'center',
        padding: 10
    }


})