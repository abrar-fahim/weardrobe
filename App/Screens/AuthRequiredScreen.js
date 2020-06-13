import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, TouchableOpacity } from 'react-native';
import Colors from '../Styles/Colors';



export default function AuthRequiredScreen(props) {


    return (
        <View style={styles.centered}>

            <TouchableOpacity onPress={() => (props.navigation.navigate('Login'))} >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Login/Signup</Text>
                </View>
            </TouchableOpacity>



            {/* <Button title="login/signup" onPress={() => (props.navigation.navigate('Login'))} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 100
    },
    button: {
        backgroundColor: Colors.primaryColor,
        height: 40,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.5,
        elevation: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        width: '100%',
        textAlign: 'center'
        
    }
})
