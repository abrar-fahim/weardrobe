import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useRef, useLayoutEffect } from 'react';
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
import PostScreen from '../MagazineTab/PostScreen';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DpUploadScreen from './DpUploadScreen';
import Post from '../../components/Post';



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

    console.log(props.route.params)

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId)

    const myProfile = userId === profileId || profileId === undefined//secure this check using backend auth in production


    const posts = useSelector(state => state.profile.posts)
    const myPosts = useSelector(state => state.profile.myPosts)


    // const numFollowers = myProfile ? useSelector(state => state.profile.myNumFollowers) : useSelector(state => state.profile.numFollowers)
    // const numFollowing = myProfile ? useSelector(state => state.profile.myNumFollowing) : useSelector(state => state.profile.numFollowing)
    // const numFollowingShop = myProfile ? useSelector(state => state.profile.myNumFollowingShop) : useSelector(state => state.profile.numFollowingShop)

    // const profile = myProfile ? useSelector(state => state.profile.myProfile) : useSelector(state => state.profile.otherProfile)

    const [profile, setProfile] = useState(null)



    const [isLoading, setIsLoading] = useState(true);

    const [followCounts, setFollowCounts] = useState(null)




    const [change, setChange] = useState(0);    //this forces like icon to re render on each touch

    const [iters, setIters] = useState({
        shopPostComments: 1
    })

    const [allowed, setAllowed] = useState(true)

    const getProfile = useCallback(async () => {

        try {
            const gotProfile = await profileActions.getProfileDirect(profileId);

            setProfile(gotProfile)
        }
        catch (err) {
            console.log(err);
        }
    }, [profileId])

    const getFollowCounts = useCallback(async () => {
        // const id = myProfile? userId: profileId
        try {
            setIsLoading(true)
            const gotFollowCounts = await profileActions.getFollowCountsDirect(profileId);
            setFollowCounts(gotFollowCounts)
            setIsLoading(false)

        }
        catch (err) {

            console.log(err);
        }
    }, [profileId])


    const followUser = useCallback(async (userId) => {
        try {
            await dispatch(profileActions.followUser(userId))
            getProfile();
            getFollowCounts();

        }
        catch (err) {

            console.log(err);
        }
    })

    const unFollowUser = useCallback(async (userId) => {
        try {
            await dispatch(profileActions.unFollowUser(userId))
            getProfile();
            getFollowCounts();

        }
        catch (err) {

            console.log(err);
        }
    })

    // const getFollowCounts = useCallback(async () => {
    //     // const id = myProfile? userId: profileId
    //     try {
    //         myProfile ? await dispatch(profileActions.getMyFollowCounts(userId)) : await dispatch(profileActions.getFollowCounts(profileId))
    //         // setError('')
    //     }
    //     catch (err) {
    //         // setError(err.message)
    //         console.log(err);
    //     }
    // }, [profileId])




    // const getProfile = useCallback(async () => {
    //     console.log('myProfile: ' + myProfile)
    //     try {
    //         myProfile ? await dispatch(profileActions.getMyProfile(userId)) : await dispatch(profileActions.getProfile(profileId))


    //         // setError('')
    //     }
    //     catch (err) {
    //         // setError(err.message)
    //         console.log(err);
    //     }
    // }, [myProfile, profileId, userId])





    const logoutHandler = async () => {
        try {
            await dispatch(authActions.logout())
        } catch (err) {
            console.log('error while logging out')
        }
    }





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
            if (err.message.endsWith('NO_ACCESS_GRANTED')) {
                setAllowed(false)
            }
        }
    }, [])

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



    useEffect(() => {
        getFollowCounts()
        getProfile();

    }, [userId, profileId])

    useEffect(() => {
        myProfile ? loadMyPosts() : loadPosts(profileId);
    }, [profileId])


    const renderPost = (itemData) => {

        return (

            <Post post={itemData.item} setChange={setChange} navigation={props.navigation} logo={profile?.profilePic} />

        )
    }


    if (isLoading) {
        return <LoadingScreen />
    }


    return (
        <View style={styles.screen}>

            <FlatList
                ListHeaderComponent={profile ?
                    <View style={styles.profileContainer}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                myProfile ?
                                    props.navigation.navigate('DpUpload') : null
                            }}>
                                <Image style={{ height: 100, width: 100 }} source={profile?.profilePic} />
                            </TouchableOpacity>


                            <Text> {profile?.firstName}    {profile?.lastName}</Text>
                            <Text> {profile?.bio} </Text>

                        </View>

                        <View style={{ flexDirection: 'column', height: 80, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('FollowersListTab', {
                                myProfile: myProfile,
                                profileId: profileId
                            })}>
                                <Text>Followers: {followCounts?.numFollowers}</Text>
                                <Text>Following: {followCounts?.numFollowing}</Text>
                                <Text>Following Shops: {followCounts?.numFollowingShop}</Text>

                            </TouchableOpacity>


                        </View>



                        {myProfile ? null : profile.friendship === 'NOT_FOLLOWING' ? <TouchableOpacity onPress={() => {
                            followUser(profileId)
                        }}>
                            <Text>Send Follow Request</Text>

                        </TouchableOpacity> : profile.friendship === 'FOLLOW_REQUEST_SENT' ? <TouchableOpacity onPress={() => {
                            unFollowUser(profileId)
                        }}>
                            <Text>Cancel follow request</Text>

                        </TouchableOpacity> :
                                <View>
                                    <Text>Following</Text>

                                    <TouchableOpacity onPress={() => {
                                        unFollowUser(profileId)
                                    }}>
                                        <Text>Unfollow</Text>

                                    </TouchableOpacity>



                                </View>
                        }






                        {myProfile ?
                            <TouchableOpacity onPress={logoutHandler} style={styles.logoutButton}>
                                <Text style={styles.buttonText}>Logout</Text>

                            </TouchableOpacity> : null}

                    </View> : null

                }
                listKey="b"
                extraData={change}

                viewabilityConfig={{
                    waitForInteraction: false,
                    viewAreaCoveragePercentThreshold: 95
                }}
                data={myProfile ? myPosts : posts}
                renderItem={renderPost}
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
                            <Text>no posts yet!</Text>
                        </View>
                    )


                }}

                ListFooterComponent={
                    <View style={styles.listFooter}>
                    </View>
                }


            />

        </View>
    );

}

