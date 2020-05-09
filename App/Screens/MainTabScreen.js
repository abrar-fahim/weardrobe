import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { SearchBar } from 'react-native-elements';

import ProfileStackScreen from './ProfileTab/ProfileScreen';
import ShopStackScreen from './ShopTab/ShopStackScreen'
import MagazineStackScreen from './MagazineTab/MagazineScreen'
import ChatStackScreen from './SocialTab/ChatScreen'
import StudioStackScreen from './StudioTab/StudioScreen'
import NotificationsStackScreen from './NotificationTab/NotificationsScreen'

import {ProfileTabsScreen} from './ProfileTab/ProfileScreen'

import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import Colors from '../Styles/Colors'

export default function HomeScreen() {
    const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator(): createBottomTabNavigator();
    //const Tab = createMaterialTopTabNavigator();
    return (
            <Tab.Navigator 
                tabBarOptions={{ activeTintColor: Colors.tabBarActiveTintColor}}
                screenOptions={
                    ({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName = 'ios-star';

                            if(route.name === 'Magazine') {
                                iconName = 'wallpaper';
                            }
                            else if(route.name === 'Studio') {
                                iconName = 'camera';
                            }
                            else if(route.name === 'Shop') {
                                iconName = 'shop';
                            }
                            
                            else if(route.name === 'Chat') {
                                iconName = 'chat';
                            }
                            else if(route.name === 'Weardrobe') {
                                iconName = 'face';
                            }
                            else if(route.name === 'Notifications') {
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
                <Tab.Screen name="Studio" component={StudioStackScreen}/>
                <Tab.Screen name="Shop" component={ShopStackScreen}/>
                <Tab.Screen name="Chat" component={ChatStackScreen}/>
                <Tab.Screen name="Weardrobe" component={ProfileStackScreen}/>
                <Tab.Screen name="Notifications" component={NotificationsStackScreen}/>
            </Tab.Navigator>
    );
}
