import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SearchBar, Overlay } from 'react-native-elements';


import { CHATS } from '../../dummy-data/Chats'
import NewPostButton from '../../components/NewPostButton';
import NewChatScreen from './NewChatScreen';
import GroupListScreen from './GroupListScreen';
import PeopleSearchScreen from './PeopleSearchScreen'

import SearchButton from '../../components/SearchButton'
import GroupTabScreen, { GroupChatScreen } from './GroupChatScreen';
import ShoppingSessionScreen from './ShoppingSessionScreen';


import NewShoppingSessionScreen from './NewShoppingSessionScreen';
import HeaderOptions from '../../Styles/HeaderOptions';
import ScreenStyle from '../../Styles/ScreenStyle';
import checkLoggedIn from '../../components/CheckLoggedIn'
import AuthRequiredScreen from '../AuthRequiredScreen'
import GroupInfoScreen from './GroupInfoScreen';

import * as chatActions from '../../store/actions/chats'
import { useSelector, useDispatch } from 'react-redux';
import PictureUploadScreen from './PictureUploadScreen';
import ProductScreen from '../ShopTab/ProductScreen';
import TestScreen from '../ShopTab/TestScreen';
import { ProfileTabsScreen } from '../ProfileTab/ProfileScreen';



function renderChatItem(itemData) {

    return (
        <View>
            <Text>Chats</Text>
            <View style={{ flexDirection: 'column' }}>
                <Text> {itemData.item.name}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Text> {itemData.item.chats[itemData.item.chats.length - 1]} </Text>
                    <Text> blah</Text>
                </View>

            </View>
        </View>
    )
}


export function ChatScreen(props) {

    return (
        <View style={ScreenStyle}>
            <SearchBar placeholder="Search..." lightTheme={true} containerStyle={{ height: 55 }} platform={Platform.OS} />

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
            <TopTab.Screen name="Chats" component={ChatScreen} />
            <TopTab.Screen name="Groups" component={GroupListScreen} />

        </TopTab.Navigator>
    )

}

export default function ChatStackScreen({ navigation }) {
    const ChatStack = createStackNavigator();

    const loggedIn = checkLoggedIn();
    const CustomView = Platform.OS === "ios" ? KeyboardAvoidingView : View;
    return (
        <CustomView
            style={{ flex: 1 }}
            behavior="padding"
        >
            <ChatStack.Navigator
                screenOptions={HeaderOptions}
            >

                {loggedIn ?
                    <>
                        <ChatStack.Screen name="Groups" component={GroupListScreen} options={{
                            headerRight: () => (<NewPostButton onPress={() => navigation.navigate('NewChat')} />),
                            title: "Chats"

                        }} />

                        <ChatStack.Screen name="NewChat" component={NewChatScreen} options={{

                        }} />
                        {/* <ChatStack.Screen name="PeopleSearch" component={PeopleSearchScreen} /> */}
                        <ChatStack.Screen name="GroupTab" component={GroupTabScreen} />
                        <ChatStack.Screen name="Profile" component={ProfileTabsScreen} />
                        <ChatStack.Screen name="GroupChat" component={GroupChatScreen} />
                        <ChatStack.Screen name="ShoppingSession" component={ShoppingSessionScreen} />
                        <ChatStack.Screen name="NewShoppingSession" component={NewShoppingSessionScreen} />
                        <ChatStack.Screen name="GroupInfo" component={GroupInfoScreen} />
                        <ChatStack.Screen name="PictureUpload" component={PictureUploadScreen} />
                        {/* <ChatStack.Screen name="Product" component={ProductScreen}/> */}
                    </>
                    :
                    <ChatStack.Screen name="AuthReq" component={AuthRequiredScreen} />


                }



            </ChatStack.Navigator>
        </CustomView>


    )
}

// const styles = StyleSheet.create({
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
// })