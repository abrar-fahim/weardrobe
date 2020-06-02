import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, ScrollView, Dimensions } from 'react-native';

import PRODUCTS from '../../dummy-data/Products'

import { TouchableOpacity } from 'react-native-gesture-handler';
import DrawerStack from './DrawerStack';
import ProductList from '../../components/ProductList';
import ScreenStyle from '../../Styles/ScreenStyle'
import Colors from '../../Styles/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as productsActions from '../../store/actions/products'



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


    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.products.products)


    const setProductFn = useCallback(async (fn) => {
        try {
            dispatch(productsActions.getProductsFn(fn))
        }
        catch (err) {

        }
    })

    const loadAllProducts = useCallback(async () => {
        try {
            dispatch(productsActions.fetchProducts())
        }
        catch (err) {
            console.log(err)
        }
    })




    function renderShopFeedItems(itemData) {
        if (itemData.item.type === 'grid') {
            return (
                <View style={styles.productGridContainer}>
                    <Text style={styles.title}> Trending now</Text>
                    <View style={styles.productGridRow}>
                        <TouchableOpacity onPress={() => (navigation.navigate("Product", {
                            productId: itemData.item.data[0].id,
                        }))}>
                            <Image source={itemData.item.data[0].picture} style={styles.productGridImage} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => (navigation.navigate("Product", {
                            productId: itemData.item.data[0].id,
                        }))}>
                            <Image source={itemData.item.data[0].picture} style={styles.productGridImage} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.productGridRow}>
                        <TouchableOpacity onPress={() => (navigation.navigate("Product", {
                            productId: itemData.item.data[0].id,
                        }))}>
                            <Image source={itemData.item.data[0].picture} style={styles.productGridImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => (navigation.navigate("Product", {
                            productId: itemData.item.data[0].id,
                        }))}>
                            <Image source={itemData.item.data[0].picture} style={styles.productGridImage} />
                        </TouchableOpacity>

                    </View>

                </View>
            )
        }

        if (itemData.item.type === 'banner') {

            return (
                <TouchableOpacity onPress={() => (navigation.navigate('ProductList'))}>
                    <View style={styles.banner}>
                        <Image source={itemData.item.data.picture} style={styles.featuredImage} />
                    </View>
                </TouchableOpacity>

            )

        }

        if (itemData.item.type === 'tile') {
            return (
                <TouchableOpacity>
                    <View style={styles.tile}>
                        <Text style={styles.title}>{itemData.item.data.title}</Text>
                        <Image source={itemData.item.data.picture} style={styles.tileImage} resizeMode="cover" />

                    </View>


                </TouchableOpacity>
            )
        }

        if (itemData.item.type === '3x3') {

            return (
                <>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <View style={styles.bigGrid}>
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


                        </View>

                    </View>
                </>
            )
        }


    }

    function renderTopScroller(itemData) {
        return (
            <TouchableOpacity onPress={() => {
                setProductFn(productsActions.fetchProducts)
                navigation.navigate('ProductList', {
                    showShopName: true
                })

            }}>
                <View>
                    <Image style={styles.scrollerImage} source={itemData.item.picture} />
                </View>
            </TouchableOpacity>
        )
    }


    const ListHeader = (
        <FlatList style={styles.scoller} data={TOPSCROLLER} horizontal={true} pagingEnabled={true} renderItem={renderTopScroller} />
    )
    return (
        <View style={ScreenStyle}>

            <FlatList
                ListHeaderComponent={ListHeader}
                data={SHOP} renderItem={renderShopFeedItems}
                onEndReached={loadAllProducts}
                ListFooterComponent={
                    <>
                        <Text style={styles.title}>All Products</Text>
                        <ProductList navigation={navigation} data={allProducts} showShopName={true} />
                    </>

                }

                onEndReached={() => (loadAllProducts())}
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
        flex: 1  //ensures that this view takes all space it can get
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
    scrollerImage: {
        height: 200,
        width: Dimensions.get('window').width
    },
    productGridContainer: {
        flexDirection: 'column',
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productGridRow: {
        flexDirection: 'row',
        height: '45%',
        width: '95%'
    },
    productGridImage: {
        height: '99%',
        width: Dimensions.get('window').width / 2,
        resizeMode: 'contain'
    },
    productGridTitle: {
        alignSelf: 'flex-start',
        fontSize: 22,
        marginBottom: 5,
        fontWeight: '500'
    },
    banner: {
        height: 200,
        width: '100%',
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
        margin: 20,
        alignSelf: 'flex-start',
        width: '100%'
    },
    tile: {
        width: '100%',
        height: Dimensions.get('window').width
    },
    tileImage: {
        height: '100%',
        width: '100%'

    },
    bigGrid: {
        width: '100%',
        height: 500,
        backgroundColor: Colors.accentColor,
        padding: 15

    },
    bigGridRow: {
        flexDirection: 'row',
        width: '100%',
        height: '33%',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    bigGridImage: {
        height: 100,
        width: 100,
        borderRadius: 50

    },
    bigGridLabel: {
        alignSelf: 'center',
        fontWeight: '500',
        marginTop: 10
    }


})