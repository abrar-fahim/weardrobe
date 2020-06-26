import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle'

import BLOGS from '../../dummy-data/Blogs'
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../../store/actions/profile'


export default function BlogListScreen(props) {

    const dispatch = useDispatch();

    const profileId = props.route.params?.profileId

    const userId = useSelector(state => state.auth.userId)

    const myProfile = userId === profileId || profileId === undefined//secure this check using backend auth in production



    const blogs = useSelector(state => state.profile.blogs)
    const myBlogs = useSelector(state => state.profile.myBlogs)

    const [allowed, setAllowed] = useState(true)    //use later with get user blogs 



    const loadMyBlogs = useCallback(async () => {
        try {
            await dispatch(profileActions.fetchMyBlogs())
        }
        catch (err) {
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
                <View style={{ height: 30, margin: 30 }}>
                    <Text>{itemData.item.writing}</Text>
                    <Text>{itemData.item.date}</Text>
                </View>
            </TouchableOpacity>

        )
    }
    return (
        <View style={ScreenStyle}>
            {myProfile ? <Button onPress={() => (props.navigation.navigate('CreateBlog1'))} title="Create New Blog Post" /> : null}

            <FlatList
                data={myProfile ? myBlogs : blogs}
                renderItem={renderItems}
                ListEmptyComponent={() => {
                    if (!allowed) {
                        return (
                            <View>
                                <Text>follow this user to see their posts</Text>
                            </View>
                        )
                    }
                    return (
                        <View>
                            <Text>no blogs yet!</Text>
                        </View>

                    )

                }}
            />
        </View>
    );

}