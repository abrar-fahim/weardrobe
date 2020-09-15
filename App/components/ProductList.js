import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, TouchableOpacity, Dimensions } from 'react-native';



import RatingStars from './RatingStars';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Styles/Colors';

import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../store/actions/products'


export default function ProductList(props) {
    //props= navigation, data, showShopName




    const renderGridItem = useCallback((itemData) => {
        let price;



        if (itemData.item.discount > 0) {
            const oldPrice = itemData.item.price;
            const newPrice = oldPrice * (100 - itemData.item.discount) / 100;
            price = (
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5 }}>
                    <Text style={styles.oldPrice}> {"৳ " + oldPrice}</Text>
                    <Text style={styles.price}> {"৳ " + newPrice}</Text>
                </View>
            )
        }

        else {
            price = (
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5 }}>
                    <Text style={styles.price}> {"৳ " + itemData.item.price}</Text>
                </View>
            )
        }
        // console.log(itemData.item.thumbnail)
        return (
            <View style={{ ...styles.gridItem, opacity: itemData.item.inventoryQuantity > 0 ? 1 : 0.5 }}>
                <TouchableOpacity onPress={() => (
                    props.navigation.push("Product", {
                        productId: itemData.item.id,
                        inventoryQuantity: itemData.item.inventoryQuantity
                    })
                )}>
                    {/* <Text>{itemData.item.inventoryQuantity}</Text> */}

                    <Image source={itemData.item.thumbnail} style={styles.image} resizeMode="cover" resizeMethod="resize" />
                    <Text style={styles.itemName}>{itemData.item.name}</Text>
                    {props.showShopName ? <Text style={styles.sellerName}> {"From " + itemData.item.shopName} </Text> : null}


                    {itemData.item.rating !== null ?
                        <View style={styles.ratingContainer}>
                            <RatingStars rating={itemData.item.rating} />
                            <Text style={styles.ratingCount}>({itemData.item.ratingCount})</Text>
                        </View> : null
                    }



                    {price}

                </TouchableOpacity>
            </View>
        )

    }, [])

    // if (props.data.length === 0) {
    //     return (
    //         <View>
    //             <Text> no products yet!</Text>
    //         </View>
    //     )

    // }

        

    return (
        // <View style={styles.screen}>




        <FlatList
            // listKey={props.listKey}
            {...props}
            bounces={props?.bounces}
            numColumns={
                props?.horizontal ?? false ?
                    undefined : (Dimensions.get('window').width < 768 ? 2 : 4)
            }
            ListHeaderComponent={props?.ListHeaderComponent}
            data={props.data}
            renderItem={renderGridItem}

            onRefresh={props?.onRefresh}
            refreshing={props?.refreshing}
            ListEmptyComponent={(
                <View>
                    <Text> no products yet!</Text>
                </View>
            )}
        />

        // </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        height: '100%'
    },

    gridItem: {
        margin: 20,
        width: 150,
    },
    itemName: {
        fontFamily: 'PlayfairDisplay_600SemiBold',
        fontSize: 20,
    },
    sellerName: {
        fontSize: 12,
        fontWeight: '300',
        color: 'grey'
    },
    image: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    ratingCount: {
        fontSize: 10
    },
    price: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
        width: '100%',
        textAlign: 'right'


    },
    oldPrice: {
        fontSize: 15,
        color: 'black',
        fontWeight: '400',
        textDecorationLine: 'line-through',
        color: 'grey'
    }

})