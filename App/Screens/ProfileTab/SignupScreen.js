import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


export default function SignupScreen() {
    const [value, setValue] = useState(0);
  return (
    <View style={styles.container}>
      
      <View>
        <Text style={styles.formLabel}> Sign up Form </Text>
        <TextInput placeholder="Name" style={styles.inputStyle} />
        <TextInput placeholder="Phone" style={styles.inputStyle} />
        <TextInput placeholder="Birthday" style={styles.inputStyle} />
        <TextInput placeholder="Enter Email" style={styles.inputStyle} />
        <TextInput
          secureTextEntry={true}
          placeholder="Enter Password"
          style={styles.inputStyle}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Confirm Password"
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.buttons}>
        <Button title="Login"/>
        <Button title="Sign up"/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  formLabel: {
    fontSize: 20,
    color: '#fff',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 100,
    width: 200
    }
});