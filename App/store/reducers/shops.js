import { GET_SHOPS, GET_SHOP_PRODUCTS } from "../actions/shops";

const initialState = {
    shops: [],
    shopProducts: []
}


export default function shopsReducer(state = initialState, action) {
    console.log('reducer got action');
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

    }

    return state;
}