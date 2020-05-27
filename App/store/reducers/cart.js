import { ADD_TO_CART, REMOVE_FROM_CART, GET_CART_ITEMS } from '../actions/cart';

import { LOGOUT } from '../actions/auth'
import CARTITEMS from '../../dummy-data/CartItems';

const initialState = {
    items: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_ITEMS:
            return {
                items: action.items
            }

        case LOGOUT: {
            console.log('doneeee')
            return initialState
        }
            
    }

    return state;
}