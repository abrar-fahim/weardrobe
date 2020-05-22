import {
    SET_PRODUCTS
} from '../actions/products'
import PRODUCTS from '../../dummy-data/Products'

const initialState = {
    products: PRODUCTS
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            console.log('reducer got action')
            return {products: action.products};
    }

    return state;
}

