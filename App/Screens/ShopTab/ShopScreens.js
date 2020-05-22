import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, ScrollView, Dimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import {HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'

import { SHOPS } from '../../dummy-data/Sellers'
import PRODUCTS from '../../dummy-data/Products'

import CheckoutScreen from  './CheckoutScreen'
import CartScreen from './CartScreen';
import DealsStack from './DealsScreens'
import CategoriesStack from './CategoriesScreens'

import SearchOverlay from '../../components/SearchOverlay'

import DrawerButton from '../../components/DrawerButton'
import ShopRightButtons from '../../components/ShopRightButtons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GroupShopRightButtons from '../../components/GroupShopRightButtons';
import DrawerStack from './DrawerStack';
import ProductList from '../../components/ProductList';
import ScreenStyle from '../../Styles/ScreenStyle'
import Colors from '../../Styles/Colors';

const BANNERS = [
    {
        id: '1',
        picture: require('../../assets/Images/eidSale.jpg')
    },
    {
        id: '2',
        picture: require('../../assets/Images/eidSale.jpg')
    },
    {
        id: '3',
        picture: require('../../assets/Images/eidSale.jpg')
    },
    {
        id: '4',
        picture: require('../../assets/Images/eidSale.jpg')
    },
    {
        id: '5',
        picture: require('../../assets/Images/eidSale.jpg')
    }
]

const FEATURED= [
    {
        id: '1',
        picture: require('../../assets/Images/featured1.jpg')
    },
    {
        id: '2',
        picture: require('../../assets/Images/featured2.jpg')
    },
    {
        id: '3',
        picture: require('../../assets/Images/featured1.jpg')
    }
]



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





function ShopScreen({navigation}) {


    // const [visible, setVisible] = useState(false);

    // const  toggleOverlay = () => {
    //     setVisible(!visible);
    // }

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => {
    //             return(
    //                 <DrawerButton navigation={navigation}/>
    //             )
    //         }
    //     })
    // })

  
    

    function renderShopItems(itemData) {
        if(itemData.item.type === 'grid') {
            return (
                <View style={styles.productGridContainer}>
                    <Text style={styles.productGridTitle}> Trending now</Text>
                    <View style={styles.productGridRow}>
                        <TouchableOpacity onPress={ () => (navigation.navigate("Product", {
                        productId: itemData.item.data[0].id,
                        }))}>
                            <Image source={itemData.item.data[0].picture} style={styles.productGridImage}/>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={ () => (navigation.navigate("Product", {
                        productId: itemData.item.data[0].id,
                        }))}>
                            <Image source={itemData.item.data[0].picture} style={styles.productGridImage}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.productGridRow}>
                    <TouchableOpacity onPress={ () => (navigation.navigate("Product", {
                        productId: itemData.item.data[0].id,
                        }))}>
                            <Image source={itemData.item.data[0].picture} style={styles.productGridImage}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => (navigation.navigate("Product", {
                        productId: itemData.item.data[0].id,
                        }))}>
                            <Image source={itemData.item.data[0].picture} style={styles.productGridImage}/>
                        </TouchableOpacity>

                    </View>

                </View>
            )
        }

        if(itemData.item.type === 'banner') {
 
            return (
                <TouchableOpacity onPress={() => (navigation.navigate('ProductList'))}>
                    <View style={styles.featuredTile}>
                        <Image source={itemData.item.data.picture} style={styles.featuredImage}/>
                    </View>
                </TouchableOpacity>
                
            )

        }
    }

    function renderTopScroller(itemData) {
        return (
            <TouchableOpacity onPress={() => (navigation.navigate('ProductList'))}>
                <View>
                    <Image style={styles.scrollerImage} source={itemData.item.picture}/>
                </View>
            </TouchableOpacity>
        )
    }

    const ListHeader = (
       <FlatList style={styles.scoller} data={TOPSCROLLER} horizontal={true} pagingEnabled={true} renderItem={renderTopScroller}/>
    )
    return (
        <View style={ScreenStyle}>

           <FlatList 
            ListHeaderComponent={ListHeader}
            data={SHOP} renderItem={renderShopItems}/>
        </View>
    );

}



export default function ShopStack(props) {
    return (
        <DrawerStack name="Shop" navigation={props.navigation} component={ShopScreen} title="Shop"/>
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
    featuredTile: {
        height: 200,
        width: '100%',
    },
    featuredImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    }
   
})