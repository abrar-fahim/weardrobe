import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
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
import Colors from '../../Styles/Colors';

import * as authActions from '../../store/actions/auth'
import * as profileActions from '../../store/actions/profile'
import checkLoggedIn from '../../components/CheckLoggedIn'
import AuthRequiredScreen from '../AuthRequiredScreen'




export function ProfileScreen(props) {

    
    const myPosts = useSelector(state => state.profile.posts)
    const dispatch = useDispatch()
    const loadMyPosts = useCallback( async() => {
        try {
            await dispatch(profileActions.fetchMyPosts())
        }
        catch(err) {
            console.log(err)

        }
    }, [])

    useEffect(() => {
        loadMyPosts()
    }, [])

    const renderMyPosts = (itemData) => {
        return (
            <View style={styles.postGridItem}>

                <Image source={itemData.item.images[0].image} style={styles.postImage}/>


            </View>
        )
    }
    return (
        <View style={ScreenStyle}>
            <FlatList data={myPosts} renderItem={renderMyPosts} numColumns={3}/>


            
        </View>
    );

}

export function ProfileTabsScreen({navigation}) {

    const loggedIn = checkLoggedIn();

    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await dispatch(authActions.logout())
        } catch(err) {
            console.log('error while logging out')
        }
    }
    const TopTab = createMaterialTopTabNavigator();

    if(!loggedIn) {
        return (
            <AuthRequiredScreen navigation={navigation}/>
        )

    }

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

                <Button title="logout" onPress={logoutHandler} />
                
            </View>
            <TopTab.Navigator
                tabBarOptions={{
                    indicatorStyle: {
                        backgroundColor: Colors.tabBarActiveTintColor
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

const styles = StyleSheet.create({
    postGridItem: {
        margin: 10,
        width: Dimensions.get('window').width / 3.5
    },
    postImage: {
        height: Dimensions.get('window').width / 3.5,
    }
})