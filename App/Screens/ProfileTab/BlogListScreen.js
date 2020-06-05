import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle'

import BLOGS from '../../dummy-data/Blogs'
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../../store/actions/profile'


export default function BlogListScreen(props) {

    const dispatch = useDispatch();

    const blogs = useSelector(state => state.profile.blogs)


    const loadMyBlogs = useCallback(async () => {
        try {
            await dispatch(profileActions.fetchMyBlogs())
        }
        catch(err)  {
            console.log(err)
        }
    })

    useEffect(() => {
        loadMyBlogs()
    }, [])

    function renderItems(itemData) {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('BlogScreen', {
                blog: itemData.item

            })}>
                <View style={{height: 30, margin: 30}}>
                    <Text>{itemData.item.writing}</Text>
                    <Text>{itemData.item.date}</Text>
                </View>
            </TouchableOpacity>
            
        )
    }
    return (
        <View style={ScreenStyle}>
            <Button onPress={ () => (props.navigation.navigate('CreateBlog1')) } title="Create New Blog Post"/>
            <FlatList data={blogs} renderItem={renderItems}/>
        </View>
    );

}