import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';
import * as profileActions from '../../store/actions/profile'
import { useSelector, useDispatch } from 'react-redux';




function FollowersListScreen(props) {

    const myProfile = props.route.params?.myProfile;
    const profileId = props.route.params?.profileId;


    const followers = myProfile ? useSelector(state => state.profile.myFollowers) : useSelector(state => state.profile.followers)


    const dispatch = useDispatch()

    const getFollowers = useCallback(async () => {
        try {
            myProfile ? await dispatch(profileActions.getMyFollowers()) : await dispatch(profileActions.getUserFollowers(profileId))
            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    })




    const renderFollowers = (itemData) => {
        return (
            <TouchableOpacity style={styles.user} onPress={() => props.navigation.push('OthersProfile', {
                profileId: itemData.item.id
            })}>
                <Image source={itemData.item.profilePic} style={styles.dp} />
                <View style={styles.name}>
                    <Text>{itemData.item.firstName}    {itemData.item.lastName}</Text>
                    <Text>{itemData.item.username}</Text>
                </View>



            </TouchableOpacity>
        )

    }



    useEffect(() => {
        getFollowers()
    }, [])


    return (


        <View style={styles.screen}>

            <FlatList data={followers} renderItem={renderFollowers} />
        </View>
    )

}

function FollowingListScreen(props) {
    const myProfile = props.route.params?.myProfile;
    const profileId = props.route.params?.profileId;


    const following = myProfile ? useSelector(state => state.profile.myFollowing) : useSelector(state => state.profile.following)

    const dispatch = useDispatch()





    const getFollowing = useCallback(async () => {
        try {
            myProfile ? await dispatch(profileActions.getMyFollowing()) : await dispatch(profileActions.getUserFollowing(profileId))
            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    })

    const renderFollowers = (itemData) => {
        return (
            <TouchableOpacity style={styles.user} onPress={() => props.navigation.push('OthersProfile', {
                profileId: itemData.item.id
            })}>
                <Image source={itemData.item.profilePic} style={styles.dp} />
                <View style={styles.name}>
                    <Text>{itemData.item.firstName}    {itemData.item.lastName}</Text>
                    <Text>{itemData.item.username}</Text>
                </View>



            </TouchableOpacity>
        )

    }



    useEffect(() => {
        getFollowing()
    }, [])
    return (
        <View style={styles.screen}>


            <FlatList data={following} renderItem={renderFollowers} />



        </View>
    )

}


export default function FollowersListTabScreen(props) {
    const myProfile = props.route.params?.myProfile;
    const profileId = props.route.params?.profileId;

    const TopTab = createMaterialTopTabNavigator();




    return (
        <TopTab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: Colors.tabBarActiveTintColor
                }
            }}
        >
            <TopTab.Screen name="FollowersList" component={FollowersListScreen} initialParams={{
                myProfile: myProfile,
                profileId: profileId

            }} />
            <TopTab.Screen name="FollowingList" component={FollowingListScreen} initialParams={{
                myProfile: myProfile,
                profileId: profileId
            }} />

        </TopTab.Navigator>
    )
}

const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    user: {
        flexDirection: 'row',

        height: 90,

    },
    dp: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 20
    },
    names: {
        flexDirection: 'column',
    }
})