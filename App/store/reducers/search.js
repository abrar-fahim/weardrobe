import { SEARCH_ALL_USERNAMES } from '../actions/search'

const initialState = {
    usernames: []
}

export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        case SEARCH_ALL_USERNAMES:
            return {
                ...state,
                usernames: action.results
            }


    }

    return state
}