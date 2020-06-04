import { GET_SELF_POSTS } from "../actions/profile";

const initialState = {
    posts: []
}

export default function profileReducer(state = initialState, action) {

    switch (action.type) {
        case GET_SELF_POSTS:
            return {
                ...state,
                posts: action.posts
            }
    }

    return state
}