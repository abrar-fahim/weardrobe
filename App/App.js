import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux'


import HomeScreen from './Screens/MainTabScreen';
import CartScreen from './Screens/ShopTab/CartScreen'
import CheckoutScreen from './Screens/ShopTab/CheckoutScreen'
import LoginScreen from './Screens/ProfileTab/LoginScreen'
import SignupScreen from './Screens/ProfileTab/SignupScreen'


import { navigationRef, isMountedRef } from './RootNavigation'
import * as RootNavigation from './RootNavigation'

import * as Font from 'expo-font';
import { AppLoading } from 'expo'




const fetchFonts = () =>  {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')

  })
}

const Stack = createStackNavigator();

export default function App({ navigation }) {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true) }
      />
    )
  }

  //return <HomeNavigator />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {HomeScreen} 
        options={{
          title: "Fash-App",
          headerShown: false
        }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
