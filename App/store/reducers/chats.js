import { GET_GROUPS, GET_CHATS, GET_SHOPPING_SESSIONS, GET_SESSION_CART, GET_GROUP_PEOPLE } from '../actions/chats'

const initialState = {
    groups: [],
    chats: [],
    sessions: [],
    sessionCart: [],
    groupPeople: []
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

        case GET_SHOPPING_SESSIONS:
            return {
                ...state,
                sessions: action.sessions
            }

        case GET_SESSION_CART:
            return {
                ...state,
                sessionCart: action.cartItems
            }

        case GET_GROUP_PEOPLE:
            return {
                ...state,
                groupPeople: action.groupPeople
            }
    }

    return state
}