import {
    SET_PRODUCTS_LIST,
    GET_PRODUCT_DETAILS,
    ADD_TO_CART,
    SET_ERROR,
    GET_PRODUCT_REVIEWS,
    GET_CATEGORIES,
    GET_PRODUCTS_FN,
    GET_SHOP_FEED
} from '../actions/products'
import PRODUCTS from '../../dummy-data/Products'

const initialState = {
    products: [],
    productDetails: null,
    errorMessage: null,
    productReviews: null,
    categories: [],
    getProductsFn: null,
    feed: []
}

export default function productsReducer(state = initialState, action) {
    action.type !== 'UPDATE_SESSION_TIMER' ? console.log(action.type) : null
    //console.log(state)

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

        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }

        case GET_PRODUCTS_FN:
            return {
                ...state,
                getProductsFn: action.fn
            }

        case GET_SHOP_FEED:
            return {
                ...state,
                feed: action.feed
            }

    }
    return state;
}

