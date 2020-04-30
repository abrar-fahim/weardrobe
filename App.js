import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './Screens/HomeScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {HomeScreen} 
        options={{
          title: "Fash-App",
          headerRight: () => (
            <Button onPress={ () => alert('Go to chat and group screen')} title="Chat" color="#000"/>
          )
        }}
          
        />
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
