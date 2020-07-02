import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux'
import ReduxThunk from 'redux-thunk'


import HomeScreen from './Screens/MainTabScreen';
import CartScreen from './Screens/ShopTab/CartScreen'
import CheckoutScreen from './Screens/ShopTab/CheckoutScreen'
import LoginScreen from './Screens/ProfileTab/LoginScreen'
import SignupScreen from './Screens/ProfileTab/SignupScreen'

import * as Font from 'expo-font';
import { AppLoading, Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import productsReducer from './store/reducers/products';

import authReducer from './store/reducers/auth'
import cartReducer from './store/reducers/cart'
import wishlistReducer from './store/reducers/wishlist'
import shopsReducer from './store/reducers/shops'
import profileReducer from './store/reducers/profile';
import magazineReducer from './store/reducers/magazine';
import socialReducer from './store/reducers/chats';
import searchReducer from './store/reducers/search';
import popupReducer from './store/reducers/Popup';
import orderReducer from './store/reducers/order';
import ProductScreen from './Screens/ShopTab/ProductScreen';
import NewPostChooseLayout from './Screens/MagazineTab/NewPostChooseLayoutScreen';
import NewPostScreen2 from './Screens/MagazineTab/NewPostScreen2';
import NewPostScreen3 from './Screens/MagazineTab/NewPostScreen3';
import NewPostTagScreen from './Screens/MagazineTab/NewPostTagScreen';
import ShareGroupScreen from './Screens/ShopTab/ShareGroupScreen';


import NewPostNextButton from './components/NewPostNextButton';
import SmallPopup from './components/SmallPopup';
import TestScreen from './Screens/ShopTab/TestScreen';
import PayScreen from './Screens/ShopTab/PayScreen';
import ShippingScreen from './Screens/ShopTab/ShippingScreen';
import ConfirmOrderScreen from './Screens/ShopTab/ConfirmOrderScreen';


const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  shops: shopsReducer,
  profile: profileReducer,
  magazine: magazineReducer,
  social: socialReducer,
  search: searchReducer,
  popup: popupReducer,
  order: orderReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))



// const fetchFonts = () =>  {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')

//   })
// }

const Stack = createStackNavigator();

export default function App({ navigation }) {

  // const [fontLoaded, setFontLoaded] = useState(false);

  // if(!fontLoaded) {
  //   return (
  //     <AppLoading 
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true) }
  //     />
  //   
  // }
  //return <HomeNavigator />;









  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}
            options={{
              title: "Fash-App",
              headerShown: false
            }}
          />

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="NewPostChooseLayout" component={NewPostChooseLayout} options={{

          }} />
          <Stack.Screen name="NewPost2" component={NewPostScreen2} />
          <Stack.Screen name="NewPost3" component={NewPostScreen3} />
          <Stack.Screen name="NewPostTag" component={NewPostTagScreen} />
          <Stack.Screen name="ShareGroup" component={ShareGroupScreen} options={{
            title: "Select Groups"
          }} />
          <Stack.Screen name="Payment" component={PayScreen} />
          <Stack.Screen name="Shipping" component={ShippingScreen} />
          <Stack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
  );
}
