import {
    GET_GROUPS,
    GET_CHATS,
    GET_SHOPPING_SESSIONS,
    GET_SESSION_CART,
    GET_GROUP_PEOPLE,
    SET_SESSION_ACTIVE,
    UPDATE_SESSION_TIMER,
    ADD_CHAT
} from '../actions/chats'

const initialState = {
    groups: [],
    chats: [],
    sessions: [],
    sessionCart: [],
    groupPeople: [],
    sessionGroupId: null,
    activeSessionId: null,
    timeLeft: 0,
    expiresIn: 0
}


export default function socialReducer(state = initialState, action) {

    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.groups
            }

        case GET_CHATS:

            if (action.chats === []) {
                return state
            }
            if (action.iter === 0) {
                return {
                    ...state,
                    chats: action.chats
                }
            }

            else {
                return {
                    ...state,
                    chats: state.chats.concat(action.chats)
                }
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

        case SET_SESSION_ACTIVE:
            return {
                ...state,
                sessionGroupId: action.sessionGroupId,
                activeSessionId: action.sessionId,
                timeLeft: action.timeLeft,
                expiresIn: action.expiresIn
            }
        case UPDATE_SESSION_TIMER:
            return {
                ...state,
                timeLeft: action.timeLeft
            }

        case ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, action.text]
            }


    }

    return state
}