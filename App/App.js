import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen'

import { navigationRef, isMountedRef } from './RootNavigation'
import * as RootNavigation from './RootNavigation'


const Stack = createStackNavigator();

export default function App({ navigation }) {

  //this useEffect is to check whether root navigator has mounted, so that app doesnt crash in case it isnt mounted
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, [])


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {HomeScreen} 
        options={{
          title: "Fash-App",
          headerShown: false
          
        }}
        />
        <Stack.Screen name="Cart" component={CartScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
