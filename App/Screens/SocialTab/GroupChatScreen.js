import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useLayoutEffect, useState, useRef, } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Animated, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShoppingSessionsListScreen from './ShoppingSessionsListScreen';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';
import CHATS from '../../dummy-data/Chats'
import { MaterialIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';


import * as chatActions from '../../store/actions/chats'
import * as popupActions from '../../store/actions/Popup'
import { useSelector, useDispatch } from 'react-redux';
import GenericHeaderButton from '../../components/GenericHeaderButton'
import LoadingScreen from '../../components/LoadingScreen';
import ShoppingSessionTimer from '../../components/ShoppingSessionTimer';

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

    // console.log('id: ' + productId);

    const sessionGroupId = useSelector(state => state.social.sessionGroupId)

    const chats = useSelector(state => state.social.chats);
    const participants = useSelector(state => state.social.groupPeople);

    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const chatListRef = useRef(null)
    const textInputRef = useRef(null)

    const [sending, setSending] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const [productId, setProductId] = useState(props.route.params?.productId)

    // const [iter, setIter] = useState(0);



    const getChats = useCallback(async () => {
        try {

            await dispatch(chatActions.getChats(groupId, chats.length))

            // setIter(chats.length)
            // dispatch(popupActions.setMessage('hello' + chats.length))



        }
        catch (err) {
            console.log(err)
        }

    }, [groupId, chats])

    const loadChats = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(chatActions.getChats(groupId, 0))
            await dispatch(chatActions.getGroupPeople(groupId))
            await dispatch(chatActions.connectToGroup(groupId))
            // setIter(chats.length)
            setIsLoading(false)

        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false)

    }, [groupId])

    const sendChat = useCallback(async (text) => {
        console.log('sendchat')
        try {
            if (!sending) {
                setSending(true)
                await dispatch(chatActions.sendChat(groupId, text))
                setSending(false)
            }


        }
        catch (err) {
            console.log(err)
        }
        setSending(false)

    }, [sending, groupId])

    const sendProduct = useCallback(async (productId) => {
        console.log('send product')
        try {
            if (!sending) {
                setSending(true)
                await dispatch(chatActions.sendProduct(groupId, productId))
                setSending(false)
            }


        }
        catch (err) {
            console.log(err)
        }
        setSending(false)

    }, [sending, groupId])

    useEffect(() => {
        // const willFocusSub = props.navigation.addListener(
        //     'focus', () => {

        //         loadChats()
        //     }

        // );

        // return willFocusSub;

        loadChats()
        return () => {
            dispatch(chatActions.disconnectFromGroup(groupId))
        }
    }, []);



    useEffect(() => {

        if (sending) {
            dispatch(popupActions.setMessage('sending...', false))
        }

    }, [sending])

    useEffect(() => {
        setProductId(props.route.params?.productId)
    }, [props])

    function renderItems(itemData) {

        const dp = participants !== undefined ? participants?.filter((person) => person.id === itemData.item.senderId)[0]?.profilePic : null
        const username = participants !== undefined ? participants?.filter((person) => person.id === itemData.item.senderId)[0]?.username : null
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

    if (isLoading) {
        return <LoadingScreen />
    }
    return (
        <View
            // behavior={Platform.OS == "ios" ? "padding" : "height"}
            // contentContainerStyle={styles.screen}
            style={styles.screen}
        >
            {groupId === sessionGroupId ? <ShoppingSessionTimer /> : null}


            <FlatList
                data={chats}
                renderItem={renderItems}
                ref={chatListRef}
                inverted={true}
                onEndReached={() => {
                    getChats()
                }}
            />
            {productId ?
                <View style={styles.shareBar}>


                </View> : null}


            <View
                // behavior='position'

                style={styles.sendMsgContainer}
            >
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



                        if (productId) {
                            sendProduct(productId)
                            setMessage('')
                            textInputRef.current.clear()
                            setProductId(null)
                        }
                        else {
                            message !== '' ? sendChat(message) : null
                            // chatListRef.current.scrollToEnd()
                            setMessage('')
                            textInputRef.current.clear()
                        }



                    }}
                />
                {(message !== '' && message !== null) || productId ?
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => {
                            if (productId) {
                                sendProduct(productId)
                                setMessage('')
                                textInputRef.current.clear()
                                setProductId(null)
                            }
                            else {
                                sendChat(message)
                                setMessage('')
                                textInputRef.current.clear()
                            }

                        }}>
                        <Ionicons name="md-send" size={30} color="grey" />
                    </TouchableOpacity> : null}


            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.screenBackgroundColor,
        flex: 1,
        justifyContent: 'flex-end'


    },
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
    shareBar: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'

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
    sendMsg: {
        height: 50,
        borderColor: 'black',
        backgroundColor: 'white',
        paddingLeft: 10,
        flex: 1,
        marginLeft: 5
    },

    sendButton: {
    }

})