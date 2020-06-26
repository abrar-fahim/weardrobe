import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as magazineActions from '../../store/actions/magazine'

const PostScreen = (props) => {


    const postId = props.route.params?.postId;

    const images = props.route.params?.images;
    const numComments = props.route.params?.numComments ?? 0
    const numReacts = props.route.params?.numReacts ?? 0
    const post = props.route.params?.post



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

    const loadUserPostComments = useCallback(async (postId) => {
        try {
            await dispatch(magazineActions.fetchUserPostComments(postId))
        }
        catch (err) {
            console.log(err)
        }
    })

    const loadUserPostReacts = useCallback(async (postId) => {
        try {
            await dispatch(magazineActions.fetchUserPostReacts(postId))

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
        loadUserPostComments(postId);

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
            <Text>{post.captions}</Text>

            <View style={styles.nums}>
                <TouchableOpacity onPress={() => {
                    loadUserPostReacts(postId);
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

            {showReacts ? <FlatList listKey={postId + "1"} data={reacts} renderItem={renderReact} /> : null}

            <FlatList listKey={postId + "2"} data={comments} renderItem={renderComment} />

        </View>
    )
}

export default PostScreen;

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