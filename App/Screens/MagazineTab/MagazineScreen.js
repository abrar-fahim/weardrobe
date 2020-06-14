import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { FEEDITEMS } from '../../dummy-data/Feed'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import NewPostChooseLayout from './NewPostChooseLayoutScreen';
import NewPostButton from '../../components/NewPostButton';
import NewPostScreen2 from './NewPostScreen2';
import NewPostScreen3 from './NewPostScreen3';
import NewPostTagScreen from './NewPostTagScreen';
import NewPostNextButton from '../../components/NewPostNextButton';
import ProfileStackScreen, { ProfileTabsScreen } from '../ProfileTab/ProfileScreen';
import GenericHeaderButton from '../../components/GenericHeaderButton';
import Colors from '../../Styles/Colors'
import HeaderOptions from '../../Styles/HeaderOptions'
import ScreenStyle from '../../Styles/ScreenStyle';
import { useDispatch, useSelector } from 'react-redux';

import * as magazineActions from '../../store/actions/magazine'
import LoadingScreen from '../../components/LoadingScreen'
import SellerScreen from '../ShopTab/SellerScreen';



export function MagazineScreen(props) {

    const flatListRef = useRef(null);

    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.userId)

    const shopPosts = useSelector(state => state.magazine.shopPosts)
    const friendPosts = useSelector(state => state.magazine.friendPosts)

    const myShops = useSelector(state => state.shops.myShops)

    const shopPostComments = useSelector(state => state.magazine.shopPostComments);
    const shopPostReacts = useSelector(state => state.magazine.shopPostReacts);

    const [isLoading, setIsLoading] = useState(true);

    const [showComments, setShowComments] = useState(false)

    const [showReacts, setShowReacts] = useState(false)

    const [error, setError] = useState('')

    const [comment, setComment] = useState('');

    const [change, setChange] = useState(0);    //this forces like icon to re render on each touch

    const [iters, setIters] = useState({
        shopPostComments: 1
    })

    const loadPosts = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(magazineActions.fetchShopPosts())
            await dispatch(magazineActions.fetchFriendsPosts())
            setIsLoading(false)

        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [])

    const loadShopPostComments = useCallback(async (postId, iter) => {
        try {
            await dispatch(magazineActions.fetchShopPostComments(postId, iter))
        }
        catch (err) {
            console.log(err)
        }
    })
    const loadUserPostComments = useCallback(async (postId, iter) => {
        try {
            await dispatch(magazineActions.fetchUserPostComments(postId, iter))
        }
        catch (err) {
            console.log(err)
        }
    })

    const loadShopPostReacts = useCallback(async (postId) => {
        try {
            await dispatch(magazineActions.fetchShopPostReacts(postId))

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

    const commentShopPost = useCallback(async (postId, comment) => {
        try {
            await dispatch(magazineActions.commentShopPost(postId, comment))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })
    const deleteCommentShopPost = useCallback(async (commentId, postId) => {
        try {
            await dispatch(magazineActions.deleteCommentShopPost(commentId, postId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })

    const commentUserPost = useCallback(async (postId, comment) => {
        try {
            await dispatch(magazineActions.commentUserPost(postId, comment))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })
    const deleteCommentUserPost = useCallback(async (commentId, postId) => {
        try {
            await dispatch(magazineActions.deleteCommentUserPost(commentId, postId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
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


    useEffect(() => {
        loadPosts();
    }, [myShops])
    
    const renderImages = (itemData) => {


        return (

            <Image source={itemData.item.image} style={styles.postImage} resizeMode="contain" />

        )

    }

    const renderComment = (itemData) => {

        return (
            <View style={styles.comment}>
                <Text>{itemData.item.username}:  </Text>
                <Text>{itemData.item.comment}</Text>
                {itemData.item.commenterId === userId ?
                    (
                        <TouchableOpacity
                            onPress={() => {
                                deleteCommentShopPost(itemData.item.id, itemData.item.postId)
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

    const renderUserPostComment = (itemData) => {

        return (
            <View style={styles.comment}>
                <Text>{itemData.item.username}:  </Text>
                <Text>{itemData.item.comment}</Text>
                {itemData.item.commenterId === userId ?
                    (
                        <TouchableOpacity
                            onPress={() => {
                                deleteCommentUserPost(itemData.item.id, itemData.item.postId)
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

    const renderFeedItem = (itemData) => {
        if (itemData.index === 0) {
            return (
                <FlatList
                    listKey="a"
                    extraData={change}
                    ref={flatListRef}
                    viewabilityConfig={{
                        waitForInteraction: false,
                        viewAreaCoveragePercentThreshold: 95
                    }}
                    data={friendPosts}
                    renderItem={renderFriendPost}
                />
            )


        }
        return (
            <View style={styles.gridItem} >
                <View style={styles.nameDP}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Seller', {
                        shopId: itemData.item.shopId
                    })}>
                        <View style={styles.nameDP2}>
                            <View style={styles.DP}>
                                <Image style={styles.DPImage} source={itemData.item.logo} />
                            </View>
                            <Text style={styles.Name}> {itemData.item.name} </Text>
                            <Text style={styles.Name}> {itemData.item.username} </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.Post}>
                    <View style={styles.Post2}>
                        <FlatList horizontal={true} pagingEnabled={true} data={itemData.item.images} renderItem={renderImages} />
                        {/* <Image  source={require('../../assets/Images/suit.png')} style={styles.PostImage}/>  */}
                        <Text style={styles.Caption} >   {itemData.item.text}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.nums}>
                    <TouchableOpacity onPress={() => {
                        loadShopPostReacts(itemData.item.id);
                        setShowReacts(state => !state)
                        // console.log(postComments)
                    }}>
                        <Text>{itemData.item.numReacts} Reacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        loadShopPostComments(itemData.item.id, 0);
                        setShowComments(state => !state)
                        setIters(iters => ({
                            ...iters,
                            shopPostComments: 1
                        }))
                        console.log(iters.shopPostComments)
                    }}>
                        <Text>{itemData.item.numComments} Comments</Text>
                    </TouchableOpacity>

                </View>

                {showReacts ? <FlatList listKey={itemData.item.id + "1"} data={shopPostReacts[0]?.postId === itemData.item.id ? shopPostReacts : []} renderItem={renderReact} /> : null}

                {showComments ? <FlatList listKey={itemData.item.id + "2"} data={shopPostComments[0]?.postId === itemData.item.id ? shopPostComments : []} renderItem={renderComment}
                    onEndReached={() => {
                        loadShopPostComments(itemData.item.id, iters.shopPostComments)
                        setIters(iters => ({
                            ...iters,
                            shopPostComments: iters.shopPostComments + 1
                        }))
                    }} /> : null}





                <View style={styles.LikeComment}>
                    <TouchableOpacity style={styles.Like} onPress={async () => {


                        if (itemData.item.hasReacted === 1) {
                            //unlike
                            await unReactShopPost(itemData.item.id)
                            if (error === '') {
                                console.log(itemData.item.id)

                                // flatListRef.current.recordInteraction()
                                itemData.item.hasReacted = 0;
                                itemData.item.numReacts -= 1;
                                setChange(state => state - 1)
                            }

                        }
                        else {
                            await reactShopPost(itemData.item.id)
                            if (error === '') {
                                itemData.item.hasReacted = 1;
                                itemData.item.numReacts += 1;
                                setChange(state => state + 1)
                            }


                        }




                    }}>

                        {itemData.item.hasReacted === 1 ? <AntDesign name="like1" size={40} color='black' /> : <AntDesign name="like2" size={40} color='black' />}

                    </TouchableOpacity>

                    <View style={styles.commentContainer}>
                        <TextInput placeholder="Comment" style={styles.Comment} onChangeText={setComment} />
                        <TouchableOpacity style={styles.sendComment}
                            onPress={() => {
                                comment !== '' ?
                                    commentShopPost(itemData.item.id, comment) : null;
                                setChange(state => state + 1)

                            }}

                        >
                            <Ionicons name="md-send" size={30} />
                        </TouchableOpacity>
                    </View>


                </View>


            </View>

        )
    }

    const renderFriendPost = useCallback((itemData) => {
        return (
            <View style={styles.gridItem} >
                <View style={styles.nameDP}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('OthersProfile', {
                        profileId: itemData.item.posterId
                    })}>
                        <View style={styles.nameDP2}>
                            <View style={styles.DP}>
                                <Image style={styles.DPImage} source={itemData.item.dp} />
                            </View>
                            <Text style={styles.Name}> {itemData.item.username} </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.Post}>
                    <View style={styles.Post2}>
                        <FlatList horizontal={true} pagingEnabled={true} data={itemData.item.images} renderItem={renderImages} />
                        {/* <Image  source={require('../../assets/Images/suit.png')} style={styles.PostImage}/>  */}
                        <Text style={styles.Caption} >   {itemData.item.text}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.nums}>
                    <TouchableOpacity onPress={() => {
                        loadUserPostReacts(itemData.item.id);
                        setShowReacts(state => !state)
                        // console.log(postComments)
                    }}>
                        <Text>{itemData.item.numReacts} Reacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        loadUserPostComments(itemData.item.id, 0);
                        setShowComments(state => !state)
                        setIters(iters => ({
                            ...iters,
                            shopPostComments: 1
                        }))
                        console.log(iters.shopPostComments)
                    }}>
                        <Text>{itemData.item.numComments} Comments</Text>
                    </TouchableOpacity>

                </View>

                {showReacts ? <FlatList listKey={itemData.item.id + "1"} data={shopPostReacts[0]?.postId === itemData.item.id ? shopPostReacts : []} renderItem={renderReact} /> : null}

                {showComments ? <FlatList listKey={itemData.item.id + "2"} data={shopPostComments[0]?.postId === itemData.item.id ? shopPostComments : []} renderItem={renderUserPostComment}
                    onEndReached={() => {
                        loadUserPostComments(itemData.item.id, iters.shopPostComments)
                        setIters(iters => ({
                            ...iters,
                            shopPostComments: iters.shopPostComments + 1
                        }))
                    }} /> : null}





                <View style={styles.LikeComment}>
                    <TouchableOpacity style={styles.Like} onPress={async () => {


                        if (itemData.item.hasReacted === 1) {
                            //unlike
                            await unReactUserPost(itemData.item.id)
                            if (error === '') {
                                console.log(itemData.item.id)

                                // flatListRef.current.recordInteraction()
                                itemData.item.hasReacted = 0;
                                itemData.item.numReacts -= 1;
                                setChange(state => state - 1)
                            }

                        }
                        else {
                            await reactUserPost(itemData.item.id)
                            if (error === '') {
                                itemData.item.hasReacted = 1;
                                itemData.item.numReacts += 1;
                                setChange(state => state + 1)
                            }


                        }




                    }}>

                        {itemData.item.hasReacted === 1 ? <AntDesign name="like1" size={40} color='black' /> : <AntDesign name="like2" size={40} color='black' />}

                    </TouchableOpacity>

                    <View style={styles.commentContainer}>
                        <TextInput placeholder="Comment" style={styles.Comment} onChangeText={setComment} />
                        <TouchableOpacity style={styles.sendComment}
                            onPress={() => {
                                comment !== '' ?
                                    commentUserPost(itemData.item.id, comment) : null;
                                setChange(state => state + 1)

                            }}

                        >
                            <Ionicons name="md-send" size={30} />
                        </TouchableOpacity>
                    </View>


                </View>


            </View>

        )
    })


    if (isLoading) {
        return <LoadingScreen />
    }
    return (
        <View style={ScreenStyle}>



            <FlatList
                listKey="b"
                extraData={change}
                ref={flatListRef}
                viewabilityConfig={{
                    waitForInteraction: false,
                    viewAreaCoveragePercentThreshold: 95
                }}
                data={[{ id: '1' }].concat(shopPosts)}
                renderItem={renderFeedItem}

            />

        </View>
    );

}

export default function MagazineStackScreen({ navigation }) {
    const MagazineStack = createStackNavigator();
    return (
        <MagazineStack.Navigator
            screenOptions={{
                ...HeaderOptions
            }}
        >
            <MagazineStack.Screen name="Magazine" component={MagazineScreen} options={{

                headerRight: () => (< NewPostButton onPress={() => navigation.navigate('NewPostChooseLayout')} />)
            }} />
            <MagazineStack.Screen name="NewPostChooseLayout" component={NewPostChooseLayout} options={{

            }} />
            <MagazineStack.Screen name="NewPost2" component={NewPostScreen2} options={{
                headerRight: () => (<NewPostNextButton onPress={() => navigation.navigate('NewPost3')} />),

            }} />
            <MagazineStack.Screen name="NewPost3" component={NewPostScreen3} />
            <MagazineStack.Screen name="NewPostTag" component={NewPostTagScreen} />
            <MagazineStack.Screen name="Seller" component={SellerScreen} />
            <MagazineStack.Screen name="OthersProfile" component={ProfileStackScreen} options={{
                headerShown: false
            }} />

        </MagazineStack.Navigator>

    )
}


const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        padding: 10,
        margin: 0,
        width: '100%',
        flexDirection: 'column'
    },
    nameDP: {
        paddingLeft: 5
    },
    nameDP2:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    DP:
    {
        borderRadius: 25,
        overflow: 'hidden'
    },
    DPImage:
    {
        width: 40,
        height: 40
    },
    Name:
    {
        fontWeight: 'bold',
        fontSize: 20
    },
    Post:
    {
        paddingTop: 10
    },
    Post2:
    {
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: 400,
        borderRadius: 30,
        // overflow: 'hidden'
    },
    postImage:
    {
        height: '100%',
        width: Dimensions.get('window').width,
        alignSelf: 'center'
        // flex: 7,
    },
    Caption:
    {
        paddingTop: 10,
        borderLeftColor: 'black',
        fontWeight: 'bold',
        backgroundColor: 'grey',
        height: 50,
        width: '100%'
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

});