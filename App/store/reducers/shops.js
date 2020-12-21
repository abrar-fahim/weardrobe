import {
    GET_SHOPS, GET_SHOP_PRODUCTS, GET_SHOP_DETAILS, FOLLOW_SHOP, GET_MY_SHOPS, GET_SHOP_REVIEWS, GET_SHOP_CATEGORIES,
    GET_SELLER_POSTS
} from "../actions/shops";

const initialState = {
    shops: [],
    shopProducts: [],
    shopDetails: null,
    myShops: [],
    message: null,
    shopReviews: [],
    categories: [],
    posts: []
}


export default function shopsReducer(state = initialState, action) {
    // console.log(action.type)
    switch (action.type) {
        case GET_SHOPS:

            if (action.iter === 0) {
                return {
                    ...state,
                    shops: action.shops
                }
            }

            if (action.shops.length === 0) {
                return state;

            }

            return {
                ...state,
                shops: state.shops.concat(action.shops)
            }


        case GET_SHOP_PRODUCTS:

            if (action.iter === 0) {
                return {
                    ...state,
                    shopProducts: action.products
                };
            }

            if (action.products.length === 0) {
                return state;
            }

            return {
                ...state,
                shopProducts: state.shopProducts.concat(action.products)
            }


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
            if (action.iter === 0) {
                return {
                    ...state,
                    myShops: action.myShops
                }
            }

            if (action.myShops.length === 0) {
                return state;
            }

            return {
                ...state,
                myShops: state.myShops.concat(action.myShops)
            }

        case GET_SHOP_REVIEWS:
            return {
                ...state,
                shopReviews: action.shopReviews
            }

        case GET_SHOP_CATEGORIES:

            if (action.iter === 0) {
                return {
                    ...state,
                    categories: action.categories
                }
            }

            if (action.categories.length === 0) {
                return state;
            }

            return {
                ...state,
                categories: state.categories.concat(action.categories)
            }

        case GET_SELLER_POSTS:

            if (action.iter === 0) {
                return {
                    ...state,
                    posts: action.posts
                }
            }

            if (action.posts.length === 0) {
                return state;
            }

            return {
                ...state,
                posts: state.posts.concat(action.posts)
            }




    }

    return state;
}