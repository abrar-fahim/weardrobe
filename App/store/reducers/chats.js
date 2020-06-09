import { GET_GROUPS, GET_CHATS } from '../actions/chats'

const initialState = {
    groups: [],
    chats: []
}


export default function socialReducer(state = initialState, action) {

    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.groups
            }

        case GET_CHATS:
            return {
                ...state,
                chats: action.chats
            }
    }

    return state
}