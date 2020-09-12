import 'react-native-gesture-handler';
import React, { useEffect, useState, useDebugValue, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import ScreenStyle from '../../Styles/ScreenStyle'
import UIButton from '../../components/UIButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import * as authActions from '../../store/actions/auth'
import Colors from '../../Styles/Colors';


export default function SignupScreen({ navigation }) {
  const [touched, setTouched] = useState(false);

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    birthday: {
      dd: '',
      mm: '',
      yyyy: ''
    },
    password: '',
    confirmPassword: ''
  })

  // const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    //validation checks run every time inputs changes and if form is touched

    if (touched) {
      if (Object.values(inputs).some(field =>
        field === '' || field?.dd === '' || field?.mm === '' || field?.yyyy === ''

      )) {
        setError('Fill up all fields')
      }
      else if (inputs.password !== inputs.confirmPassword) {
        setError("Passwords don't match")
      }

      else {
        setError('')
      }



      // if (!passwordsMatch) {
      //   setError('Passwords dont match');
      // }
    }


  }, [inputs, touched])


  const signUp = useCallback(async () => {
    try {
      if (!Object.values(inputs).some(field => field === '')) {
        //all fields filled
        if (inputs.confirmPassword === inputs.password) {
          const processedInputs = {
            ...inputs,
            birthday: `${inputs.birthday.yyyy}-${inputs.birthday.mm}-${inputs.birthday.dd}`
          };

          // console.log(passwordsMatch)
          await dispatch(authActions.signup(processedInputs))
          navigation.navigate('Shop')
        }
      }
      else {
        setError('Fill up all fields')
      }

    }
    catch (err) {
      if (err.message.startsWith('Incorrect date value')) {
        setError('Invalid Birthday')
      }
    }
  }, [inputs])

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState('');
  //  console.log(inputs)
  const CustomView = Platform.OS === "ios" ? KeyboardAvoidingView : View;
  return (
    <CustomView
      behavior="padding"
      keyboardVerticalOffset={64}
      style={{
        ...styles.container,
        ...ScreenStyle
      }}
    >

      <Text style={styles.title}> Sign up</Text>



      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={20} color="grey" />
        </View>
        <TextInput placeholder="First Name" style={styles.inputStyle}
          onChangeText={(text) => {
            if (!touched) setTouched(true)
            setInputs((state) => ({ ...state, firstName: text }))
          }}
        />

      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={20} color="grey" />
        </View>
        <TextInput placeholder="Last Name" style={styles.inputStyle} onChangeText={(text) => {
          if (!touched) setTouched(true)
          setInputs((state) => ({ ...state, lastName: text }))
        }} />

      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-mail" size={20} color="grey" />
        </View>
        <TextInput
          secureTextEntry={false}
          placeholder="Email"
          style={styles.inputStyle}
          onChangeText={(text) => {
            if (!touched) setTouched(true)
            setInputs((state) => ({ ...state, email: text }))
          }
          }
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
          onChangeText={(text) => {
            if (!touched) setTouched(true)
            setInputs((state) => ({ ...state, username: text }))
          }}
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
          onChangeText={(text) => {
            if (!touched) setTouched(true)
            setInputs((state) => ({ ...state, phone: text }))
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="cake" size={20} color="grey" />
        </View>
        {/* <Button title="pickdate" onPress={() => { setShowDatePicker(true) }} /> */}
        {/* {showDatePicker ?
          <DateTimePicker

            onChange={(event, date) => {
              setInputs((state) => ({ ...state, birthday: date }))
              console.log(event)

              if (event.type == 'set' || event.type == 'dismissed') {
                console.log('jhere')
                setShowDatePicker(false)
              }

              console.log(showDatePicker)


            }}
            value={Date.now()}
          /> : null
        } */}


        <TextInput
          secureTextEntry={false}
          placeholder="dd"
          keyboardType="decimal-pad"
          maxLength={2}
          style={styles.inputStyle}
          onChangeText={(text) => {
            if (!touched) setTouched(true)
            setInputs((state) => ({
              ...state, birthday: {
                ...state.birthday,
                dd: text
              }
            }))
          }
          }
        />

        <TextInput
          maxLength={2}
          secureTextEntry={false}
          placeholder="mm"
          keyboardType="decimal-pad"
          style={styles.inputStyle}
          onChangeText={(text) => {
            if (!touched) setTouched(true)
            setInputs((state) => ({
              ...state, birthday: {
                ...state.birthday,
                mm: text
              }
            }))
          }
          }
        />

        <TextInput
          maxLength={4}
          keyboardType="decimal-pad"
          secureTextEntry={false}
          placeholder="yyyy"
          style={styles.inputStyle}
          onChangeText={(text) => {
            if (!touched) setTouched(true)
            setInputs((state) => ({
              ...state, birthday: {
                ...state.birthday,
                yyyy: text
              }
            }))
          }
          }
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
          onChangeText={(text) => {
            if (!touched) setTouched(true)
            setInputs((state) => ({ ...state, password: text }))
          }}
        />


      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="md-lock" size={20} color="black" />
        </View>
        <TextInput
          secureTextEntry={true}
          placeholder="Confirm Password"
          style={styles.inputStyle}
          onChangeText={(text) => {
            //console.log(text)
            if (!touched) setTouched(true)
            setInputs((state) => ({ ...state, confirmPassword: text }))
            // if (inputs.password !== text) {

            //   console.log(inputs)
            //   setPasswordsMatch(false);
            // }
            // else {

            //   setPasswordsMatch(true)
            // }
          }}

        />
        {/* <View style={styles.errorContainer}> */}
        {/* <Text style={styles.error}>{inputs.password == ? null : "Passwords don't match"}</Text> */}
        {/* </View> */}

      </View>

      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>


      </View>




      <TouchableOpacity onPress={signUp} style={styles.button}>
        <Text style={styles.buttonText}>
          Create Account
          </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.textButton} onPress={() => navigation.popToTop()}>
        <Text style={styles.secondaryButtonText}>Cancel</Text>

      </TouchableOpacity>











    </CustomView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20

  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 25,
    width: Dimensions.get('window').width * 0.8,
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width * 0.8,
    maxWidth: 400,
  },

  inputStyle: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,

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

  error: {
    color: 'red',
    fontSize: 12
  },
  errorContainer: {
    flexDirection: 'column',


  },

  button: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: "100%",
    height: 40,
    width: 300

  },

  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
  },
  textButton: {
    marginTop: 20

  },
  secondaryButtonText: {
    color: 'red',
    fontWeight: '400',
    fontSize: 16,
  }
});