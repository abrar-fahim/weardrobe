import {
    SET_PRODUCTS_LIST,
    GET_PRODUCT_DETAILS,
    ADD_TO_CART,
    SET_ERROR,
    GET_PRODUCT_REVIEWS
} from '../actions/products'
import PRODUCTS from '../../dummy-data/Products'

const initialState = {
    products: [],
    productDetails: null,
    errorMessage: null,
    productReviews: null
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


        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.message
            }

        case GET_PRODUCT_REVIEWS:
            return {
                ...state,
                productReviews: action.productReviews
            }

    }

    return state;
}

