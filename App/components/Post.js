import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';

import * as magazineActions from '../store/actions/magazine'
import * as profileActions from '../store/actions/profile'
import * as popupActions from '../store/actions/Popup'
import Modal from 'react-native-modal';





const Post = (props) => {

    //props =  navigation,

    // props = post = {
    //     type, profileId (for both profiles and shops), logo, name, username, date, productId
    // }, navigation, reactShopPost, reactUserPost, unReactShopPost, unReactUserPost, setChange
    const post = props.post;
    const logo = props.logo;
    const setChange = props.setChange;
    const userId = useSelector(state => state.auth.userId);

    const [error, setError] = useState('');
    const [optionsVisible, setOptionsVisible] = useState(false);





    const dispatch = useDispatch();

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

    const reactUserPost = useCallback(async (postId) => {
        try {
            await dispatch(magazineActions.reactUserPost(postId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })
    const unReactUserPost = useCallback(async (postId) => {
        try {
            await dispatch(magazineActions.unReactUserPost(postId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })

    const deleteUserPost = useCallback(async () => {
        try {
            Alert.alert('Delete Post?', "Are you sure you want to delete this post?", [
                {
                    text: "Delete",
                    onPress: async () => {
                        await dispatch(profileActions.deleteUserPost(post.id))
                        dispatch(popupActions.setMessage('post deleted!', false))
                        setError('')

                    }
                },
                {
                    text: "Cancel",
                    style: 'cancel'
                }
            ])


        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    }, [post])

    const renderImage = (itemData) => {


        return (

            <Image source={itemData.item.image} style={styles.postImage} resizeMode="contain" />

        )

    }


    return (
        <View style={styles.gridItem} >

            <Modal
                isVisible={optionsVisible}
                onBackButtonPress={() => setOptionsVisible(false)}
                onBackdropPress={() => setOptionsVisible(false)}
                style={styles.modal}

            >
                <View style={styles.optionsModal}>
                    <Text style={styles.modalTitle}> Post Options</Text>

                    <TouchableOpacity style={styles.optionsButton} onPress={() => {
                        deleteUserPost()
                    }}>
                        <Text style={styles.buttonText}>Delete Post</Text>

                    </TouchableOpacity>



                </View>

            </Modal>




            <View style={styles.postHeader} >
                <TouchableOpacity
                    style={styles.nameDP}
                    onPress={() => {
                        post.type === 'SHOP' ?
                            props.navigation.navigate('Seller', {
                                shopId: post.shopId
                            }) :
                            props.navigation.navigate('OthersProfile', {
                                profileId: post.userId
                            })

                    }}
                >


                    <Image style={styles.DPImage} source={post?.logo ?? logo} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.Name}> {post.name} </Text>
                        <Text style={styles.username}> {post.username} . {post.date} </Text>
                    </View>





                </TouchableOpacity>
                {post.userId === userId ?
                    <TouchableOpacity onPress={() => setOptionsVisible(true)}>
                        <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                    </TouchableOpacity>

                    : null}

            </View>




            <TouchableOpacity style={styles.Post} onPress={() => {
                post.productId ? props.navigation.navigate('Product', {
                    productId: post.productId
                }) :

                    props.navigation.navigate('Post', {
                        post: {
                            ...post,
                            logo: post.logo ?? logo
                        }

                    })



                return null;

            }}>

                <FlatList horizontal={true} pagingEnabled={true} data={post.images} renderItem={renderImage} />
                {/* <Image  source={require('../../assets/Images/suit.png')} style={styles.PostImage}/>  */}
                <Text style={styles.caption}>   {post.text}</Text>

            </TouchableOpacity>

            <View style={styles.reactsCommentsContainer}>
                <TouchableOpacity style={styles.Like} onPress={async () => {


                    if (post.hasReacted === 1) {
                        //unlike
                        post.type === 'SHOP' ? await unReactShopPost(post.id) : await unReactUserPost(post.id)

                        if (error === '') {

                            // flatListRef.current.recordInteraction()
                            post.hasReacted = 0;
                            post.numReacts -= 1;
                            setChange(state => state - 1)
                        }

                    }
                    else {
                        post.type === 'SHOP' ? await reactShopPost(post.id) : reactUserPost(post.id)
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




                <TouchableOpacity
                    style={styles.comment}
                    onPress={() => {
                        props.navigation.navigate('Post', {
                            post: {
                                ...post,
                                logo: post?.logo ?? logo
                            }
                        })


                    }}
                >
                    <MaterialCommunityIcons name="comment-multiple" color="black" size={30} />
                    <Text style={styles.number}>{post.numComments}</Text>
                </TouchableOpacity>



            </View>
        </View>
    )
}

export default Post;

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsModal: {
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'white'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        top: 10

    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center'
    },
    optionsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '100%',
        borderWidth: 2,
        borderColor: 'black'
    },
    gridItem: {
        // flex: 1,
        padding: 10,
        marginVertical: 10,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    nameDP: {
        flexDirection: 'row',
        paddingHorizontal: 10,

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
        // height: 400,
        borderRadius: 30,
    },

    postImage:
    {
        // maxHeight: '100%',
        // maxWidth: Dimensions.get('window').width,
        // alignSelf: 'center'
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        // flex: 7,
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
    comment: {
        flexDirection: 'row',
        width: 70,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

});