import {
    GET_GROUPS,
    GET_CHATS,
    GET_SHOPPING_SESSIONS,
    GET_SESSION_CART,
    GET_GROUP_PEOPLE,
    SET_SESSION_ACTIVE,
    UPDATE_SESSION_TIMER,
    ADD_CHAT,
    SET_GROUP_ID
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
    expiresIn: 0,
    groupId: null  //this keeps track of the groupId returned from create new shop chat or create new group chat
}


export default function socialReducer(state = initialState, action) {
    if (action.type !== UPDATE_SESSION_TIMER) console.log(action.type)
    switch (action.type) {
        case GET_GROUPS:

            if (action.iter === 0) {
                return {
                    ...state,
                    groups: action.groups
                }
            }
            if (action.groups.length === 0) {
                return state;
            }

            return {
                ...state,
                groups: state.groups.concat(action.groups)
            }

        case GET_CHATS:
            if (action.iter === 0) {
                return {
                    ...state,
                    chats: action.chats
                }
            }

            if (action.chats.length === 0) {
                return state
            }


            if (action.iter === state.chats.length) {
                return {
                    ...state,
                    chats: state.chats.concat(action.chats)
                }
            }

            else {
                return state
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
                chats: [action.chat, ...state.chats]
            }

        case SET_GROUP_ID:
            return {
                ...state,
                groupId: action.groupId
            }


    }

    return state
}