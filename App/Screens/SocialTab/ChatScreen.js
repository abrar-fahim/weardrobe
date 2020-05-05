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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import {CHATS} from '../../dummy-data/Chats'
import NewPostButton from '../../components/NewPostButton';
import NewChatScreen from './NewChatScreen';
import GroupScreen from './GroupScreen';



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

function ChatTabs() {
    const TopTab = createMaterialTopTabNavigator();

    return (
        <TopTab.Navigator>
            <TopTab.Screen name="Chats" component={ChatScreen}/>
            <TopTab.Screen name="Groups" component={GroupScreen}/>

        </TopTab.Navigator>
    )
    
}

export default function ChatStackScreen({navigation}) {
    const ChatStack = createStackNavigator();
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name="ChatScreen" component={ChatTabs} options = {{
                headerRight: () => (<NewPostButton navigation={navigation} route="NewChat"/>)
                
            }}/>

            <ChatStack.Screen name="NewChat" component={NewChatScreen}/>
        </ChatStack.Navigator>
        
    )
}

// const styles = StyleSheet.create({
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
// })