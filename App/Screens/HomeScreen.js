import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { SearchBar } from 'react-native-elements';

import ProfileStackScreen from './Home/ProfileScreen';
import ShopStackScreen from './Home/ShopScreen'
import MagazineStackScreen from './Home/MagazineScreen'
import ChatStackScreen from './Home/ChatScreen'
import StudioStackScreen from './Home/StudioScreen'
import NotificationsStackScreen from './Home/NotificationsScreen'

import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
    const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator(): createBottomTabNavigator();
    return (
            <Tab.Navigator 
                tabBarOptions={{ activeTintColor: 'purple'}}
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
                        }

                    })

                }
            >
                <Tab.Screen name="Magazine" component={MagazineStackScreen} options={{
                }}/>
                <Tab.Screen name="Studio" component={StudioStackScreen}/>
                <Tab.Screen name="Shop" component={ShopStackScreen}/>
                <Tab.Screen name="Chat" component={ChatStackScreen}/>
                <Tab.Screen name="Weardrobe" component={ProfileStackScreen}/>
                <Tab.Screen name="Notifications" component={NotificationsStackScreen}/>
            </Tab.Navigator>
    );
}
