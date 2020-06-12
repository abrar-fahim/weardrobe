import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

import ScreenStyle from '../../Styles/ScreenStyle'
import SHOPPINGSESSIONS from '../../dummy-data/ShoppingSessions'

import * as chatActions from '../../store/actions/chats'
import { useSelector, useDispatch } from 'react-redux';



export default function ShoppingSessionsListScreen(props) {

    const groupId = props.route.params?.groupId

    const sessions = useSelector(state => state.social.sessions)

    const dispatch = useDispatch()

    const loadSessions = useCallback(async () => {
        try {
            await dispatch(chatActions.getShoppingSessions(groupId))
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    useEffect(() => {
        loadSessions()
    }, [])

    const renderItems = (itemData) => {

        const date = Date.parse(itemData.item.date);

        const expiresIn = date + itemData.item.duration * 1000;

        const now = Date.now()

        const isActive = now < expiresIn;

        if (isActive) {
            dispatch(chatActions.setSessionActive(groupId, itemData.item.id, expiresIn - now, expiresIn))
        }
        return (

            <TouchableOpacity onPress={() => (props.navigation.navigate('ShoppingSession', {
                sessionId: itemData.item.id
            }))}>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 10, height: 120, alignItems: 'center' }}>





                    <View style={styles.listItem}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}> {itemData.item.name}</Text>
                            <View style={styles.imagesContainer}>
                                <Image style={styles.image} source={require('../../assets/Images/panjabi.jpg')} />
                                <Image style={styles.image} source={require('../../assets/Images/pants.jpeg')} />
                                <Image style={styles.image} source={require('../../assets/Images/shirt2.jpg')} />
                            </View>


                        </View>




                        <View style={{ flexDirection: 'row' }}>
                            {/* <Text style={styles.label}> BDT</Text>
                            <Text> {itemData.item.totalSpent}</Text> */}
                            {isActive ? <Text>Active</Text> : null}
                            <Text style={styles.date}> {itemData.item.date}</Text>
                        </View>





                    </View>





                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={ScreenStyle}>
            <FlatList data={sessions} renderItem={renderItems} />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        listItem: {
            marginRight: 10,
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: '#eae9e9',
            flex: 1,
            height: 100,
            width: 400,
            marginLeft: 1,
            padding: 5
        },
        name: {
            fontWeight: '700',
            fontSize: 22,
            alignSelf: 'flex-start'
        },
        label: {
            fontWeight: '300',

        },
        date: {
            fontWeight: '300',
            alignSelf: 'flex-end',
            marginLeft: 185
        },
        nameContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'

        },

        image: {
            height: 50,
            width: 50,
            borderRadius: 25

        },
        imagesContainer: {
            flexDirection: "row",


        }
    }
)
