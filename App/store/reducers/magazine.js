import { GET_SHOP_POSTS, GET_FRIENDS_POSTS, GET_SHOP_POST_REACTS, GET_SHOP_POST_COMMENTS } from "../actions/magazine"

const initialState = {
    shopPosts: [],
    friendPosts: [],
    shopPostComments: [],
    shopPostReacts: []
}


const magazineReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOP_POSTS:
            return {
                ...state,
                shopPosts: action.shopPosts
            }

        case GET_FRIENDS_POSTS:
            return {
                ...state,
                friendPosts: action.friendPosts
            }
        case GET_SHOP_POST_COMMENTS:

            //5 items per iter


            if (action.shopPostComments.length !== 0) {

                if (action.iter * 5 >= state.shopPostComments.length) {
                    return {
                        ...state,
                        shopPostComments: state.shopPostComments.concat(action.shopPostComments)
                    }
                }
                else {
                    return {
                        ...state,
                        shopPostComments: action.shopPostComments
                    }

                }

            }
            else {
                return state
            }



        case GET_SHOP_POST_REACTS:
            return {
                ...state,
                shopPostReacts: action.shopPostReacts
            }


    }

    return state
}

export default magazineReducer
