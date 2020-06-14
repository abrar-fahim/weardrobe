import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useLayoutEffect, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Animated } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShoppingSessionsListScreen from './ShoppingSessionsListScreen';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';
import CHATS from '../../dummy-data/Chats'
import { MaterialIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';


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
                        <GenericHeaderButton
                            title="NewShoppingSession"
                            iconName="md-add"

                            onPress={
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
    //sockets here


    const groupId = props.route.params?.groupId

    const chats = useSelector(state => state.social.chats);
    const participants = useSelector(state => state.social.groupPeople);

    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const chatListRef = useRef(null)
    const textInputRef = useRef(null)

    const loadChats = useCallback(async () => {
        try {
            await dispatch(chatActions.getChats(groupId, 0))
            await dispatch(chatActions.getGroupPeople(groupId))
            await dispatch(chatActions.connectToGroup(groupId))

        }
        catch (err) {
            console.log(err)
        }

    }, [])

    const sendChat = useCallback(async (text) => {
        try {
            await dispatch(chatActions.sendChat(groupId, text))

        }
        catch (err) {
            console.log(err)
        }

    })

    useEffect(() => {
        loadChats()
        // chatListRef.current.scrollToIndex({animated: false, index: chats.length - 1, viewPosition: 1})

        return () => {
            dispatch(chatActions.disconnectFromGroup(groupId))
        }
    }, [])

    useEffect(() => {
        //  chatListRef.current.scrollToIndex({animated: true, index: 1, viewPosition: 0.5})
    }, [chats])








    function renderItems(itemData) {

        const dp = participants.filter((person) => person.id === itemData.item.senderId)[0].profilePic
        const username = participants.filter((person) => person.id === itemData.item.senderId)[0].username
        if (itemData.item.senderId === userId) {
            return (
                <View style={styles.chat}>

                    <Image style={styles.pictureMe} source={dp} />
                    <Text style={styles.usernameMe}>{username}</Text>
                    {itemData.item.text === null ? <Image source={itemData.item.photo} style={styles.photoMe} /> :
                        <View style={styles.msgBubbleMe}>

                            <Text style={styles.msgTextMe}>{itemData.item.text}</Text>


                        </View>}



                </View>
            )
        }

        // console.log(participants)


        return (
            <View style={styles.chat}>
                <Image style={styles.picture} source={dp} />
                <Text style={styles.username}>{username}</Text>
                {itemData.item.text === null ? <Image source={itemData.item.photo} style={styles.photo} /> :
                    <View style={styles.msgBubble}>

                        <Text style={styles.msgText}>{itemData.item.text}</Text>


                    </View>}




            </View>

        )


    }
    return (
        <View style={ScreenStyle}>

            <FlatList
                data={chats}
                renderItem={renderItems}
                ref={chatListRef}
                inverted={true}


            />

            <View style={styles.sendMsgContainer}>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('PictureUpload', {
                        groupId: groupId
                    })
                }}>
                    <Ionicons name="md-photos" size={30} color="grey" />
                </TouchableOpacity>

                <TextInput
                    style={styles.sendMsg}
                    placeholder="Type Something"
                    ref={textInputRef}

                    onChangeText={setMessage}
                    onSubmitEditing={() => {

                        message !== '' ? sendChat(message) : null
                        // chatListRef.current.scrollToEnd()
                        setMessage('')
                        textInputRef.current.clear()

                    }}
                />
                {message !== '' && message !== null ?
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => {
                            sendChat(message)
                            setMessage('')
                            textInputRef.current.clear()
                        }}>
                        <Ionicons name="md-send" size={30} color="grey" />
                    </TouchableOpacity> : null}


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
    username: {
        alignSelf: 'flex-start'

    },
    usernameMe: {

        alignSelf: 'flex-end'
    },

    msgBubble: {
        flexDirection: 'row',
        flexGrow: 1,
        marginLeft: 10,
        borderRadius: 20,
        marginTop: 5,
        maxWidth: '98%',
        minWidth: 50,
        minHeight: 50,
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    msgBubbleMe: {
        flexDirection: 'row',
        flexGrow: 1,
        marginLeft: 10,
        borderRadius: 20,
        marginTop: 5,
        maxWidth: '98%',
        minWidth: 50,
        minHeight: 50,
        alignSelf: 'flex-end',
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    msgText: {
        // alignSelf: 'flex-start',
        // marginLeft: 20,
        color: 'black',
        fontWeight: '300',
        flexDirection: 'row',
        flexGrow: 0.1,
        textAlign: 'center'

    },
    // msgTextContainer: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    msgTextMe: {
        // alignSelf: 'flex-end',
        // marginRight: 15,
        fontWeight: '300',
        color: 'white',
        flexGrow: 0.1,
        textAlign: 'center'
    },

    photo: {
        height: 300,
        width: 300,
        alignSelf: 'flex-start',
        margin: 10
    },
    photoMe: {
        height: 300,
        width: 300,
        alignSelf: 'flex-end',
        margin: 10
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
        flex: 1,
        marginLeft: 5
    },
    sendMsgContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 5,
        height: 70,
    },
    sendButton: {
    }

})