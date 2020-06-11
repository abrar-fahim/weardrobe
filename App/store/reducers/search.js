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
            return {
                ...state,
                people: action.results
            }

        case SEARCH_SHOPS:
            return {
                ...state,
                shops: action.results
            }

        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.results
            }

        case SEARCH_CATEGORIES:
            return {
                ...state,
                categories: action.results
            }



    }

    return state
}