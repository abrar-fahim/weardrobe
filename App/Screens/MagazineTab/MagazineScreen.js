import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { FEEDITEMS } from '../../dummy-data/Feed'
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
import Post from '../../components/Post';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,

} from 'expo-ads-admob';



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

    const [iter, setIter] = useState(0)

    const [iterLoading, setIterLoading] = useState(false)

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

    const loadMorePosts = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(magazineActions.fetchShopPosts(iter))
                setIter(iter => iter + 1)
                setIterLoading(false)
            }


        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }, [iter, iterLoading])






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
        setIter(0)
    }, [userId])



    const renderFeedItem = (itemData) => {

        if (itemData.index === 3) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <AdMobBanner
                        bannerSize="mediumRectangle"
                        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds // true or false
                        onDidFailToReceiveAdWithError={(text) => console.log(text)} />

                </View>

            )
        }

        return (



            <Post post={itemData.item} navigation={props.navigation} setChange={setChange} />


        )
    }


    if (!userId) {
        return (
            <AuthRequiredScreen navigation={props.navigation} />
        )
    }

    // if (isLoading) {
    //     return <LoadingScreen />
    // }




    return (
        <View style={ScreenStyle}>


            {/* <PublisherBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                onDidFailToReceiveAdWithError={(text) => console.log(text)}
            // onAdMobDispatchAppEvent={this.adMobEvent}
            /> */}




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
                onEndReached={() => {
                    loadMorePosts()
                }}
                refreshing={isLoading}
                onRefresh={loadPosts}

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
        // flex: 1,
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