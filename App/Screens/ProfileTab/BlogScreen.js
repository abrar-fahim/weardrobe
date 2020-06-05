import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as magazineActions from '../../store/actions/magazine'

const BlogScreen = (props) => {


    const blogId = props.route.params?.blog.id;

    const images = props.route.params?.blog.images;
    const numComments = props.route.params?.blog.numComments ?? 0
    const numReacts = props.route.params?.blog.numReacts ?? 0
    const blog = props.route.params?.blog



    const listImages = images.map((item, index) => (
        {
            image: item,
            id: index.toString()
        }
    ))


    const [showReacts, setShowReacts] = useState(false)
    const dispatch = useDispatch();

    const reacts = useSelector(state => state.magazine.shopPostReacts)
    const comments = useSelector(state => state.magazine.shopPostComments)

    const loadUserBlogComments = useCallback(async (blogId) => {
        try {
            await dispatch(magazineActions.fetchUserBlogComments(blogId))
        }
        catch (err) {
            console.log(err)
        }
    })

    const loadUserBlogReacts = useCallback(async (blogId) => {
        try {
            await dispatch(magazineActions.fetchUserBlogPostReacts(blogId))

        }
        catch (err) {
            console.log(err)
        }
    })



    const renderImage = (itemData) => {
        console.log(itemData.item.image.image)
        return (

            <Image source={itemData.item.image.image} style={styles.postImage}
                resizeMode="contain" />
        )
    }

    useEffect(() => {
        loadUserBlogComments(blogId);

    }, [])

    const renderComment = (itemData) => {

        return (
            <View style={styles.comment}>
                <Text>{itemData.item.username}:  </Text>
                <Text>{itemData.item.comment}</Text>
            </View>
        )
    }

    const renderReact = (itemData) => {
        return (
            <Text>{itemData.item.username}:   {itemData.item.type}</Text>
        )
    }


    return (
        <View>

            <FlatList data={listImages} pagingEnabled={true} horizontal={true} renderItem={renderImage} />

            <View style={styles.nums}>
                <TouchableOpacity onPress={() => {
                    loadUserBlogReacts(blogId);
                    setShowReacts(state => !state)
                    // console.log(postComments)
                }}>
                    <Text>{numReacts} Reacts</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {


                    // console.log(postComments)
                }}>
                    <Text>{numComments} Comments</Text>
                </TouchableOpacity>

            </View>

            {showReacts ? <FlatList listKey={blogId + "1"} data={reacts} renderItem={renderReact} /> : null}

            <FlatList listKey={blogId + "2"} data={comments} renderItem={renderComment} />

            <Text>{blog.text}</Text>

        </View>
    )
}

export default BlogScreen;

const styles = StyleSheet.create({
    postGridItem: {
        margin: 10,
        width: Dimensions.get('window').width / 3.5
    },
    postImage: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
    },
    nums: {
        width: '100%',
        alignItems: 'center'
    },
})