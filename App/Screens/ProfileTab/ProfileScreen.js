import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as magazineActions from '../../store/actions/magazine'
import LoadingScreen from '../../components/LoadingScreen'

import { useSelector, useDispatch } from 'react-redux';

import BlogListScreen from './BlogListScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import GenericHeaderButton from '../../components/GenericHeaderButton'
import ProfileSettingsScreen from './ProfileSettingsScreen';
import FollowersListTabScreen from './FollowersListScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CreateBlogScreen1 from './CreateBlogScreen1';
import CreateBlogScreen2 from './CreateBlogScreen2';
import CreateBlogScreen3 from './CreateBlogScreen3';
import BlogScreen from './BlogScreen';
import HeaderOptions from '../../Styles/HeaderOptions';
import ScreenStyle from '../../Styles/ScreenStyle'
import Colors from '../../Styles/Colors';

import * as authActions from '../../store/actions/auth'
import * as profileActions from '../../store/actions/profile'
import checkLoggedIn from '../../components/CheckLoggedIn'
import AuthRequiredScreen from '../AuthRequiredScreen'
import PostScreen from './PostScreen';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DpUploadScreen from './DpUploadScreen';



//THIS COMMENTED VERSION IS INSTA STYLE GRID


// export function ProfileScreen(props) {

//     const profileId = props.route.params?.profileId

//     const userId = useSelector(state => state.auth.userId)

//     const myProfile = userId === profileId || profileId === undefined//secure this check using backend auth in production

//     const [comment, setComment] = useState('');

//     const [change, setChange] = useState(0);    //this forces like icon to re render on each touch

//     const [iters, setIters] = useState({
//         shopPostComments: 1
//     })

//     const loadUserPosts = useCallback(async (userId) => {
//         try {
//             await dispatch(profileActions.fetchUserPosts(userId))
//         }
//         catch (err) {
//             console.log(err)

//         }
//     }, [])

//     const posts = useSelector(state => state.profile.posts)
//     const dispatch = useDispatch()
//     const loadMyPosts = useCallback(async () => {
//         try {
//             await dispatch(profileActions.fetchMyPosts())
//         }
//         catch (err) {
//             console.log(err)

//         }
//     }, [])

//     useEffect(() => {
//         myProfile ? loadMyPosts() : loadUserPosts(profileId)
//     }, [])

//     const renderMyPosts = (itemData) => {
//         return (
//             <TouchableOpacity onPress={() => {
//                 props.navigation.navigate('Post', {
//                     postId: itemData.item.id,
//                     images: itemData.item.images,
//                     numReacts: itemData.item.numReacts,
//                     numComments: itemData.item.numComments,
//                     post: itemData.item
//                 })
//             }}>
//                 <View style={styles.postGridItem}>

//                     <Image source={itemData.item.images[0]?.image} style={styles.postImage} />
//                     <View style={styles.LikeComment}>
//                         <TouchableOpacity style={styles.Like} onPress={async () => {


//                             if (itemData.item.hasReacted === 1) {
//                                 //unlike
//                                 await unReactShopPost(itemData.item.id)
//                                 if (error === '') {
//                                     console.log(itemData.item.id)

//                                     // flatListRef.current.recordInteraction()
//                                     itemData.item.hasReacted = 0;
//                                     itemData.item.numReacts -= 1;
//                                     setChange(state => state - 1)
//                                 }

//                             }
//                             else {
//                                 await reactShopPost(itemData.item.id)
//                                 if (error === '') {
//                                     itemData.item.hasReacted = 1;
//                                     itemData.item.numReacts += 1;
//                                     setChange(state => state + 1)
//                                 }


//                             }




//                         }}>

//                             {itemData.item.hasReacted === 1 ? <AntDesign name="like1" size={40} color='black' /> : <AntDesign name="like2" size={40} color='black' />}

//                         </TouchableOpacity>

//                         <View style={styles.commentContainer}>
//                             <TextInput placeholder="Comment" style={styles.Comment} onChangeText={setComment} />
//                             <TouchableOpacity style={styles.sendComment}
//                                 onPress={() => {
//                                     comment !== '' ?
//                                         commentShopPost(itemData.item.id, comment) : null;
//                                     setChange(state => state + 1)

//                                 }}

//                             >
//                                 <Ionicons name="md-send" size={30} />
//                             </TouchableOpacity>
//                         </View>


//                     </View>




//                 </View>
//             </TouchableOpacity>


//         )
//     }

//     if (posts.length === 0) {
//         return (
//             <Text>no posts yet!</Text>
//         )


//     }
//     return (
//         <View style={ScreenStyle}>
//             <FlatList data={posts} renderItem={renderMyPosts} numColumns={3} />



