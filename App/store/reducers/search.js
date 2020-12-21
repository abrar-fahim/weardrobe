import { SEARCH_PEOPLE, SEARCH_PRODUCTS, SEARCH_SHOPS, SEARCH_CATEGORIES } from '../actions/search'

const initialState = {
    people: [],
    shops: [],
    products: [],
    categories: []
}

export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        case SEARCH_PEOPLE:
            if (action.iter === 0) {
                return {
                    ...state,
                    people: action.results
                }
            }

            if (action.results.length === 0) {
                return state;
            }

            return {
                ...state,
                people: state.people.concat(action.results)
            }


        case SEARCH_SHOPS:
            if (action.iter === 0) {
                return {
                    ...state,
                    shops: action.results
                }
            }

            if (action.results.length === 0) {
                return state;
            }

            return {
                ...state,
                shops: state.shops.concat(action.results)
            }


        case SEARCH_PRODUCTS:

            if (action.iter === 0) {
                return {
                    ...state,
                    products: action.results
                }
            }

            if (action.results.length === 0) {
                return state;
            }

            return {
                ...state,
                products: state.products.concat(action.results)
            }


        case SEARCH_CATEGORIES:

            if (action.iter === 0) {
                return {
                    ...state,
                    categories: action.results
                }
            }

            if (action.results.length === 0) {
                return state;
            }

            return {
                ...state,
                categories: state.categories.concat(action.results)
            }




    }

    return state
}