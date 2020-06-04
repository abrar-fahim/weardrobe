import { GET_SELF_POSTS, GET_SELF_BLOGS } from "../actions/profile";

const initialState = {
    posts: [],
    blogs: [],
    
}

export default function profileReducer(state = initialState, action) {

    switch (action.type) {
        case GET_SELF_POSTS:
            return {
                ...state,
                posts: action.posts
            }

        case GET_SELF_BLOGS:
            return {
                ...state,
                blogs: action.blogs
            }
    }

    return state
}