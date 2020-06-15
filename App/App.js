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
  popup: popupReducer
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
  //   )
  // }
  //return <HomeNavigator />;



  const notification = async () => {

    const token = await Notifications.getExpoPushTokenAsync();

    console.log(token)

    try {

      const response = await fetch('https://exp.host/--/api/v2/push/send', {

        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'accept-encoding': 'gzip, deflate',
          'host': 'exp.host'
        },
        body: JSON.stringify({
          to: token,
          title: 'New Notification',
          body: 'The notification worked!',
          priority: "high",
          sound: "default",
          channelId: "default",
        }),
      })

      const resData = await response.json();

      console.log(resData)

    }

    catch (err) {
      console.log(err)
    }




  }

  useEffect(() => {
    notification()


  }, [])



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

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
