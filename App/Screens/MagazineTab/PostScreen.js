import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as magazineActions from '../../store/actions/magazine'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../Styles/Colors';

const PostScreen = (props) => {

    const post = props.route.params?.post
    const type = props.route.params?.type   //either SHOP or CUSTOMER

    // const listImages = post.images.map((item, index) => (
    //     {
    //         image: item,
    //         id: index.toString()
    //     }
    // ))


    const [showReacts, setShowReacts] = useState(false)
    const dispatch = useDispatch();
    const [error, setError] = useState('')
    const [change, setChange] = useState(0);    //this forces like icon to re render on each touch
    const [comment, setComment] = useState('');

    const reacts = useSelector(state => state.magazine.shopPostReacts)
    const comments = useSelector(state => state.magazine.shopPostComments)

    const textInputRef = useRef(null);

    const loadUserPostComments = useCallback(async () => {
        try {
            await dispatch(magazineActions.fetchUserPostComments(post.id))
        }
        catch (err) {
            console.log(err)
        }
    })

    const loadShopPostComments = useCallback(async () => {
        try {
            await dispatch(magazineActions.fetchShopPostComments(post.id))
        }
        catch (err) {
            console.log(err)
        }
    })
    // const loadUserPostReacts = useCallback(async (postId) => {
    //     try {
    //         await dispatch(magazineActions.fetchUserPostReacts(postId))

    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // })



    const renderImage = (itemData) => {
        // console.log(post.image.image)
        return (



            <Image source={itemData.item.image} style={styles.postImage}
                resizeMode="contain" />





        )
    }

    const reactShopPost = useCallback(async (postId) => {
        try {
            await dispatch(magazineActions.reactShopPost(postId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })
    const unReactShopPost = useCallback(async (postId) => {
        try {
            await dispatch(magazineActions.unReactShopPost(postId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })

    const commentUserPost = useCallback(async (comment) => {
        try {
            await dispatch(magazineActions.commentUserPost(post.id, comment))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })

    const commentShopPost = useCallback(async (comment) => {
        try {
            await dispatch(magazineActions.commentShopPost(post.id, comment))
            await dispatch(magazineActions.fetchShopPostComments())

            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })

    useEffect(() => {
        type === 'SHOP' ? loadShopPostComments(post.id) : loadUserPostComments(post.id);

    }, [])

    const renderComment = (itemData) => {

        return (
            <View style={styles.comment}>
                <View style={styles.commentUsernameContainer} >
                    <Text style={styles.commentUsername}>{itemData.item.username} .  </Text>
                    <Text style={styles.commentDate}>{itemData.item.date}</Text>

                </View>

                <Text style={styles.commentText}>{itemData.item.comment}</Text>
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
                        <View style={styles.post}>

                            <TouchableOpacity onPress={() => props.navigation.navigate('Seller', {  //change this destination by checking on type 
                                shopId: post.shopId
                            })}>
                                <View style={styles.nameDP}>

                                    <Image style={styles.DPImage} source={post.logo} />
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.Name}> {post.name} </Text>
                                        <Text style={styles.username}> {post.username} . {post.postDate} </Text>
                                    </View>


                                </View>
                            </TouchableOpacity>

                            <FlatList data={post.images} pagingEnabled={true} horizontal={true} renderItem={renderImage} />
                            <Text>{post.captions}</Text>
                            <View style={styles.reactsCommentsContainer}>
                                <TouchableOpacity style={styles.Like} onPress={async () => {


                                    if (post.hasReacted === 1) {
                                        //unlike
                                        await unReactShopPost(post.id)
                                        if (error === '') {
                                            console.log(post.id)

                                            // flatListRef.current.recordInteraction()
                                            post.hasReacted = 0;
                                            post.numReacts -= 1;
                                            setChange(state => state - 1)
                                        }

                                    }
                                    else {
                                        await reactShopPost(post.id)
                                        if (error === '') {
                                            post.hasReacted = 1;
                                            post.numReacts += 1;
                                            setChange(state => state + 1)
                                        }


                                    }
                                }}>


                                    {post.hasReacted === 1 ? <MaterialCommunityIcons name="heart-multiple" size={30} color='#E1306C' /> : <MaterialCommunityIcons name="heart-multiple-outline" size={30} color='black' />}

                                    <Text style={styles.number}>{post.numReacts}</Text>


                                </TouchableOpacity>

                                <View style={styles.commentNum}>
                                    <MaterialCommunityIcons name="comment-multiple" color="black" size={30} />
                                    <Text style={styles.number}>{post.numComments}</Text>
                                </View>

                                {/* </TouchableOpacity> */}

                            </View>



                        </View>
                        <Text style={styles.heading}>Comments</Text>
                    </>

                }

                style={styles.listStyle}
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
                            commentShopPost(comment);
                            textInputRef.current.clear();
                            setComment('');
                            setChange(state => state - 1)

                        }
                    }}

                />

                {comment !== '' ? <TouchableOpacity onPress={() => {
                    if (comment !== "") {
                        commentShopPost(comment);
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
        paddingVertical: 20,
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
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 5

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