export function ProfileTabsScreen(props) {



    const userId = useSelector(state => state.auth.userId)  //using this to check if my profile or others profile
    //need to change this to more secure backend auth for production


    const profileId = props.route.params?.profileId ?? userId;



    const TopTab = createMaterialTopTabNavigator();

    if (!userId) {
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
    const userId = useSelector(state => state.auth.userId)

    // const profileId = props.route.params?.profileId ?? userId

    const ProfileStack = createStackNavigator();
    return (
        <ProfileStack.Navigator
            screenOptions={HeaderOptions}
        >
            <ProfileStack.Screen name="ProfileScreen" component={ProfileTabsScreen} options={{

                headerRight: () => userId ? (
                    <GenericHeaderButton title="SettingButton" iconName="md-settings" onPress={() => {

                        props.navigation.navigate('ProfileSettings', {
                            profileId: userId
                        })
                    }
                    } />
                ) : null
            }}
            />


            <ProfileStack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
            <ProfileStack.Screen name="OthersProfile" component={ProfileTabsScreen} />
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
    screen: {
        backgroundColor: Colors.backgroundColor,

    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 150,
        paddingVertical: 20,
        paddingHorizontal: 10

    },
    logoutButton: {
        height: 30,
        width: 60,
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        fontWeight: '700',
        fontSize: 13,
        width: '100%',
        textAlign: 'center'

    },
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
        marginVertical: 10,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    nameDP: {
        flexDirection: 'row',
        paddingHorizontal: 10
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
    Comment:
    {
        flex: 3,
        paddingLeft: 5,
        height: 40,
        borderColor: 'black',
        backgroundColor: 'grey'
    },
    postImage:
    {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        alignSelf: 'center'
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
    comment: {
        flexDirection: 'row',

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
    },
    listFooter: {
        marginBottom: 500
    }

})