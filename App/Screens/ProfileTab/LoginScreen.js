import 'react-native-gesture-handler';
import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';


import SignupScreen from './SignupScreen'
import ScreenStyle from '../../Styles/ScreenStyle'
import UIButton from '../../components/UIButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as authActions from '../../store/actions/auth'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const EMAIL_INPUT = 'EMAIL_INPUT';
const PASSWORD_INPUT = 'PASSWORD_INPUT';

const formReducer = (state, action) => {

  if (action.type === EMAIL_INPUT) {

    const updatedValues = {
      ...state.inputValues,
      email: action.value
    };

    // console.log(updatedValues)



    return {
      ...state.inputValues,

      inputValues: updatedValues
    }

  }

  else if (action.type === PASSWORD_INPUT) {
    const updatedValues = {
      ...state.inputValues,
      password: action.value
    };

    console.log(updatedValues)



    return {
      ...state.inputValues,

      inputValues: updatedValues
    }

  }

  return state;
}


export default function LoginScreen({ navigation }) {

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(
    formReducer, {
    inputValues: {
      email: '',
      password: ''
    }
  }
  );

  const loginHandler = async () => {
    try {
      await dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password))
      // navigation.setParams( {
      //   prevScreen: 'login'
      // })
      navigation.goBack();

    } catch (err) {
      navigation.popToTop();
      throw new Error(err.message);
      
    }
  }

  const emailChangeHandler = useCallback((inputText) => {
    dispatchFormState({
      type: EMAIL_INPUT,
      value: inputText,
    })
  }, [dispatchFormState])

  const passwordChangeHandler = useCallback((inputText) => {
    dispatchFormState({
      type: PASSWORD_INPUT,
      value: inputText,
    })
  }, [dispatchFormState])




  return (
    <View style={{
      ...styles.container,
      ...ScreenStyle
    }}>



      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-mail" size={20} color="grey" />
        </View>

        <TextInput
          placeholder="Enter Email"
          style={styles.inputStyle}
          onChangeText={emailChangeHandler}

        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-lock" size={20} color="grey" />
        </View>
        <TextInput
          secureTextEntry={true}
          placeholder="Enter Password"
          style={styles.inputStyle}
          onChangeText={passwordChangeHandler}
        />
      </View>




      <View style={styles.buttons}>
        <UIButton text="Login" height={40} width={300} onPress={loginHandler} />
        <TouchableOpacity>

          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.forgotPassword}> Dont have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signUpText}> Create one</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200
  },
  inputContainer: {
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
  iconContainer: {
    width: 25,
    alignItems: 'center'
  },
  forgotPassword: {
    color: 'grey',
    fontWeight: '300',
    width: 150
  },
  signUpContainer: {
    marginTop: 150,
    flexDirection: 'row'
  },
  signUpText: {
    color: 'black',
    fontWeight: '300'
  }
});