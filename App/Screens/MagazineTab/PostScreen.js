import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as magazineActions from '../../store/actions/magazine'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../../Styles/Colors';
import { set } from 'react-native-reanimated';
import Post from '../../components/Post';
import Time from '../../components/Time';

const PostScreen = (props) => {

    const post = props.route.params?.post


    // const listImages = post.images.map((item, index) => (
    //     {
    //         image: item,
    //         id: index.toString()
    //     }
    // ))

    const dispatch = useDispatch();
    const [change, setChange] = useState(0);    //this forces like icon to re render on each touch
    const [comment, setComment] = useState('');

    const reacts = useSelector(state => state.magazine.shopPostReacts);
    const comments = useSelector(state => state.magazine.shopPostComments);
    const userId = useSelector(state => state.auth.userId);

    const [iterLoading, setIterLoading] = useState(false);

    const [iter, setIter] = useState(0);

    const textInputRef = useRef(null);

    const loadUserPostComments = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(magazineActions.fetchUserPostComments(post.id, iter))
                // setIter(iter => iter + 1)
                setIterLoading(true)
            }

        }
        catch (err) {
            console.log(err)
        }
    }, [iterLoading, iter])

    const loadShopPostComments = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(magazineActions.fetchShopPostComments(post.id, iter))
                // setIter(iter => iter + 1)
                setIterLoading(false)

            }
        }
        catch (err) {
            console.log(err)
        }
    }, [iterLoading, iter])

    const loadMoreComments = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true)
                post.type === 'SHOP' ? await dispatch(magazineActions.fetchShopPostComments(post.id, iter)) : await dispatch(magazineActions.fetchUserPostComments(post.id, iter));
                setIter(iter => iter + 1)
                setIterLoading(false)

            }
        }
        catch (err) {
            console.log(err)
        }
    }, [iterLoading, iter])






    const commentUserPost = useCallback(async (comment) => {
        try {
            await dispatch(magazineActions.commentUserPost(post.id, comment))
            await dispatch(magazineActions.fetchUserPostComments(post.id, 0));
            setIter(0);
            post.numComments++;
            setChange(state => state + 1)



        }
        catch (err) {

            console.log(err);
        }
    })

    const deleteCommentUserPost = useCallback(async (commentId) => {
        try {

            Alert.alert('Delete Comment?', "Are you sure you want to delete this comment?", [
                {
                    text: "Delete",
                    onPress: async () => {
                        await dispatch(magazineActions.deleteCommentUserPost(commentId))
                        await dispatch(magazineActions.fetchUserPostComments(post.id, 0))   //improve this later
                        setIter(0);
                        post.numComments--;

                    }
                },
                {
                    text: 'Cancel',

                    style: 'cancel'
                }
            ])






        }
        catch (err) {

            console.log(err);
        }
    })

    const commentShopPost = useCallback(async (comment) => {
        try {
            await dispatch(magazineActions.commentShopPost(post.id, comment))
            await dispatch(magazineActions.fetchShopPostComments(post.id, 0))
            setIter(0);
            post.numComments++
            setChange(state => state + 1)



        }
        catch (err) {

            console.log(err);
        }
    })
    const deleteCommentShopPost = useCallback(async (commentId) => {
        try {

            Alert.alert('Delete Comment?', "Are you sure you want to delete this comment?", [
                {
                    text: "Delete",
                    onPress: async () => {
                        await dispatch(magazineActions.deleteCommentShopPost(commentId));
                        await dispatch(magazineActions.fetchShopPostComments(post.id, 0));
                        setIter(0);
                        post.numComments--;


                    }
                },
                {
                    text: 'Cancel',

                    style: 'cancel'
                }
            ])



        }
        catch (err) {

            console.log(err);
        }
    })

    useEffect(() => {
        post.type === 'SHOP' ? loadShopPostComments() : loadUserPostComments();

    }, [post])


    const renderComment = (itemData) => {

        return (

            <View style={styles.comment}>
                <View>
                    <View style={styles.commentUsernameContainer} >
                        <Text style={styles.commentUsername}>{itemData.item.username} .  </Text>
                        <Time value={itemData.item.date} />

                    </View>

                    <Text style={styles.commentText}>{itemData.item.comment}</Text>
                </View>

                {itemData.item.commenterId === userId ?
                    <TouchableOpacity onPress={() => {
                        post.type === 'SHOP' ? deleteCommentShopPost(itemData.item.id) : deleteCommentUserPost(itemData.item.id)
                    }}>
                        <Ionicons name="ios-trash" size={24} color="red" />

                    </TouchableOpacity> : null}


            </View>
        )
    }


    return (
        <View style={styles.screen}>



            <FlatList
                data={comments}
                renderItem={renderComment}
                ListHeaderComponent={
                    <>
                        <Post post={post} navigation={props.navigation} setChange={setChange} />
                        <Text style={styles.heading}>Comments</Text>
                    </>

                }

                style={styles.listStyle}
                onEndReached={() => {
                    loadMoreComments();
                }}
            />

            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment"
                    multiline
                    onChangeText={setComment}
                    ref={textInputRef}
                    onSubmitEditing={() => {
                        if (comment !== "") {
                            post.type === 'SHOP' ? commentShopPost(comment) : commentUserPost(comment)

                            textInputRef.current.clear();
                            setComment('');
                            setChange(state => state - 1)

                        }
                    }}

                />

                {comment !== '' ? <TouchableOpacity onPress={() => {
                    if (comment !== "") {
                        post.type === 'SHOP' ? commentShopPost(comment) : commentUserPost(comment)
                        textInputRef.current.clear();
                        setComment('');
                        setChange(state => state - 1)
                    }

                }}>
                    <Text>Send</Text>
                </TouchableOpacity> : null}


            </View>

        </View>

    )
}

export default PostScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    listStyle: {
        marginBottom: 60
    },
    post: {
        flexDirection: 'column',
        backgroundColor: 'white',
        marginVertical: 20,
        paddingVertical: 10

    },

    postImage: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
    },
    nameDP: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    nums: {
        width: '100%',
        alignItems: 'center'
    },
    DPImage:
    {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    nameContainer: {
        marginLeft: 10,
        flexDirection: "column"

    },
    Name:
    {
        fontWeight: '700',
        fontSize: 18
    },
    username: {
        fontSize: 15,
        color: 'grey'

    },
    Post:
    {
        paddingTop: 10,
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: 400,
        borderRadius: 30,
    },
    caption:
    {
        padding: 20,
        fontWeight: '600',
        width: '100%'
    },
    reactsCommentsContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,


    },
    Like:
    {
        paddingRight: 15,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    number: {
        fontSize: 15,
        fontWeight: '700',
        color: 'grey',
        marginLeft: 2

    },
    commentNum: {
        flexDirection: 'row',
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.primaryColor,
        marginLeft: 20

    },
    comment: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    commentUsernameContainer: {
        flexDirection: 'row'

    },
    commentUsername: {
        fontWeight: '700',
        fontSize: 15

    },
    commentDate: {
        fontWeight: '600',
        color: 'grey'

    },
    commentText: {
        fontSize: 18,
        marginLeft: 10

    },
    commentInputContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    commentInput: {
        flex: 1,
        backgroundColor: 'white',
        minHeight: 60,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})