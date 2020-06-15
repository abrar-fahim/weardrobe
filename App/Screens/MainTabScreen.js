import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { SearchBar } from 'react-native-elements';

import ProfileStackScreen from './ProfileTab/ProfileScreen';
import ShopStackScreen from './ShopTab/ShopStackScreen'
import MagazineStackScreen from './MagazineTab/MagazineScreen'
import ChatStackScreen from './SocialTab/ChatScreen'
import StudioStackScreen from './StudioTab/StudioScreen'
import NotificationsStackScreen from './NotificationTab/NotificationsScreen'

import { ProfileTabsScreen } from './ProfileTab/ProfileScreen'

import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import Colors from '../Styles/Colors'
import { useDispatch, useSelector } from 'react-redux';

import * as authActions from '../store/actions/auth'
import * as socialActions from '../store/actions/chats'

import SmallPopup from '../components/SmallPopup'

export default function HomeScreen(props) {

    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.userId);

    const activeSessionId = useSelector(state => state.social.activeSessionId);
    const sessionGroupId = useSelector(state => state.social.sessionGroupId);

    const timeLeft = useSelector(state => state.social.timeLeft);
    const expiresIn = useSelector(state => state.social.expiresIn);

    const popupMessage = useSelector(state => state.popup.message);
    const popupIsError = useSelector(state => state.popup.isError);






    const loadUserId = useCallback(async () => {
        //setIsLoading(true);
        try {
            await dispatch(authActions.getUserId())
        } catch (err) {
            console.log("error in trab screen: ");
            console.log(err)
        }
        //setIsLoading(false);
    }, [])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'focus', () => {

                if (userId === null) {
                    loadUserId()
                }
            }

        );

        return willFocusSub;
    }, [loadUserId]);

    useEffect(() => {


        const shoppingSessionTimer = setInterval(() => {
            dispatch(socialActions.updateSessionTimer(expiresIn - Date.now()))
        }, 1000)
        return () => clearInterval(shoppingSessionTimer)


    }, [expiresIn]);

    // useEffect(() => {
    //     loadUserId()
    // }, [])


    const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
    //const Tab = createMaterialTopTabNavigator();
    return (
        <>
            <SmallPopup message={popupMessage} isError={popupIsError} />
            <Tab.Navigator
                iconName='camera'
                tabBarOptions={{ activeTintColor: Colors.tabBarActiveTintColor }}
                screenOptions={
                    ({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName = 'ios-star';

                            if (route.name === 'Magazine') {
                                iconName = 'wallpaper';
                            }
                            else if (route.name === 'Studio') {
                                iconName = 'camera';
                            }
                            else if (route.name === 'Shop') {
                                iconName = 'shop';
                            }

                            else if (route.name === 'Chat') {
                                iconName = 'chat';
                            }
                            else if (route.name === 'Weardrobe') {
                                iconName = 'face';
                            }
                            else if (route.name === 'Notifications') {
                                iconName = 'notifications';
                            }
                            else {
                                iconName = 'ios-star';
                            }

                            return <MaterialIcons name={iconName} size={25} color={color} />;
                        },
                        tabBarColor: Colors.tabBarColor


                    })

                }
            >
                <Tab.Screen name="Magazine" component={MagazineStackScreen} />
                <Tab.Screen name="Studio" component={StudioStackScreen} />
                <Tab.Screen name="Shop" component={ShopStackScreen} />
                <Tab.Screen name="Chat" component={ChatStackScreen} />
                <Tab.Screen name="Weardrobe" component={ProfileStackScreen} />
                <Tab.Screen name="Notifications" component={NotificationsStackScreen} />
            </Tab.Navigator>
        </>
    );
}
