import { LOGIN, LOGOUT } from '../actions/auth'

const initialState = {
    userId: null,
}

export default (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userId: action.userId
            }

        case LOGOUT:
            return initialState

        default:
            return state;
    }
}

