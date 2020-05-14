import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShoppingSessionsListScreen from './ShoppingSessionsListScreen';
import ScreenStyle from '../../Styles/ScreenStyle';
import Colors from '../../Styles/Colors';
import CHATS from '../../dummy-data/Chats'
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

export default function GroupTabScreen(props) {
    const TopTab = createMaterialTopTabNavigator();
    return (
        <TopTab.Navigator
            tabBarOptions= {{
                indicatorStyle: {
                    backgroundColor: Colors.tabBarActiveTintColor
                }
            }}
        >
            <TopTab.Screen name="GroupChat" component={GroupChatScreen} />
            <TopTab.Screen name="ShoppingSessionList" component={ShoppingSessionsListScreen} />
        </TopTab.Navigator>
    )
}


 export function GroupChatScreen(props) {

    function renderItems(itemData) {
        if(itemData.item.sender === 'abrar') {
            return (
                <View style={styles.chat}>
                    <Image  style={styles.picture} source={require('../../assets/Images/pic1.jpeg')}/>
                    <View>
                        <Image style={{...styles.msgBubble, width: 30 + itemData.item.msg.length * 6, height: (Math.floor(itemData.item.msg.length / 60) + 1) * 50}} source={require('../../assets/Images/darkGrey.png')}/>
                        <View style={styles.msgTextContainer}>
                            <Text style={styles.msgText}>{itemData.item.msg}</Text>
                        </View>
                    </View>
                    
                    
                    
                </View>
            )
        }
        return (
            <View style={styles.chat}>
            <Image  style={styles.pictureMe} source={require('../../assets/Images/pic1.jpeg')}/>
            <View>
                <Image style={{...styles.msgBubble, width: 30 + itemData.item.msg.length * 6, height: (Math.floor(itemData.item.msg.length / 60) + 1) * 50}} source={require('../../assets/Images/white.png')}/>
                <View style={styles.msgTextContainer}>
                    <Text style={styles.msgTextMe}>{itemData.item.msg}</Text>
                </View>
            </View>
            
            
            
        </View>
            
        )
       

    }
    return (
        <View style={ScreenStyle}>

            <FlatList data={CHATS} renderItem={renderItems}/>

            <View style={styles.sendMsgContainer}>
                <SimpleLineIcons name="emotsmile" size={20} color="grey"/>
                <TextInput style={styles.sendMsg} placeholder="Type Something"/>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    chat:{
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