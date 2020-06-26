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
import CheckLoggedIn from '../../components/CheckLoggedIn';
import AuthRequiredScreen from '../AuthRequiredScreen';
import PostScreen from './PostScreen';
import PeopleSearchScreen from './PeopleSearch';
import FollowersListTabScreen from '../ProfileTab/FollowersListScreen';



export function MagazineScreen(props) {

    const flatListRef = useRef(null);

    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.userId)

    const shopPosts = useSelector(state => state.magazine.shopPosts)
    const friendPosts = useSelector(state => state.magazine.friendPosts)

    const myShops = useSelector(state => state.shops.myShops)

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState('')

    const [change, setChange] = useState(0);    //this forces like icon to re render on each touch

    const [iters, setIters] = useState({
        shopPostComments: 1
    })

    const loadPosts = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(magazineActions.fetchShopPosts())
            if (userId) await dispatch(magazineActions.fetchFriendsPosts())
            setIsLoading(false)

        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [userId])



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
    }, [userId])

    const renderImages = (itemData) => {


        return (

            <Image source={itemData.item.image} style={styles.postImage} resizeMode="contain" />

        )

    }

    const renderFeedItem = (itemData) => {

        return (
            <View style={styles.gridItem} >

                <TouchableOpacity onPress={() => {
                    itemData.item.type === 'SHOP' ?
                        props.navigation.navigate('Seller', {
                            shopId: itemData.item.shopId
                        }) :
                        props.navigation.navigate('OthersProfile', {
                            profileId: itemData.item.posterId
                        })

                }}

                >
                    <View style={styles.nameDP}>

                        <Image style={styles.DPImage} source={itemData.item.logo} />
                        <View style={styles.nameContainer}>
                            <Text style={styles.Name}> {itemData.item.name} </Text>
                            <Text style={styles.username}> {itemData.item.username} . {itemData.item.date} </Text>
                        </View>


                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.Post} onPress={() => {
                    props.navigation.navigate('Post', {
                        post: itemData.item,
                        type: itemData.item.type
                    })
                }}>

                    <FlatList horizontal={true} pagingEnabled={true} data={itemData.item.images} renderItem={renderImages} />
                    {/* <Image  source={require('../../assets/Images/suit.png')} style={styles.PostImage}/>  */}
                    <Text style={styles.caption}>   {itemData.item.text}</Text>

                </TouchableOpacity>

                <View style={styles.reactsCommentsContainer}>
                    <TouchableOpacity style={styles.Like} onPress={async () => {


                        if (itemData.item.hasReacted === 1) {
                            //unlike
                            itemData.item.type === 'SHOP' ? await unReactShopPost(itemData.item.id) : await unReactUserPost(itemData.item.id)

                            if (error === '') {

                                // flatListRef.current.recordInteraction()
                                itemData.item.hasReacted = 0;
                                itemData.item.numReacts -= 1;
                                setChange(state => state - 1)
                            }

                        }
                        else {
                            itemData.item.type === 'SHOP' ? await reactShopPost(itemData.item.id) : reactUserPost(itemData.item.id)
                            if (error === '') {
                                itemData.item.hasReacted = 1;
                                itemData.item.numReacts += 1;
                                setChange(state => state + 1)
                            }


                        }
                    }}>


                        {itemData.item.hasReacted === 1 ? <MaterialCommunityIcons name="heart-multiple" size={30} color='#E1306C' /> : <MaterialCommunityIcons name="heart-multiple-outline" size={30} color='black' />}

                        <Text style={styles.number}>{itemData.item.numReacts}</Text>


                    </TouchableOpacity>




                    <View style={styles.comment}>
                        <MaterialCommunityIcons name="comment-multiple" color="black" size={30} />
                        <Text style={styles.number}>{itemData.item.numComments}</Text>
                    </View>



                </View>
            </View>

        )
    }


    if (!userId) {
        return (
            <AuthRequiredScreen navigation={props.navigation} />
        )
    }

    if (isLoading) {
        return <LoadingScreen />
    }




    return (
        <View style={ScreenStyle}>



            <FlatList

                extraData={change}
                ref={flatListRef}
                viewabilityConfig={{
                    waitForInteraction: false,
                    viewAreaCoveragePercentThreshold: 95
                }}
                data={friendPosts.concat(shopPosts)}
                renderItem={renderFeedItem}
                ListEmptyComponent={
                    <View>
                        <Text>no posts yet</Text>
                    </View>
                }

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

                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <GenericHeaderButton title="search" iconName="ios-search" onPress={() => navigation.navigate('PeopleSearch')} />
                        < NewPostButton onPress={() => navigation.navigate('NewPostChooseLayout')} />
                    </View>

                )
            }} />
            {/* <MagazineStack.Screen name="NewPostChooseLayout" component={NewPostChooseLayout} options={{

            }} />
            <MagazineStack.Screen name="NewPost2" component={NewPostScreen2} options={{
                headerRight: () => (<NewPostNextButton onPress={() => navigation.navigate('NewPost3')} />),

            }} />
            <MagazineStack.Screen name="NewPost3" component={NewPostScreen3} />
            <MagazineStack.Screen name="NewPostTag" component={NewPostTagScreen} /> */}
            <MagazineStack.Screen name="Seller" component={SellerScreen} />
            <MagazineStack.Screen name="Post" component={PostScreen} />
            <MagazineStack.Screen name="PeopleSearch" component={PeopleSearchScreen} />
            <MagazineStack.Screen name="FollowersListTab" component={FollowersListTabScreen} />
            <MagazineStack.Screen name="OthersProfile" component={ProfileTabsScreen} options={{
                headerShown: true
            }} />

        </MagazineStack.Navigator>

    )
}


const styles = StyleSheet.create({
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
        height: 400,
        borderRadius: 30,
    },
    Post2:
    {

        // overflow: 'hidden'
    },
    postImage:
    {
        height: '100%',
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
    // LikeComment:
    // {
    //     paddingTop: 15,
    //     flexDirection: 'row'
    // },
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
    comment: {
        flexDirection: 'row',
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