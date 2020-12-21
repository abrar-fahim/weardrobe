import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, GET_WISHLIST_ITEMS } from '../actions/wishlist';


const initialState = {
    items: [],
    message: 'Please wait'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WISHLIST_ITEMS:
            return {
                ...state,
                items: action.items
            }

            case ADD_TO_WISHLIST:
                return {
                    ...state,
                    message: action.message
                }
    }

    return state;
}