import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as magazineActions from '../../store/actions/magazine'
import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteUserBlog } from '../../store/actions/profile';
import * as profileActions from '../../store/actions/profile'
import Time from '../../components/Time';

const BlogScreen = (props) => {


    const blogId = props.route.params?.blog.id;


    const images = props.route.params?.blog.images;
    const blog = props.route.params?.blog

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const comments = useSelector(state => state.magazine.shopPostComments)
    const userId = useSelector(state => state.auth.userId)

    const [iterLoading, setIterLoading] = useState(false);
    const [iter, setIter] = useState(0);



    const [change, setChange] = useState(0);    //this forces comments to re render on each touch
    // console.log(comments)
    const textInputRef = useRef(null);

    const loadUserBlogComments = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(magazineActions.fetchUserBlogComments(blogId, iter));
                setIter(iter => iter + 1);

                setIterLoading(false)
            }

        }
        catch (err) {

            setIterLoading(false)
            setIter(0)
            console.log(err)
        }
    }, [blogId, iterLoading, iter])

    // const loadMoreUserBlogComments = useCallback(async () => {
    //     try {
    //         if (!iterLoading) {
    //             setIterLoading(true)
    //             await dispatch(magazineActions.fetchUserBlogComments(blogId, iter));
    //             setIter(iter => iter + 1);
    //             setIterLoading(false)
    //         }

    //     }
    //     catch (err) {

    //         setIterLoading(false)
    //         setIter(0)
    //         console.log(err)
    //     }
    // }, [blogId, iter, iterLoading])



    const loadUserBlogReacts = useCallback(async () => {
        try {
            await dispatch(magazineActions.fetchUserBlogReacts(blogId))

        }
        catch (err) {
            console.log(err)
        }
    }, [blogId])

    const reactUserBlog = useCallback(async () => {
        try {
            await dispatch(magazineActions.reactUserBlog(blogId))

            setChange(state => state + 1)
        }
        catch (err) {

            console.log(err);
        }
    }, [blogId])
    const unReactUserBlog = useCallback(async () => {
        try {
            await dispatch(magazineActions.unReactUserBlog(blogId))

            setChange(state => state - 1)

        }
        catch (err) {

            console.log(err);
        }
    }, [blogId])

    const commentUserBlog = useCallback(async (comment) => {
        try {
            await dispatch(magazineActions.commentUserBlog(blogId, comment))
            await dispatch(magazineActions.fetchUserBlogComments(blogId, 0))
            setIter(0);

        }
        catch (err) {
            setIter(0);

            console.log(err);
        }
    }, [blogId])
    const deleteCommentUserBlog = useCallback(async (commentId) => {
        try {

            Alert.alert('Delete Comment?', "Are you sure you want to delete this Comment?", [
                {
                    text: "Delete",
                    onPress: async () => {
                        await dispatch(magazineActions.deleteCommentUserBlog(commentId))
                        await dispatch(magazineActions.fetchUserBlogComments(blog.id, 0));
                        setIter(0);
                    }
                },
                {
                    text: 'Cancel',

                    style: 'cancel'
                }
            ])


        }
        catch (err) {
            setIter(0);

            console.log(err);
        }
    })

    const deleteBlog = useCallback(async () => {
        try {

            Alert.alert('Delete Blog?', "Are you sure you want to delete this blog?", [
                {
                    text: "Delete",
                    onPress: async () => {
                        await dispatch(profileActions.deleteUserBlog(blogId))
                        await dispatch(profileActions.fetchMyBlogs())
                        props.navigation.goBack();

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
    }, [blogId])

    useEffect(() => {
        setIter(0);

        loadUserBlogComments(blogId);

    }, [blogId])




    const renderComment = (itemData) => {
        if (itemData.index === 0) {
            return (
                <View style={styles.blogBody}>
                    <Text style={styles.title}>{blog.title}</Text>
                    <Text style={styles.subtitle}>{blog.subtitle}</Text>

                    <TouchableOpacity onPress={() => props.navigation.push('OthersProfile', {
                        profileId: blog.userId
                    })}>
                        <View style={styles.nameDP}>

                            <Image style={styles.DPImage} source={blog.profilePic} />
                            <View style={styles.nameContainer}>
                                <Text style={styles.Name}> {blog.name} </Text>
                                <View style={styles.usernameDate}>
                                    <Text style={styles.username}> {blog.username} . </Text>
                                    <Time value={blog.date} />
                                </View>

                            </View>


                        </View>
                    </TouchableOpacity>


                    {/* <FlatList
                        data={images}
                        pagingEnabled={true}
                        horizontal={true}
                        renderItem={renderImage}
                    /> */}

                    <Image source={images[0]?.image} style={styles.image}
                        resizeMode="contain" />


                    <Text style={styles.text}>{blog.texts[0].text}</Text>

                    <Text style={styles.text}>{blog.texts[1].text}</Text>
                    <Text style={styles.text}>{blog.texts[2].text}</Text>

                    <View>


                        <View style={styles.reactsCommentsContainer}>
                            <TouchableOpacity style={styles.Like} onPress={async () => {


                                if (blog.hasReacted === 1) {
                                    //unlike
                                    await unReactUserBlog(blog.id)

                                    // flatListRef.current.recordInteraction()
                                    blog.hasReacted = 0;
                                    blog.numReacts -= 1;



                                }
                                else {
                                    reactUserBlog(blog.id)

                                    blog.hasReacted = 1;
                                    blog.numReacts += 1;




                                }
                            }}>


                                {blog.hasReacted === 1 ? <MaterialCommunityIcons name="heart-multiple" size={30} color='#E1306C' /> : <MaterialCommunityIcons name="heart-multiple-outline" size={30} color='black' />}

                                <Text style={styles.number}>{blog.numReacts}</Text>


                            </TouchableOpacity>




                            <View
                                style={styles.commentIcon}

                            >
                                <MaterialCommunityIcons name="comment-multiple" color="black" size={30} />
                                <Text style={styles.number}>{blog.numComments}</Text>
                            </View>



                        </View>



                        {blog.userId === userId ?
                            <TouchableOpacity onPress={() => {
                                deleteBlog(blog.id)
                            }}>
                                <Text style={styles.deleteText}>Delete Blog</Text>

                            </TouchableOpacity> : null}


                    </View>

                    <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment"
                            multiline
                            onChangeText={setComment}
                            ref={textInputRef}
                            onSubmitEditing={() => {
                                if (comment !== "") {
                                    commentUserBlog(comment)

                                    textInputRef.current.clear();
                                    setComment('');
                                    setChange(state => state - 1)

                                }
                            }}

                        />
                        {comment !== '' ? <TouchableOpacity onPress={() => {
                            if (comment !== "") {
                                commentUserBlog(comment)
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

        return (
            <View style={styles.comment}>
                <View>
                    <View style={styles.commentUsernameContainer} >
                        <Text style={styles.commentUsername}>{itemData.item.username} .  </Text>
                        <Text style={styles.commentDate}>{itemData.item.date}</Text>

                    </View>

                    <Text style={styles.commentText}>{itemData.item.comment}</Text>
                </View>

                {itemData.item.commenterId === userId ?
                    <TouchableOpacity onPress={() => {
                        deleteCommentUserBlog(itemData.item.id)
                    }}>
                        <Ionicons name="ios-trash" size={24} color="red" />

                    </TouchableOpacity> : null}

            </View>
        )


    }

    return (
        <View>
            <FlatList
                listKey={blogId + "2"}
                data={
                    [{ id: '1' }].concat(comments)
                }
                renderItem={renderComment}
                extraData={change}
                onEndReached={() => {
                    console.log(iter)
                    loadUserBlogComments();
                }
                }

            />

            <Text>{blog.text}</Text>

        </View>
    )
}

export default BlogScreen;

const styles = StyleSheet.create({

    blogBody: {
        backgroundColor: 'white',
        marginVertical: 20

    },
    title: {
        fontSize: 30,
        fontFamily: 'serif',
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20
    },
    subtitle: {
        fontSize: 20,
        color: 'grey',
        fontWeight: '500',
        textAlign: 'left',
        marginHorizontal: 10
    },
    nameDP: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginVertical: 20
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
    usernameDate: {
        flexDirection: 'row'
    },
    username: {
        fontSize: 15,
        color: 'grey'

    },

    image: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
    },
    text: {
        fontSize: 18,
        marginHorizontal: 10,
        marginVertical: 20
    },
    reactsCommentsContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 20


    },
    Like:
    {
        paddingRight: 15,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 70
    },
    number: {
        fontSize: 15,
        fontWeight: '700',
        color: 'grey',
        marginLeft: 2,
        flex: 1,


    },
    commentIcon: {
        flexDirection: 'row',
        width: 70,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    deleteText: {
        color: 'red',
        flex: 1,
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 15,



    },
    commentInputContainer: {
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
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
    },
    comment: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between'

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


})