import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'

import { SHOPS } from '../../dummy-data/Sellers'

import CheckoutScreen from './CheckoutScreen'
import CartScreen from './CartScreen';
import DealsStack from './DealsScreens'
import CategoriesStack, { CategoriesScreen } from './CategoriesScreens'
import ShopDrawer from './ShopDrawer'
import ShopStack from './ShopScreens'
import SearchScreen from './SearchScreen'
import ShopSearchScreen from './ShopSearchScreen'

import DrawerButton from '../../components/DrawerButton'
import FavoritesScreen from './FavoritesScreen';
import ProductScreen from './ProductScreen';
import GroupShoppingScreen from './GroupShoppingScreen'
import ShopRightButtons from '../../components/ShopRightButtons';
import SellerScreen from './SellerScreen';
import HeaderOptions from '../../Styles/HeaderOptions';
import GenericHeaderButton from '../../components/GenericHeaderButton'
import ProductListScreen from './ProductListScreen';

import OrderScreen from './OrderScreen'
import SellerInfoScreen from './SellerInfoScreen';
import TestScreen from './TestScreen'
import { CategoriesSearchScreen } from './CategoriesSearchScreen';
import PictureUploadScreen from '../SocialTab/PictureUploadScreen'
import PostScreen from '../MagazineTab/PostScreen';
import PayScreen from './PayScreen';
import ShippingScreen from './ShippingScreen';
import ConfirmOrderScreen from './ConfirmOrderScreen';
import { ParentCategoriesScreen } from './ParentCategoryListScreen';

export default function ShopStackScreen({ navigation }) {
    const ShopStack = createStackNavigator();
    const CustomView = Platform.OS === "ios" ? KeyboardAvoidingView : View;


    return (
        <CustomView
            style={{ flex: 1 }}
            behavior="padding"
        >
            <ShopStack.Navigator

                screenOptions={HeaderOptions}

            >
                <ShopStack.Screen name="ShopDrawer" component={ShopDrawer}
                    options={{
                        headerShown: false
                    }}
                />
                <ShopStack.Screen name="Checkout" component={CheckoutScreen} />
                <ShopStack.Screen name="Cart" component={CartScreen} />
                <ShopStack.Screen name="Search" component={SearchScreen}
                    options={{
                        headerShown: false,
                        headerTitle: 'asdasd',
                        animationEnabled: false

                    }}
                />
                <ShopStack.Screen name="ShopSearch" component={ShopSearchScreen}
                    options={{
                        headerShown: false,
                        headerTitle: 'asdasd',
                        animationEnabled: false

                    }}
                />

                <ShopStack.Screen name="CategorySearch" component={CategoriesSearchScreen}
                    options={{
                        headerShown: false,
                        headerTitle: 'asdasd',
                        animationEnabled: false

                    }}
                />
                <ShopStack.Screen name="Favorites" component={FavoritesScreen} />
                {/* <ShopStack.Screen name="Product" component={ProductScreen}/> */}
                <ShopStack.Screen name="GroupShopping" component={GroupShoppingScreen} />
                <ShopStack.Screen name="Seller" component={SellerScreen} />
                <ShopStack.Screen name="Post" component={PostScreen} />


                <ShopStack.Screen name="ProductList" component={ProductListScreen} />
                <ShopStack.Screen name="Order" component={OrderScreen} />
                <ShopStack.Screen name="SellerInfo" component={SellerInfoScreen} />
                <ShopStack.Screen name="Categories" component={CategoriesScreen} />
                {/* <ShopStack.Screen name="Payment" component={PayScreen} />
            <ShopStack.Screen name="Shipping" component={ShippingScreen} />
            <ShopStack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} /> */}
                <ShopStack.Screen name="PictureUpload" component={PictureUploadScreen} />

                <ShopStack.Screen name="ParentCategories" component={ParentCategoriesScreen}
                    options={{
                        title: 'Categories'
                    }}
                />

            </ShopStack.Navigator>
        </CustomView>
    )
}

