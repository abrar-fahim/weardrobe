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

            if (action.iter === 0) {
                return {
                    ...state,
                    products: action.products
                };
            }

            if (action.products.length === 0) {
                return state;
            }

            return {
                ...state,
                products: state.products.concat(action.products)
            }



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

            if (action.iter === 0) {
                return {
                    ...state,
                    productReviews: action.productReviews
                }
            }

            if (action.productReviews.length === 0) {
                return state
            }

            return {
                ...state,
                productReviews: state.productReviews.concat(action.productReviews)

            }


        case GET_CATEGORIES:

            if (action.iter === 0) {
                return {
                    ...state,
                    categories: action.categories
                }
            }

            if (action.categories.length === 0) {
                return state
            }

            return {
                ...state,
                categories: state.categories.concat(action.categories)

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

