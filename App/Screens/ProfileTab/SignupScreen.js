import 'react-native-gesture-handler';
import React, { useEffect, useState, useDebugValue, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import ScreenStyle from '../../Styles/ScreenStyle'
import UIButton from '../../components/UIButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as authActions from '../../store/actions/auth'


export default function SignupScreen({ navigation }) {
  const [value, setValue] = useState(0);

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    birthday: '',
    password: '',
  })

  const dispatch = useDispatch()


  const signUp = useCallback(async () => {
    try {
      if (passwordsMatch) {
        await dispatch(authActions.signup(inputs))
        navigation.navigate('Shop')
      }

    }
    catch (err) {
      console.log(err)
    }
  })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  //  console.log(inputs)
  return (
    <View style={{
      ...styles.container,
      ...ScreenStyle
    }}>

      <Text style={styles.title}> Sign up</Text>



      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={20} color="grey" />
        </View>
        <TextInput placeholder="First Name" style={styles.inputStyle} onChangeText={(text) => setInputs((state) => ({ ...state, firstName: text }))} />

      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={20} color="grey" />
        </View>
        <TextInput placeholder="Last Name" style={styles.inputStyle} onChangeText={(text) => setInputs((state) => ({ ...state, lastName: text }))} />

      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-mail" size={20} color="grey" />
        </View>
        <TextInput
          secureTextEntry={false}
          placeholder="Email"
          style={styles.inputStyle}
          onChangeText={(text) => setInputs((state) => ({ ...state, email: text }))}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-mail" size={20} color="grey" />
        </View>
        <TextInput
          secureTextEntry={false}
          placeholder="User Name"
          style={styles.inputStyle}
          onChangeText={(text) => setInputs((state) => ({ ...state, username: text }))}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="phone" size={20} color="grey" />
        </View>
        <TextInput
          secureTextEntry={false}
          placeholder="Phone"
          style={styles.inputStyle}
          keyboardType="decimal-pad"
          onChangeText={(text) => setInputs((state) => ({ ...state, phone: text }))}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="cake" size={20} color="grey" />
        </View>
        <TextInput
          secureTextEntry={false}
          placeholder="Birthday"
          style={styles.inputStyle}
          onChangeText={(text) => setInputs((state) => ({ ...state, birthday: text }))}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-lock" size={20} color="grey" />
        </View>
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          style={styles.inputStyle}
          onChangeText={(text) => setInputs((state) => ({ ...state, password: text }))}
        />


      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-lock" size={20} color="rey" />
        </View>
        <TextInput
          secureTextEntry={true}
          placeholder="Confirm Password"
          style={styles.inputStyle}
          onChangeText={(text) => {
            //console.log(text)
            if (inputs.password !== text) {

              console.log(inputs)
              setPasswordsMatch(false);
            }
            else {

              setPasswordsMatch(true)
            }
          }}

        />
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{passwordsMatch ? null : "Passwords don't match"}</Text>
        </View>

      </View>







      <View style={styles.buttons}>
        <UIButton text="Create Account" height={40} width={300} onPress={signUp} />


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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },

  inputStyle: {
    flex: 1,
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
    fontWeight: '300'
  },
  signUpContainer: {
    marginTop: 150,
    flexDirection: 'row'
  },
  signUpText: {
    color: 'black',
    fontWeight: '300'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 25
  },
  error: {
    color: 'red',
    fontSize: 12
  },
  errorContainer: {

  }
});