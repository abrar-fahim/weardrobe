import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../Styles/Colors';

export default function UICircle(props) {
    if (props.active) {
        return (
            <>
                <View style={styles.activeCircle} />
                <View style={styles.backgroundCircle}>



                </View>
            </>

        )
    }

    else {
        return <View style={styles.circle} />
    }

}

const styles = StyleSheet.create({
    circle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'grey',
        opacity: 0.3
    },
    backgroundCircle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(128,128,128, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        position: 'absolute',
        left: -9

    },
    activeCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: Colors.primaryColor,
        zIndex: 1
    },
})