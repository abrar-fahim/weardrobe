import {
    SET_PRODUCTS_LIST,
    GET_PRODUCT_DETAILS,
    ADD_TO_CART
} from '../actions/products'
import PRODUCTS from '../../dummy-data/Products'

const initialState = {
    products: [],
    productDetails: PRODUCTS[0]
}

export default function productsReducer(state = initialState, action) {
    console.log('reducer got action');
    switch (action.type) {

        case SET_PRODUCTS_LIST:

            return {
                ...state,
                products: action.products
            };

        case GET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.product
            }

        case ADD_TO_CART:
            return state;

    }

    return state;
}

