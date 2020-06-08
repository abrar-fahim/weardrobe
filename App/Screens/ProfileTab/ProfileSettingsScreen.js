import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle';

import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../../store/actions/profile'


export default function ProfileSettingsScreen(props) {

    const followRequests = useSelector(state => state.profile.followRequests)

    const dispatch = useDispatch();

    




    const getFollowRequests = useCallback(async () => {
        try {
            await dispatch(profileActions.getFollowRequests())
            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    })


    const acceptFollowRequest = useCallback(async (userId) => {
        try {
            await dispatch(profileActions.acceptFollowRequest(userId))
            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    })



    const renderFollowRequest = (itemData) => {
        return (
            <View style={styles.followRequest}>
                <Text>{itemData.item.firstName}   {itemData.item.lastName}</Text>

                <Button title="accept" onPress={() => {
                    acceptFollowRequest(itemData.item.id)


                }}/>

            </View>
        )
    }

    useEffect(() => {
        getFollowRequests();
    }, [])

    return (
        <View style={ScreenStyle}>
            <Text> Profile Settings</Text>


            <FlatList
                ListHeaderComponent={() => (
                    <Text>Follow Requests</Text>
                )}
                data={followRequests}
                renderItem={renderFollowRequest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    followRequest: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100
    }
})