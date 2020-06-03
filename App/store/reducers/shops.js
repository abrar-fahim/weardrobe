import { GET_SHOPS, GET_SHOP_PRODUCTS, GET_SHOP_DETAILS, FOLLOW_SHOP, GET_MY_SHOPS, GET_SHOP_REVIEWS, GET_SHOP_CATEGORIES } from "../actions/shops";

const initialState = {
    shops: [],
    shopProducts: [],
    shopDetails: null,
    myShops: [],
    message: null,
    shopReviews: [],
    categories: []
}


export default function shopsReducer(state = initialState, action) {
    // console.log(action.type)
    switch (action.type) {
        case GET_SHOPS:
            return {
                ...state,
                shops: action.shops
            }

        case GET_SHOP_PRODUCTS:

            return {
                ...state,
                shopProducts: action.products
            };

        case GET_SHOP_DETAILS:
            return {
                ...state,
                shopDetails: action.shopDetails
            }

        case FOLLOW_SHOP:
            return {
                ...state,
                message: action.message
            }

        case GET_MY_SHOPS:
            return {
                ...state,
                myShops: action.myShops
            }

        case GET_SHOP_REVIEWS:
            return {
                ...state,
                shopReviews: action.shopReviews
            }

            case GET_SHOP_CATEGORIES: 
            return {
                ...state, 
                categories: action.categories
            }


    }

    return state;
}