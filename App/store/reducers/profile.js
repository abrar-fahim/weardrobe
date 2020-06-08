import { GET_SELF_POSTS, GET_SELF_BLOGS, GET_BLOGS, GET_POSTS } from "../actions/profile";

const initialState = {
    posts: [],
    blogs: [],
    myPosts: [],
    myBlogs: []

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
    }

    return state
}