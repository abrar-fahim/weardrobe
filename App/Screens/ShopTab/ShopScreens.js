import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
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
import {PRODUCTS} from '../../dummy-data/Products'

import CheckoutScreen from  './CheckoutScreen'
import CartScreen from './CartScreen';
import DealsStack from './DealsScreens'
import CategoriesStack from './CategoriesScreens'
import ShopDrawer from './ShopDrawer'

import SearchOverlay from '../../components/SearchOverlay'

import DrawerButton from '../../components/DrawerButton'
import ShopRightButtons from '../../components/ShopRightButtons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GroupShopRightButtons from '../../components/GroupShopRightButtons';




function ShopScreen({navigation}) {


    const renderGridItem = (itemData) => {
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={ () => (navigation.navigate("Product", {
                     productId: itemData.item.id,

                }))}>
                    
                    <Image source={itemData.item.picture} style={{height: 120, width: 120, justifyContent: 'center', alignItems: 'center'}}/>
                    <Text> {itemData.item.name}</Text>
                    <Text> {itemData.item.price + "/-"}</Text>
                    <Text> {"From " + itemData.item.shopname} </Text>
                </TouchableOpacity>
            </View>
        )

    }

    const [visible, setVisible] = useState(false);

    const  toggleOverlay = () => {
        setVisible(!visible);
    }

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => {
    //             return(
    //                 <DrawerButton navigation={navigation}/>
    //             )
    //         }
    //     })
    // })
    
    return (
        <View>

        <SearchOverlay isVisible={visible} toggleOverlay={toggleOverlay}/>
        
        <Text> Shop Screen</Text>

        <FlatList data={PRODUCTS} renderItem={renderGridItem} numColumns={2}  />



                    
            
        </View>
    );

}



export default function ShopStack(props) {
    const ShopStack = createStackNavigator();
    
    return (
    
        <ShopStack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <ShopStack.Screen 
                name="ShopScreen" 
                component={ShopScreen} 
                options = {
                ({navigation, route}) => ({
                    headerLeft: () => (
                        <DrawerButton navigation={navigation}/>
                    ),
                    headerRight: () => (
                        <ShopRightButtons navigation={navigation}/>
                    )
                        
                
            
                })
            }

          />

        </ShopStack.Navigator>

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
    }
})