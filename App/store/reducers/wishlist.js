import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, GET_WISHLIST_ITEMS } from '../actions/wishlist';


const initialState = {
    items: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WISHLIST_ITEMS:
            return {
                items: action.items
            }
    }

    return state;
}