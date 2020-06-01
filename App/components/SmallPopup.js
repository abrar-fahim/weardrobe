import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native';
import Modal from 'react-native-modal';

const SmallPopup = (props) => {
    //props = isVisible, text, 
    return (
        <Modal
            animationIn="bounceInDown"
            animationInTiming={300}
            animationOutTiming={300}
            animationOut="bounceOutUp"
            hasBackdrop={false}
            coverScreen={false}
            isVisible={props.isVisible}
            onShow={window.setTimeout(() => (props.setIsVisible(false)), 2500)}


        >
            <View style={styles.popup}>
                <Text>{props.text}</Text>
            </View>


        </Modal>
    )
}

const styles = StyleSheet.create({
    popup: {
        height: 50,
        width: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        top: 0,
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 2
        }

    }
})

export default SmallPopup