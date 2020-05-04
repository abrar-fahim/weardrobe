import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import {HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';


import {CHATS} from '../../dummy-data/Chats'


function renderChatItem(itemData) {

    return (
        <View>
            <Text>Chats</Text>
            <View style={{flexDirection: 'column'}}>
                <Text> {itemData.item.name}</Text> 

                <View style={{flexDirection: 'row'}}>
                    <Text> {itemData.item.chats[itemData.item.chats.length-1]} </Text>
                    <Text> blah</Text>
                </View>

            </View>
        </View>
    )
}


export function ChatScreen(props) {
    return (
        <View>
            <FlatList 
                data={CHATS}
                renderItem={renderChatItem}
            />
        </View>
    );

}

function NewMessageScreen(props) {
    return(
        <View>
            <Text>New message screen</Text> 
        </View>
    )
}

export default function ChatStackScreen({navigation}) {
    const ChatStack = createStackNavigator();
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name="ChatScreen" component={ChatScreen} options = {{
                headerRight: () => (
                
                    <TouchableOpacity onPress={() => navigation.navigate('NewMessage')}>
                        <Entypo name="new-message" size={25} style={{marginRight: 20}}/>
                    </TouchableOpacity>
                )
                
            }}/>

            <ChatStack.Screen name="NewMessage" component={NewMessageScreen}/>
        </ChatStack.Navigator>
        
    )
}

// const styles = StyleSheet.create({
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
// })