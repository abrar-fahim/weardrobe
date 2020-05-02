import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux'


import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen'
import CheckoutScreen from './Screens/CheckoutScreen'
import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'


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
        <Stack.Screen name="Cart" component={CartScreen}/>
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
