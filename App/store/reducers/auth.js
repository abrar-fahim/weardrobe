import { LOGIN, LOGOUT } from '../actions/auth'

const initialState = {
    userId: null,
}

export default (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        case LOGIN:
            // console.log('action id' + action.userId)
            return {
                ...state,
                userId: action.userId
            }

        case LOGOUT:
            return {
                ...state,
                ...initialState
            }

        default:
            return state;
    }
}

