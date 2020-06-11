import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShoppingSessionsListScreen from './ShoppingSessionsListScreen';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';
import CHATS from '../../dummy-data/Chats'
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';


import * as chatActions from '../../store/actions/chats'
import { useSelector, useDispatch } from 'react-redux';
import GenericHeaderButton from '../../components/GenericHeaderButton'

export default function GroupTabScreen(props) {
    const groupId = props.route.params?.groupId
    const TopTab = createMaterialTopTabNavigator();

    useLayoutEffect(() => {
        props.navigation.setOptions(
            {
                headerRight: () => (
                    <View style={styles.headerButtons}>
                        <GenericHeaderButton
                            title="GroupInfo" iconName="md-information-circle-outline" onPress={
                                () => props.navigation.navigate('GroupInfo',
                                    {
                                        groupId: groupId
                                    }
                                )
                            } />
                        <GenericHeaderButton title="NewShoppingSession" iconName="md-cart" onPress={
                            () => props.navigation.navigate('NewShoppingSession',
                                {
                                    groupId: groupId
                                })
                        } />
                    </View>
                )
            }
        )
    })
    return (
        <TopTab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: Colors.tabBarActiveTintColor
                }
            }}
        >
            <TopTab.Screen
                name="GroupChat"
                component={GroupChatScreen} initialParams={{
                    groupId: groupId
                }}
            />
            <TopTab.Screen
                name="ShoppingSessionList"
                component={ShoppingSessionsListScreen}
                initialParams={{
                    groupId: groupId
                }}
            />
        </TopTab.Navigator>
    )
}


export function GroupChatScreen(props) {
    const groupId = props.route.params?.groupId

    const chats = useSelector(state => state.social.chats);

    const dispatch = useDispatch();

    const loadChats = useCallback(async () => {
        try {
            await dispatch(chatActions.getChats(groupId, 0))
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    useEffect(() => {
        loadChats()
    }, [])




    function renderItems(itemData) {
        // if (itemData.item.sender === 'abrar') {
        //     return (
        //         <View style={styles.chat}>
        //             <Image style={styles.picture} source={require('../../assets/Images/pic1.jpeg')} />
        //             <View>
        //                 <Image
        //                     style={{
        //                         ...styles.msgBubble,
        //                         width: 30 + itemData.item.text?.length ?? 0 * 6,
        //                         height: (Math.floor(itemData.item.text?.length ?? 0 / 60) + 1) * 50
        //                     }}
        //                     source={require('../../assets/Images/darkGrey.png')}
        //                 />
        //                 <View style={styles.msgTextContainer}>
        //                     <Text style={styles.msgText}>{itemData.item.text}</Text>
        //                 </View>
        //             </View>



        //         </View>
        //     )
        // }


        return (
            <View style={styles.chat}>
                <Image style={styles.picture} source={require('../../assets/Images/pic1.jpeg')} />
                <View>
                    <Image
                        style={{
                            ...styles.msgBubble,
                            width: itemData.item.text !== null && itemData.item.text !== undefined ? 30 + itemData.item.text?.length * 6 : 0,
                            height: itemData.item.text !== null && itemData.item.text !== undefined ? (Math.floor(itemData.item.text?.length / 60) + 1) * 50 : 0
                        }}
                        source={require('../../assets/Images/white.png')}
                    />
                    <View style={styles.msgTextContainer}>
                        <Text style={styles.msgTextMe}>{itemData.item.text}</Text>
                    </View>
                </View>



            </View>

        )


    }
    return (
        <View style={ScreenStyle}>

            <FlatList data={chats} renderItem={renderItems} />

            <View style={styles.sendMsgContainer}>
                <SimpleLineIcons name="emotsmile" size={20} color="grey" />
                <TextInput style={styles.sendMsg} placeholder="Type Something" />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    headerButtons: {
        flexDirection: 'row'
    },
    chat: {
        marginVertical: 20,
        marginHorizontal: 10,
    },
    picture: {
        height: 30,
        width: 30,
        borderRadius: 15
    },

    msgBubble: {
        marginLeft: 10,
        borderRadius: 20,
        marginTop: 5,
        maxWidth: '98%'
    },
    msgText: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        color: 'white',
        fontWeight: '300'

    },
    msgTextContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgTextMe: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        color: 'white',
        fontWeight: '300',
        color: 'black'
    },
    pictureMe: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignSelf: 'flex-end'
    },
    sendMsg: {
        height: 50,
        borderColor: 'black',
        backgroundColor: 'white',
        paddingLeft: 10,
        width: '100%',
        marginLeft: 5
    },
    sendMsgContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 10
    }
})