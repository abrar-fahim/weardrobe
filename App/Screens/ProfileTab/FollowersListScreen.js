import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';
import * as profileActions from '../../store/actions/profile'
import { useSelector, useDispatch } from 'react-redux';














function FollowersListScreen({ navigation }) {

    const dispatch = useDispatch()

    const getMyFollowers = useCallback(async () => {
        try {
            await dispatch(profileActions.getMyFollowers())
            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    })

    const myFollowers = useSelector(state => state.profile.myFollowers)


    const renderFollowers = (itemData) => {
        return (
            <View style={styles.follower}>
                <Text>{itemData.item.firstName}    {itemData.item.lastName}  </Text>

            </View>
        )

    }



    useEffect(() => {
        getMyFollowers()
    }, [])


    return (


        <View>
            <Text> Followers</Text>
            <FlatList data={myFollowers} renderItem={renderFollowers} />
        </View>
    )

}

function FollowingListScreen({ navigation }) {

    const dispatch = useDispatch()

    const getMyFollowing = useCallback(async () => {
        try {
            await dispatch(profileActions.getMyFollowing())
            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    })

    const renderFollowers = (itemData) => {
        return (
            <View style={styles.follower}>
                <Text>{itemData.item.firstName}    {itemData.item.lastName}  </Text>

            </View>
        )

    }


    const myFollowing = useSelector(state => state.profile.myFollowing)
    useEffect(() => {

        getMyFollowing()
    }, [])
    return (
        <View style={ScreenStyle}>
            <Text> Following</Text>

            <FlatList data={myFollowing} renderItem={renderFollowers} />



        </View>
    )

}


export default function FollowersListTabScreen(props) {
    const TopTab = createMaterialTopTabNavigator();



    return (
        <TopTab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: Colors.tabBarActiveTintColor
                }
            }}
        >
            <TopTab.Screen name="FollowersList" component={FollowersListScreen} />
            <TopTab.Screen name="FollowingList" component={FollowingListScreen} />

        </TopTab.Navigator>
    )
}

const styles = StyleSheet.create({
    follower: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})