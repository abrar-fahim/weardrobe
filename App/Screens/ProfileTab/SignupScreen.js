import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import ScreenStyle from '../../Styles/ScreenStyle'
import UIButton from '../../components/UIButton';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function SignupScreen({navigation}) {
    const [value, setValue] = useState(0);
  return (
    <View style={{
        ...styles.container,
        ...ScreenStyle
      }}>

        <Text style={styles.title}> Sign up</Text>
      
     
       
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={20} color="grey"/>
        </View>
        
        <TextInput placeholder="Name" style={styles.inputStyle} />
      </View>
        
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-mail" size={20} color="grey"/>
        </View>
        <TextInput
          secureTextEntry={true}
          placeholder="Email"
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="phone" size={20} color="grey"/>
        </View>
        <TextInput
          secureTextEntry={true}
          placeholder="Phone"
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="cake" size={20} color="grey"/>
        </View>
        <TextInput
          secureTextEntry={false}
          placeholder="Birthday"
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-lock" size={20} color="grey"/>
        </View>
        <TextInput
          secureTextEntry={false}
          placeholder="Password"
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-lock" size={20} color="grey"/>
        </View>
        <TextInput
          secureTextEntry={false}
          placeholder="Confirm Password"
          style={styles.inputStyle}
        />
      </View>


      
     

      

      <View style={styles.buttons}>
        <UIButton text="Create Account" height={40} width={300} />
       
  
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
    
  },
  inputContainer : {
    flexDirection: 'row', 
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },

  inputStyle: {
    width: 300,
    height: 40,
    paddingHorizontal: 10,

  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    width: "100%",
    height: 65,
   },
  iconContainer : {
    width: 25,
    alignItems: 'center'
  },
 forgotPassword: {
   color: 'grey',
   fontWeight: '300'
 },
 signUpContainer : {
   marginTop: 150,
   flexDirection: 'row'
 },
 signUpText : {
    color: 'black',
    fontWeight: '300'
 },
 title: {
   fontSize: 30,
   fontWeight: '700',
   alignSelf: 'flex-start',
   marginBottom: 25
 }
});