//         </View>
//     );

// }




//this is both my profile and others profile

export function ProfileScreen(props) {
    const profileId = props.route.params?.profileId

    const dispatch = useDispatch();

    const myProfile = userId === profileId || profileId === undefined//secure this check using backend auth in production

    const userId = useSelector(state => state.auth.userId)
    const posts = useSelector(state => state.profile.posts)
    const myPosts = useSelector(state => state.profile.myPosts)


    const shopPostComments = useSelector(state => state.magazine.shopPostComments);
    const shopPostReacts = useSelector(state => state.magazine.shopPostReacts);


    const numFollowers = myProfile ? useSelector(state => state.profile.myNumFollowers) : useSelector(state => state.profile.numFollowers)
    const numFollowing = myProfile ? useSelector(state => state.profile.myNumFollowing) : useSelector(state => state.profile.numFollowing)
    const numFollowingShop = myProfile ? useSelector(state => state.profile.myNumFollowingShop) : useSelector(state => state.profile.numFollowingShop)
    const profile = myProfile ? useSelector(state => state.profile.myProfile) : useSelector(state => state.profile.otherProfile)

    const flatListRef = useRef(null);





    const [isLoading, setIsLoading] = useState(true);

    const [showComments, setShowComments] = useState(false)

    const [showReacts, setShowReacts] = useState(false)

    const [error, setError] = useState('')

    const [comment, setComment] = useState('');

    const [change, setChange] = useState(0);    //this forces like icon to re render on each touch

    const [iters, setIters] = useState({
        shopPostComments: 1
    })




    const followUser = useCallback(async (userId) => {
        try {
            await dispatch(profileActions.followUser(userId))

        }
        catch (err) {

            console.log(err);
        }
    })

    const getFollowCounts = useCallback(async () => {
        // const id = myProfile? userId: profileId
        try {
            myProfile ? await dispatch(profileActions.getMyFollowCounts(userId)) : await dispatch(profileActions.getFollowCounts(profileId))
            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    })

    const getProfile = useCallback(async () => {
        console.log('myProfile: ' + myProfile)
        try {
            myProfile ? await dispatch(profileActions.getMyProfile(userId, [
                "firstName", "lastName", "email", "phoneNumber", "birthday", "profilePic", "bio", "privacyType", "points", "type"
            ])) : await dispatch(profileActions.getProfile(profileId, [
                "firstName", "lastName", "email", "phoneNumber", "birthday", "profilePic", "bio", "privacyType", "points", "type"
            ]))

            console.log(profile.firstName)

            // setError('')
        }
        catch (err) {
            // setError(err.message)
            console.log(err);
        }
    }, [myProfile, profileId])



    const logoutHandler = async () => {
        try {
            await dispatch(authActions.logout())
        } catch (err) {
            console.log('error while logging out')
        }
    }




    useEffect(() => {
        getFollowCounts()
        getProfile();

    }, [])

    useEffect(() => {
        myProfile ? loadMyPosts() : loadPosts(profileId);
    }, [profileId])


    const loadMyPosts = useCallback(async () => {
        try {
            setIsLoading(true);
            await dispatch(profileActions.fetchMyPosts())
            setIsLoading(false);
        }
        catch (err) {
            setIsLoading(false);
            console.log(err)

        }
    }, [])

    const loadPosts = useCallback(async (userId) => {
        try {
            setIsLoading(true)
            await dispatch(profileActions.fetchUserPosts(userId))
            setIsLoading(false)

        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [])

    const loadUserPostComments = useCallback(async (postId, iter) => {
        try {
            await dispatch(magazineActions.fetchUserPostComments(postId, iter))
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

    const deletePost = useCallback(async (postId) => {
        try {
            await dispatch(profileActions.deleteUserPost(postId))
            setError('')
        }
        catch (err) {
            setError(err.message)
            console.log(err);
        }
    })






    const renderImages = (itemData) => {


        return (
            <View style={styles.imageContainer}>
                <Image source={itemData.item.image} style={styles.postImage} resizeMode="contain" />
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


    const renderPost = useCallback((itemData) => {
        return (
            <View style={styles.gridItem} >
                <View style={styles.nameDP}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('OthersProfile', {
                        profileId: itemData.item.profileId
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
                        <FlatList
                            horizontal={true}
                            pagingEnabled={true}
                            data={itemData.item.images}
                            renderItem={renderImages}
                        />
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

                {itemData.item.userId === userId ? <Button title="delete post" onPress={() => {
                    console.log('delete post id   ' + itemData.item.id)

                    deletePost(itemData.item.id)


                }} /> : null}
            </View>

        )
    })


    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <View style={ScreenStyle}>

            <FlatList
                ListHeaderComponent={
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 150 }}>
                        <View style={{ flexDirection: 'column', marginLeft: 40, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('DpUpload')
                            }}>
                                <Image style={{ height: 100, width: 100 }} source={profile.profilePic} />
                            </TouchableOpacity>


                            <Text> {profile.firstName}    {profile.lastName}</Text>
                            <Text> {profile.bio} </Text>

                        </View>

                        <View style={{ flexDirection: 'column', height: 80, marginRight: 40, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('FollowersListTab', {
                                myProfile: myProfile,
                                profileId: profileId
                            })}>
                                <Text>Followers: {numFollowers}</Text>
                                <Text>Following: {numFollowing}</Text>
                                <Text>Following Shops: {numFollowingShop}</Text>

                            </TouchableOpacity>

                            {myProfile ? null : <Button title="Send Follow Req" onPress={() => {
                                followUser(profileId)
                            }} />}
                        </View>




                        {myProfile ? <Button title="logout" onPress={logoutHandler} /> : null}

                    </View>

                }
                listKey="b"
                extraData={change}
                ref={flatListRef}
                viewabilityConfig={{
                    waitForInteraction: false,
                    viewAreaCoveragePercentThreshold: 95
                }}
                data={myProfile ? myPosts : posts}
                renderItem={renderPost}
                ListEmptyComponent={() => (
                    <View>
                        <Text>no posts yet!</Text>
                    </View>
                )}

            />

        </View>
    );

}

export function ProfileTabsScreen(props) {

    const loggedIn = checkLoggedIn();

    const userId = useSelector(state => state.auth.userId)  //using this to check if my profile or others profile
    //need to change this to more secure backend auth for production


    const profileId = props.route.params?.profileId;



    const TopTab = createMaterialTopTabNavigator();

    if (!loggedIn) {
        return (
            <AuthRequiredScreen navigation={props.navigation} />
        )

    }

    return (
        <View style={{ ...ScreenStyle, flex: 1 }}>

            <TopTab.Navigator
                tabBarOptions={{
                    indicatorStyle: {
                        backgroundColor: Colors.tabBarActiveTintColor
                    }
                }}
            >
                <TopTab.Screen
                    name="ProfileStack"
                    component={ProfileScreen}
                    initialParams={{ profileId: profileId }}
                />
                <TopTab.Screen
                    name="BlogListScreen"
                    component={BlogListScreen}
                    initialParams={{ profileId: profileId }}
                />
            </TopTab.Navigator>
        </View>


        // <View>
        //     <Text> jello</Text>
        // </View>
    )
}


export default function ProfileStackScreen(props) {
    const profileId = props.route.params?.profileId;

    const ProfileStack = createStackNavigator();
    return (
        <ProfileStack.Navigator
            screenOptions={HeaderOptions}
        >
            <ProfileStack.Screen name="ProfileScreen" component={ProfileTabsScreen} options={{
                headerRight: () => (
                    <GenericHeaderButton title="SettingButton" iconName="md-settings" onPress={() => props.navigation.navigate('ProfileSettings')} />
                )
            }}
                initialParams={{ profileId: profileId }} />


            <ProfileStack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
            <ProfileStack.Screen name="FollowersListTab" component={FollowersListTabScreen} />
            <ProfileStack.Screen name="CreateBlog1" component={CreateBlogScreen1}
            // options={{
            //     headerRight: () => (
            //         <GenericHeaderButton name="CreateBlogButton1" iconName="md-arrow-forward" onPress={() => props.navigation.navigate('CreateBlog2')} />
            //     )
            // }} 
            />
            <ProfileStack.Screen name="CreateBlog2" component={CreateBlogScreen2} />
            <ProfileStack.Screen name="CreateBlog3" component={CreateBlogScreen3} options={{
                headerRight: () => (
                    <GenericHeaderButton name="CreateBlogButton3" iconName="md-arrow-forward" onPress={() => props.navigation.popToTop()} />
                )
            }} />
            <ProfileStack.Screen name="BlogScreen" component={BlogScreen} />
            <ProfileStack.Screen name="Post" component={PostScreen} />

            <ProfileStack.Screen name="DpUpload" component={DpUploadScreen} />
        </ProfileStack.Navigator>

    )
}

const styles = StyleSheet.create({
    // postGridItem: {
    //     margin: 10,
    //     width: Dimensions.get('window').width / 3.5
    // },
    postImage: {
        height: '100%',
        width: Dimensions.get('window').width * 0.95
    },
    imageContainer: {
        flex: 1,
    },

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
})