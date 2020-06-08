import { GET_SELF_POSTS, GET_SELF_BLOGS, GET_BLOGS, GET_POSTS, GET_FOLLOW_REQUESTS, GET_FOLLOW_COUNTS, GET_MY_FOLLOWERS, GET_MY_FOLLOWING, GET_PROFILE, GET_MY_PROFILE } from "../actions/profile";

const initialState = {
    posts: [],
    blogs: [],
    myPosts: [],
    myBlogs: [],
    myProfile: [],
    followRequests: [],
    numFollowers: 0,
    numFollowing: 0,
    numFollowingShop: 0,
    myFollowers: [],
    myFollowing: [],
    otherProfile: []


}

export default function profileReducer(state = initialState, action) {

    switch (action.type) {
        case GET_SELF_POSTS:
            return {
                ...state,
                myPosts: action.posts
            }

        case GET_SELF_BLOGS:
            return {
                ...state,
                myBlogs: action.blogs
            }

        case GET_POSTS:
            return {
                ...state,
                posts: action.posts
            }

        case GET_BLOGS:
            return {
                ...state,
                blogs: action.blogs
            }

        case GET_FOLLOW_REQUESTS: {
            return {
                ...state,
                followRequests: action.followRequests
            }
        }
        case GET_FOLLOW_COUNTS:
            return {
                ...state,
                numFollowers: action.numFollowers,
                numFollowing: action.numFollowing,
                numFollowingShop: action.numFollowingShop

            }

        case GET_MY_FOLLOWERS:
            return {
                ...state,
                myFollowers: action.followers
            }

        case GET_MY_FOLLOWING:
            return {
                ...state,
                myFollowing: action.following
            }

        case GET_PROFILE:
            return {
                ...state,
                myProfile: action.profile
            }
        case GET_PROFILE:
            return {
                ...state,
                otherProfile: action.profile
            }

    }

    return state
}