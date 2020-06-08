import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as magazineActions from '../../store/actions/magazine'
import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteUserBlog } from '../../store/actions/profile';
import * as profileActions from '../../store/actions/profile'

const BlogScreen = (props) => {


    const blogId = props.route.params?.blog.id;


    const images = props.route.params?.blog.images;
    const numComments = props.route.params?.blog.numComments ?? 0
    const numReacts = props.route.params?.blog.numReacts ?? 0
    const blog = props.route.params?.blog

    const [error, setError] = useState('')


    const [showReacts, setShowReacts] = useState(false)
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const reacts = useSelector(state => state.magazine.shopPostReacts)
    const comments = useSelector(state => state.magazine.shopPostComments)
    const userId = useSelector(state => state.auth.userId)

    const [change, setChange] = useState(0);    //this forces comments to re render on each touch
    // console.log(comments)

    const loadUserBlogComments = useCallback(async (blogId) => {
        try {
            await dispatch(magazineActions.fetchUserBlogComments(blogId))
        }
        catch (err) {
            console.log(err)
        }
    }, [blogId])

    const loadUserBlogReacts = useCallback(async (blogId) => {
        try {
            await dispatch(magazineActions.fetchUserBlogReacts(blogId))

        }
        catch (err) {
            console.log(err)
        }
    })

    const reactUserBlog = useCallback(async (blogId) => {
        try {
            await dispatch(magazineActions.reactUserBlog(blogId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })
    const unReactUserBlog = useCallback(async (blogId) => {
        try {
            await dispatch(magazineActions.unReactUserBlog(blogId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })

    const commentUserBlog = useCallback(async (blogId, comment) => {
        try {
            await dispatch(magazineActions.commentUserBlog(blogId, comment))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })
    const deleteCommentUserBlog = useCallback(async (commentId, postId) => {
        try {
            await dispatch(magazineActions.deleteCommentUserBlog(commentId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })

    const deleteBlog = useCallback(async (blogId) => {
        try {
            await dispatch(profileActions.deleteUserBlog(blogId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })



    const renderImage = (itemData) => {
        // console.log(itemData.item.image)
        return (

            <Image source={itemData.item.image} style={styles.postImage}
                resizeMode="contain" />
        )
    }

    useEffect(() => {

        loadUserBlogComments(blogId);

    }, [blogId])

    const renderComment = (itemData) => {
        if (itemData.index === 0) {
            return (
                <>
                    <FlatList
                        data={images}
                        pagingEnabled={true}
                        horizontal={true}
                        renderItem={renderImage}
                    />

                    <FlatList data={blog.texts} renderItem={renderText} />



                    <View style={styles.nums}>
                        <TouchableOpacity onPress={() => {
                            loadUserBlogReacts(blogId);
                            setShowReacts(state => !state)
                            // console.log(postComments)
                        }}>
                            <Text>{numReacts} Reacts</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {

                            loadUserBlogComments(blogId)
                            setChange(state => state + 1)
                        }}>
                            <Text>{numComments} Comments</Text>
                        </TouchableOpacity>

                    </View>

                    {showReacts ? <FlatList listKey={blogId + "1"} data={reacts} renderItem={renderReact} ListEmptyComponent={() => (
                        <Text>no reacts</Text>
                    )} /> : null}
                </>
            )
        }

        if (itemData.index === comments.length + 1) {
            return (
                <View>
                    <View style={styles.LikeComment}>
                        <TouchableOpacity style={styles.Like} onPress={async () => {


                            if (blog.hasReacted === 1) {
                                //unlike
                                await unReactUserBlog(blog.id)
                                if (error === '') {


                                    // flatListRef.current.recordInteraction()
                                    blog.hasReacted = 0;
                                    blog.numReacts -= 1;
                                    setChange(state => state - 1)
                                }

                            }
                            else {
                                await reactUserBlog(blog.id)
                                if (error === '') {
                                    blog.hasReacted = 1;
                                    blog.numReacts += 1;
                                    setChange(state => state + 1)
                                }


                            }




                        }}>

                            {blog.hasReacted === 1 ? <AntDesign name="like1" size={40} color='black' /> : <AntDesign name="like2" size={40} color='black' />}

                        </TouchableOpacity>

                        <View style={styles.commentContainer}>
                            <TextInput placeholder="Comment" style={styles.Comment} onChangeText={setComment} />
                            <TouchableOpacity style={styles.sendComment}
                                onPress={() => {
                                    comment !== '' ?
                                        commentUserBlog(blog.id, comment) : null;
                                    setChange(state => state + 1)

                                }}

                            >
                                <Ionicons name="md-send" size={30} />
                            </TouchableOpacity>
                        </View>




                    </View>
                    {blog.userId === userId ? <Button title="delete blog" onPress={() => {
                        console.log(blog.id)

                        deleteBlog(blog.id)


                    }} /> : null}
                </View>
            )
        }

        return (
            <View style={styles.comment}>
                <Text>{itemData.item.username}:  </Text>
                <Text>{itemData.item.comment}</Text>
                {itemData.item.commenterId === userId ?
                    (
                        <TouchableOpacity
                            onPress={() => {
                                deleteCommentUserBlog(itemData.item.id)
                                setChange(state => state + 1)

                            }}
                            style={styles.commentX}

                        >
                            <Text>X</Text>
                        </TouchableOpacity>
                    ) : null}
            </View>
        )


    }

    const renderReact = (itemData) => {
        return (
            <Text>{itemData.item.username}:   {itemData.item.type}</Text>
        )
    }

    const renderText = (itemData) => {
        return (
            <View>
                <Text>Text {itemData.index} </Text>
                <Text>{itemData.item.text}</Text>
            </View>


        )
    }


    return (
        <View>
            <FlatList
                listKey={blogId + "2"}
                data={
                    [{ id: '1' }].concat(comments).concat([{ id: 'LAST' }])
                }
                renderItem={renderComment}
                extraData={change}
            />

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
    LikeComment:
    {
        paddingTop: 15,
        flexDirection: 'row'
    },
    Like:
    {
        paddingRight: 15,
        paddingLeft: 10,
        flex: 1
    },
    Comment:
    {
        flex: 3,
        paddingLeft: 5,
        height: 40,
        borderColor: 'black',
        backgroundColor: 'grey'
    },
    comment: {
        flexDirection: 'row',
        height: 100,
        margin: 10
    },
    commentX: {
        marginLeft: 30
    },

    commentContainer: {
        flexDirection: 'row',
        flex: 1
    },
    sendComment: {
        marginLeft: 3
    }
})