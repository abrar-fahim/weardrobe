import { GET_SHOP_POSTS, GET_FRIENDS_POSTS, GET_SHOP_POST_REACTS, GET_SHOP_POST_COMMENTS, GET_FEED } from "../actions/magazine"

const initialState = {
    shopPosts: [],
    friendPosts: [],
    shopPostComments: [],
    shopPostReacts: [],
    feed: []
}


const magazineReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FEED:
            if (action.iter === 0) {
                return {
                    ...state,
                    feed: action.feed
                }
            }

            if (action.feed.length === 0) {
                return state
            }

            return {
                ...state,
                feed: state.feed.concat(action.feed)
            }

        case GET_SHOP_POSTS:

            if (action.iter === 0) {
                return {
                    ...state,
                    shopPosts: action.shopPosts
                }
            }

            if (action.shopPosts.length === 0) {
                return state
            }

            return {
                ...state,
                shopPosts: state.shopPosts.concat(action.shopPosts)
            }


        case GET_FRIENDS_POSTS:
            return {
                ...state,
                friendPosts: action.friendPosts
            }
        case GET_SHOP_POST_COMMENTS:



            if (action.iter === 0) {
                return {
                    ...state,
                    shopPostComments: action.shopPostComments
                }
            }

            if (action.shopPostComments.length === 0) {
                return state
            }

            return {
                ...state,
                shopPostComments: state.shopPostComments.concat(action.shopPostComments)
            }

        //5 items per iter

        //need to debug this logic later
        // if (action.iter * 5 >= state.shopPostComments.length) {
        //     return {
        //         ...state,
        //         shopPostComments: state.shopPostComments.concat(action.shopPostComments)
        //     }
        // }
        // else {
        //     return {
        //         ...state,
        //         shopPostComments: action.shopPostComments
        //     }

        // }






        case GET_SHOP_POST_REACTS:
            return {
                ...state,
                shopPostReacts: action.shopPostReacts
            }


    }

    return state
}

export default magazineReducer
