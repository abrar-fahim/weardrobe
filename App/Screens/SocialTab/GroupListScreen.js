import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle';
import GROUPS from '../../dummy-data/Groups'

import * as chatActions from '../../store/actions/chats'
import * as profileActions from '../../store/actions/profile'
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import LoadingScreen from '../../components/LoadingScreen';
import Time from '../../components/Time';

export default function GroupListScreen(props) {

    const groups = useSelector(state => state.social.groups)


    const [iter, setIter] = useState(0);
    const userId = useSelector(state => state.auth.userId);

    const myProfile = useSelector(state => state.profile.myProfile);

    const [iterLoading, setIterLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(true)




    const dispatch = useDispatch()

    const loadMyProfile = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(profileActions.getMyProfile(userId));
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false)

    }, [userId])

    const LoadGroups = useCallback(async () => {
        try {

            setIsLoading(true)
            await dispatch(chatActions.getGroups(0))
            setIsLoading(false)
            setIter(0)
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    const LoadMoreGroups = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true);
                await dispatch(chatActions.getGroups(iter))
                setIter(iter => iter + 1)
                setIterLoading(false);
            }

        }
        catch (err) {
            console.log(err)
        }
        setIterLoading(false);

    }, [iter, iterLoading])

    useEffect(() => {
        // const willFocusSub = props.navigation.addListener(
        //     'focus', () => {

        LoadGroups();
        loadMyProfile();
        //     }

        // );

        // return () => {
        //     willFocusSub();
        //     setIter(0)
        // }

    }, []);



    function renderItems(itemData) {

        return (

            <TouchableOpacity onPress={() => {
                itemData.item.type === 'GROUP' ?
                    props.navigation.navigate('GroupTab',
                        {
                            groupId: itemData.item.id,
                            type: itemData.item.type,
                            logo: itemData.item.logo,
                            name: itemData.item.name,
                            shopId: itemData.item?.id ?? null

                        }
                    ) : props.navigation.navigate('GroupChat',
                        {
                            groupId: itemData.item.id,
                            type: itemData.item.type,
                            logo: itemData.item.logo,
                            name: itemData.item.name,
                            shopId: itemData.item?.id ?? null

                        }
                    )
            }}>
                <View style={styles.groupContainer}>

                    <View style={styles.picName}>
                        {itemData.item.logo ? < Image source={itemData.item.logo} style={styles.image} /> :
                            <Ionicons name="md-people" size={30} color="grey" />
                        }


                        <Text style={styles.groupName}>{itemData.item.name !== null ? itemData.item.name : itemData.item.participants}</Text>


                        <View style={styles.timeContainer}>
                            <Time style={styles.time} value={itemData.item.sentAt} />
                        </View>

                    </View>
                    <Text style={styles.lastText}>{itemData.item.type === 'SHOP' ? itemData.item.senderId === userId ? myProfile.username : itemData.item.shopName : itemData.item.senderName}</Text>

                    <Text
                        style={styles.lastText}
                        ellipsizeMode="clip"
                        numberOfLines={1}
                    >{itemData.item.messageType === 'PRODUCT' ? "shared a product" : itemData.item.messageType === 'PHOTO' ? "shared a photo" : itemData.item.message}
                    </Text>




                </View>
            </TouchableOpacity >


        )
    }

    if (isLoading) {
        return <LoadingScreen />

    }
    return (
        <View style={ScreenStyle}>
            <FlatList
                data={groups}
                renderItem={renderItems}
                refreshing={isLoading}
                onRefresh={() => {
                    LoadGroups();
                    loadMyProfile();
                }
                }
                ListEmptyComponent={
                    <View style={{ flex: 1 }}>
                        <Text>No chats yet!</Text>
                    </View>
                }
                onEndReached={
                    LoadMoreGroups

                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    groupContainer: {
        height: 100,
        width: '90%',
        alignSelf: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        //backgroundColor: '#eae9e9'
    },
    image: {
        height: 35,
        width: 35,
        borderRadius: 35,
        marginTop: 5

    },
    groupName: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
        flex: 1
    },
    picName: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center'
    },
    timeContainer: {
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 2
    },
    time: {
        color: 'grey',
        fontWeight: '500',
        textAlign: 'right',



    },
    lastText: {
        color: 'grey',
        fontWeight: '300',
        marginLeft: 41,
        marginTop: 5,


    }

})