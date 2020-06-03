import {
    SET_PRODUCTS_LIST,
    GET_PRODUCT_DETAILS,
    ADD_TO_CART,
    SET_ERROR,
    GET_PRODUCT_REVIEWS,
    GET_CATEGORIES,
    GET_PRODUCTS_FN
} from '../actions/products'
import PRODUCTS from '../../dummy-data/Products'

const initialState = {
    products: [],
    productDetails: null,
    errorMessage: null,
    productReviews: null,
    categories: [],
    getProductsFn: null
}

export default function productsReducer(state = initialState, action) {
     console.log(action.type)
    //console.log(state)

    switch (action.type) {

        case SET_PRODUCTS_LIST:

            return {
                ...state,
                products: action.products
            };

        case GET_PRODUCT_DETAILS:
            if (state.productDetails?.id === action.product.id) {
                return state;
            }
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

    }
    return state;
}

