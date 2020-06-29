import { ADD_TO_CART, REMOVE_FROM_CART, GET_CART_ITEMS } from '../actions/cart';

// import { LOGOUT } from '../actions/auth'
import CARTITEMS from '../../dummy-data/CartItems';

const initialState = {
    items: [],
    message: 'Please Wait'
}


export default (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        case GET_CART_ITEMS:
            return {
                items: action.items
            }

        // case LOGOUT: {
        //     return initialState
        // }

        case ADD_TO_CART:
            return {
                ...state,
                message: action.message
            }

    }

    return state;
}