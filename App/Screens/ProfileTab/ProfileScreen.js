import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { useSelector, useDispatch } from 'react-redux';

import BlogScreen from './BlogScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import GenericHeaderButton from '../../components/GenericHeaderButton'
import ProfileSettingsScreen from './ProfileSettingsScreen';
import FollowersListTabScreen from './FollowersListScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';




export function ProfileScreen(props) {
    return (
        <View>
            <Text> Profile Screen</Text>
            
        </View>
    );

}

export function ProfileTabsScreen({navigation}) {
    const TopTab = createMaterialTopTabNavigator();

    return(
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 150}}>
                <View style={{flexDirection: 'column', marginLeft: 40, alignItems: 'center'}}>
                    <Image style={{height: 100, width: 100}}source={require('../../assets/Images/face.png') }/>

                    <Text> Stick Man</Text>
                    <Text> Hi! </Text>

                </View>
                <TouchableOpacity onPress={ () => navigation.navigate('FollowersListTab')}>
                    <View style={{flexDirection: 'column', height: 80, marginRight: 40, justifyContent: 'center'}}>
                        <Text>Followers: 1,000,000</Text>
                        <Text>Following: 0</Text>
                        
                    </View>
                </TouchableOpacity>
                
            </View>
            <TopTab.Navigator>
                <TopTab.Screen name="ProfileStack" component={ProfileScreen} />
                <TopTab.Screen name="BlogScreen" component={BlogScreen} />
            </TopTab.Navigator>
        </View>
            
        
        // <View>
        //     <Text> jello</Text>
        // </View>
    )
}


export default function ProfileStackScreen(props) {
    const ProfileStack = createStackNavigator();
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileTabsScreen} options = {{
                headerRight: () => (
                    <GenericHeaderButton title="SettingButton" iconName="md-settings" onPress={() => props.navigation.navigate('ProfileSettings')} />
                )
            }}/>

            <ProfileStack.Screen name="Login" component={LoginScreen}/>
            <ProfileStack.Screen name="Signup" component={SignupScreen}/>
            <ProfileStack.Screen name="ProfileSettings" component={ProfileSettingsScreen}/>
            <ProfileStack.Screen name="FollowersListTab" component={FollowersListTabScreen}/>
        </ProfileStack.Navigator>
        
    )
}