export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const GET_WISHLIST_ITEMS = 'GET_WISHLIST_ITEMS';
import HOST from "../../components/host";
import * as popupActions from './Popup'

export const addToWishlist = productId => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/add/wishlist`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId
            })
        });
        

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);

        if (Object.keys(resData)[0] === 'SUCCESS') {
            dispatch({
                type: ADD_TO_WISHLIST,
                message: 'Added to wishlist!'
            })
        }
        else if (Object.keys(resData)[0] === 'ERROR') {
            if (resData.ERROR === 'UNAUTHORIZED') {
                dispatch({
                    type: ADD_TO_WISHLIST,
                    message: 'Log in first!'
                })
            }
            else {
                dispatch({
                    type: ADD_TO_WISHLIST,
                    message: 'Failed to add to wishlist'
                })
            }

        }

        // dispatch(fetchItems());

    }
}

export const removeFromWishlist = productId => {

    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/delete/wishlist`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',


                },
                body: JSON.stringify({
                    productId: productId
                })

            })

            if (!response.ok) {
                throw new Error('somethings wrong');
            }

            const resData = await response.json();  //converts response string to js object/array

            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {
                dispatch({
                    type: REMOVE_FROM_WISHLIST,
                    message: 'removed from wishlist!'
                })
            }
            else if (Object.keys(resData)[0] === 'ERROR') {
                if (resData.ERROR === 'UNAUTHORIZED') {
                    dispatch({
                        type: REMOVE_FROM_WISHLIST,
                        message: 'Log in first!'
                    })
                }
                else {
                    dispatch({
                        type: REMOVE_FROM_WISHLIST,
                        message: 'Failed to remove from wishlist'
                    })
                }

            }

            // dispatch(fetchItems());




        }
        catch (err) {
            throw new Error(err.message)
        }
    }
    return {
        type: REMOVE_FROM_WISHLIST,
        productId: productId,
        message: ''
    }
}

export const fetchItems = () => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(`${HOST}/get/wishlist`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',


                },
            })

            const resData = await response.json();
            const wishListItems = [];


            for (const key in resData) {
                wishListItems.push(
                    {
                        id: resData[key].PRODUCT_ID,
                        name: resData[key].PRODUCT_NAME,
                        shopname: 'YELLOW',
                        picture: require('../../assets/Images/shirt2.jpg'),
                        price: resData[key].PRICE,
                        rating: resData[key].PRODUCT_RATING,
                        description: resData[key].DESCRIPTION

                    }
                )
            }

            // console.log('in action');
            // console.log(cartItems)

            dispatch({
                type: GET_WISHLIST_ITEMS,
                items: wishListItems
            })


        } catch (err) {
            throw new Error(err.message)
        }
    }





}