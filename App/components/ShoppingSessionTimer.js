import React, { useEffect, useState, useLayoutEffect, useCallback, useDebugValue } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Colors from '../Styles/Colors';





const ShoppingSessionTimer = (props) => {

    const activeSessionId = useSelector(state => state.social.activeSessionId);
    const sessionGroupId = useSelector(state => state.social.sessionGroupId);

    const timeLeft = useSelector(state => state.social.timeLeft);

    const sec = Math.floor(timeLeft / 1000);
    const displaySec = sec % 60;
    const min = sec / 60;
    const displayMin = Math.floor(min % 60);
    const hours = Math.floor(min / 60);

    return (
        <>
            {activeSessionId !== null ?
                <View style={styles.groupShopBanner}>
                    <Text>Time Remaining: {hours}: {displayMin}: {displaySec}</Text>


                </View> : null
            }
        </>

    )

}





const styles = StyleSheet.create({
    groupShopBanner: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.anotherColor,
        justifyContent: 'center',
        padding: 10
    }
})

export default ShoppingSessionTimer;
