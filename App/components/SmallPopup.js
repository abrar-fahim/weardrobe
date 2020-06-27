import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as popupActions from '../store/actions/Popup'

const SmallPopup = (props) => {
    //props = message, setMessage
    const dispatch = useDispatch()

    const message = useSelector(state => state.popup.message);
    const isError = useSelector(state => state.popup.isError);


    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(popupActions.setMessage('', false))
        }, 2000)

        return () => clearTimeout(timer)
    }, [message])
    return (
        <Modal
            animationIn="bounceInDown"
            animationInTiming={300}
            animationOutTiming={300}
            animationOut="bounceOutUp"
            hasBackdrop={false}
            coverScreen={false}
            isVisible={message === "" ? false : true}
        // isVisible={true}
        >
            <View style={styles.popup}>
                <Text>{message}</Text>
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
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 2
        },
        marginTop: 20,
        zIndex: 10000

    }
})

export default SmallPopup