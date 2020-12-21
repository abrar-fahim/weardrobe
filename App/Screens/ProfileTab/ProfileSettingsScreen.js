import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useRef, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle';

import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../../store/actions/profile'
import LoadingScreen from '../../components/LoadingScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ProfileSettingsScreen(props) {

    const profileId = props.route.params?.profileId;

    const followRequests = useSelector(state => state.profile.followRequests);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [params, setParams] = useState(null);

    // firstName: "",
    // lastName: "",
    // email: "",
    // phoneNumber: "",
    // birthday: "",
    // profilePic: "",
    // bio: "",
    // privacyType: "",
    // points: "",
    // type: ""

    const dispatch = useDispatch();

    const getProfile = useCallback(async () => {

        try {

            setLoading(true)

            const gotProfile = await profileActions.getProfileDirect(profileId);

            setProfile(gotProfile);

            setLoading(false)

            console.log(gotProfile)




        }
        catch (err) {

            console.log(err);
        }
    }, [profileId])






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

    const updateProfile = useCallback(async () => {
        try {

            await dispatch(profileActions.updateProfile(params))
            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    }, [params])

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {

                    updateProfile();
                    props.navigation.goBack();

                }}
                    style={styles.doneButton}
                >
                    <Text>Done</Text>
                </TouchableOpacity>
            )
        })
    })



    const renderFollowRequest = (itemData) => {
        if (itemData.index === 0) {
            return (

                <View style={ScreenStyle}>
                    <Text> Profile Settings</Text>

                    <View style={styles.dpContainer}>


                        <Image source={profile.profilePic} style={styles.dp} />

                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('DpUpload')
                        }}>
                            <Text>Change Profile Picture</Text>
                        </TouchableOpacity>
                    </View>

                    <Text>Basic Settings</Text>

                    <View style={styles.setting}>
                        <Text> First Name: </Text>
                        <TextInput
                            defaultValue={profile.firstName}
                            style={styles.settingInput}
                            onChangeText={(text) => {

                                setParams(state => ({
                                    ...state,
                                    firstName: text
                                }))

                            }}
                        />

                    </View>

                    <View style={styles.setting}>
                        <Text> Last Name: </Text>
                        <TextInput
                            defaultValue={profile.lastName}
                            style={styles.settingInput}
                            onChangeText={(text) => {
                                setParams(state => ({
                                    ...state,
                                    lastName: text
                                }))
                            }}
                        />

                    </View>

                    <View style={styles.setting}>
                        <Text> bio: </Text>
                        <TextInput
                            defaultValue={profile.bio}
                            style={styles.settingInput}
                            onChangeText={(text) => {
                                setParams(state => ({
                                    ...state,
                                    bio: text
                                }))
                            }}
                        />

                    </View>

                    <Text>Profile Information</Text>

                    <View style={styles.setting}>
                        <Text> username: </Text>
                        <Text>{profile.username}</Text>

                    </View>


                    <View style={styles.setting}>
                        <Text> email: </Text>
                        <TextInput
                            onChangeText={(text) => {
                                setParams(state => ({
                                    ...state,
                                    email: text
                                }))
                            }}
                            defaultValue={profile.email}
                            style={styles.settingInput}

                        />

                    </View>

                    <View style={styles.setting}>
                        <Text> phone: </Text>
                        <TextInput
                            defaultValue={profile.phoneNumber}
                            style={styles.settingInput}
                            onChangeText={(text) => {
                                setParams(state => ({
                                    ...state,
                                    phoneNumber: text
                                }))
                            }}
                        />

                    </View>

                    <View style={styles.setting}>
                        <Text> birthday: </Text>
                        <TextInput defaultValue={profile.birthday} style={styles.settingInput} />

                    </View>




                    <View style={styles.setting}>
                        <Text> privacy type: </Text>

                        <Text> {profile.privacyType} </Text>
                    </View>

                    <View style={styles.setting}>
                        <Text> points: </Text>
                        <Text> {profile.points} </Text>
                    </View>




                    <View style={styles.setting}>
                        <Text> type: </Text>

                        <Text> {profile.type} </Text>
                    </View>

                    <Text>Follow Requests</Text>




                </View>

            )
        }
        return (
            <View style={styles.followRequest}>
                <Text>{itemData.item.firstName}   {itemData.item.lastName}</Text>

                <Button title="accept" onPress={() => {
                    acceptFollowRequest(itemData.item.id)


                }} />

            </View>
        )
    }

    useEffect(() => {
        getFollowRequests();
        getProfile();
    }, [])



    if (loading) {
        return (
            <LoadingScreen />
        )
    }



    return (
        <FlatList

            data={[{ id: '1' }].concat(followRequests)}
            renderItem={renderFollowRequest}
        />

    )
}

const styles = StyleSheet.create({
    doneButton: {
        paddingRight: 15
    },
    setting: {
        flexDirection: 'column',

        width: '100%',

        paddingHorizontal: 20,
        marginVertical: 20,

    },
    dpContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 120,
        marginBottom: 20
    },
    dp: {
        height: 80,
        width: 80,
        borderRadius: 40
    },
    followRequest: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100
    },
    settingInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1

    }
})