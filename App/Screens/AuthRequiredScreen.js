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

export default function AuthRequiredScreen(props) {


    return (
        <View>
            <Button title="login/signup" onPress={() => (props.navigation.navigate('Login'))} />
        </View>
    );
}
