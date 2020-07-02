import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import ScreenStyle from '../../Styles/ScreenStyle'

import BLOGS from '../../dummy-data/Blogs'
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../../store/actions/profile'
import Colors from '../../Styles/Colors';


export default function BlogListScreen(props) {

    const dispatch = useDispatch();

    const profileId = props.route.params?.profileId

    const userId = useSelector(state => state.auth.userId)

    const myProfile = userId === profileId || profileId === undefined//secure this check using backend auth in production





    // const blogs = useSelector(state => state.profile.blogs)
    const myBlogs = useSelector(state => state.profile.myBlogs)

    const [allowed, setAllowed] = useState(true)    //use later with get user blogs 
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true);



    const loadMyBlogs = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(profileActions.fetchMyBlogs())
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    })

    const loadUserBlogs = useCallback(async () => {
        try {
            setIsLoading(true)
            const gotBlogs = await profileActions.fetchUserBlogsDirect(profileId);
            setBlogs(gotBlogs)
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [profileId])

    useEffect(() => {
        profileId === userId ? loadMyBlogs() : loadUserBlogs()
    }, [profileId, userId])

    function renderItems(itemData) {
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate('BlogScreen', {
                    blog: itemData.item

                })}
                style={styles.blogItem}
            >

                <Image style={styles.image} source={itemData.item.images[0]?.image} />
                <Text style={styles.title}>Blog Title</Text>
                <Text>{itemData.item.date}</Text>

            </TouchableOpacity>

        )
    }
    return (
        <View style={styles.screen}>


            <FlatList
                ListHeaderComponent={myProfile ? <Button color={Colors.primaryColor} onPress={() => (props.navigation.navigate('CreateBlog1'))} title="Create New Blog Post" /> : null}
                data={myProfile ? myBlogs : blogs}
                renderItem={renderItems}
                refreshing={isLoading}
                onRefresh={() => { profileId === userId ? loadMyBlogs() : loadUserBlogs() }}
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

const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        alignItems: 'center',
        flex: 1,
        paddingVertical: 20,

    },

    blogItem: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
        marginVertical: 30



    },
    image: {
        alignSelf: 'center',
        height: 90,
        width: '90%'
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    }
})