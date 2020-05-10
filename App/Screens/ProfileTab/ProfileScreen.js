import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { useSelector, useDispatch } from 'react-redux';

import BlogListScreen from './BlogListScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import GenericHeaderButton from '../../components/GenericHeaderButton'
import ProfileSettingsScreen from './ProfileSettingsScreen';
import FollowersListTabScreen from './FollowersListScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CreateBlogScreen1 from './CreateBlogScreen1';
import CreateBlogScreen2 from './CreateBlogScreen2';
import CreateBlogScreen3 from './CreateBlogScreen3';
import BlogScreen from './BlogScreen';
import HeaderOptions from '../../Styles/HeaderOptions';
import ScreenStyle from '../../Styles/ScreenStyle'




export function ProfileScreen(props) {
    return (
        <View style={ScreenStyle}>
            <Text> Profile Screen</Text>
            
        </View>
    );

}

export function ProfileTabsScreen({navigation}) {
    const TopTab = createMaterialTopTabNavigator();

    return(
        <View style={{ ...ScreenStyle, flex: 1}}>
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
            <TopTab.Navigator
                tabBarOptions={{
                    indicatorStyle: {
                        backgroundColor: 'green'
                    }
                }}
            >
                <TopTab.Screen name="ProfileStack" component={ProfileScreen} />
                <TopTab.Screen name="BlogListScreen" component={BlogListScreen} />
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
        <ProfileStack.Navigator
            screenOptions={HeaderOptions}
        >
            <ProfileStack.Screen name="ProfileScreen" component={ProfileTabsScreen} options = {{
                headerRight: () => (
                    <GenericHeaderButton title="SettingButton" iconName="md-settings" onPress={() => props.navigation.navigate('ProfileSettings')} />
                )
            }}/>

            <ProfileStack.Screen name="Login" component={LoginScreen}/>
            <ProfileStack.Screen name="Signup" component={SignupScreen}/>
            <ProfileStack.Screen name="ProfileSettings" component={ProfileSettingsScreen}/>
            <ProfileStack.Screen name="FollowersListTab" component={FollowersListTabScreen}/>
            <ProfileStack.Screen name="CreateBlog1" component={CreateBlogScreen1} options={{
                headerRight: () => (
                    <GenericHeaderButton name="CreateBlogButton1" iconName="md-arrow-forward" onPress={() => props.navigation.navigate('CreateBlog2')} />
                )
            }}/>
            <ProfileStack.Screen name="CreateBlog2" component={CreateBlogScreen2} options={{
                headerRight: () => (
                    <GenericHeaderButton name="CreateBlogButton2" iconName="md-arrow-forward" onPress={() => props.navigation.navigate('CreateBlog3')} />
                )
            }}/>
            <ProfileStack.Screen name="CreateBlog3" component={CreateBlogScreen3} options={{
                headerRight: () => (
                    <GenericHeaderButton name="CreateBlogButton3" iconName="md-arrow-forward" onPress={() => props.navigation.popToTop()} />
                )
            }}/>
            <ProfileStack.Screen name="BlogScreen" component={BlogScreen}/>
        </ProfileStack.Navigator>
        
    )
}