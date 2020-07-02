import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import ScreenStyle from '../../Styles/ScreenStyle'
import Colors from '../../Styles/Colors';

export default function PayScreen(props) {
    return (
        <View style={styles.screen}>
            <Text>Payment screen</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    props.navigation.navigate('ConfirmOrder')
                }}
            >
                <Text style={styles.buttonText}>Continue to Confirmation</Text>

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        justifyContent: 'center',
        alignItems: 'center'

    },
    button: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        height: 50,
        width: '80%',
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        elevation: 2
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
        width: '100%',
        textAlign: 'center'
    }
})