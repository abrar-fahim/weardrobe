export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_CART_ITEMS = 'GET_CART_ITEMS';
export const UPDATE_CART = 'UPDATE_CART'
import HOST from "../../components/host";

export const addToCart = (productId, color, size, quantity) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/add/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId,
                color: color,
                size: size,
                quantity: quantity
            })
        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);

        if (Object.keys(resData)[0] === 'SUCCESS') {
            dispatch({
                type: ADD_TO_CART,
                message: 'Added to cart!'
            })
        }
        else if (Object.keys(resData)[0] === 'ERROR') {
            if (resData.ERROR === 'UNAUTHORIZED') {
                dispatch({
                    type: ADD_TO_CART,
                    message: 'Log in first!'
                })
            }
            else {
                dispatch({
                    type: ADD_TO_CART,
                    message: 'Failed to add to cart'
                })
            }

        }


    }
}

export const removeFromCart = (productId, color, size) => {

   return async (dispatch) => {
        const response = await fetch(`${HOST}/delete/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId,
                color: color,
                size: size
            })
        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);
        dispatch(fetchCartItems())

        if (Object.keys(resData)[0] === 'SUCCESS') {
            dispatch({
                type: REMOVE_FROM_CART,
                message: 'Removed from cart!'
            })
        }
        else if (Object.keys(resData)[0] === 'ERROR') {
            if (resData.ERROR === 'UNAUTHORIZED') {
                dispatch({
                    type: REMOVE_FROM_CART,
                    message: 'Log in first!'
                })
            }
            else {
                dispatch({
                    type: REMOVE_FROM_CART,
                    message: 'Failed to remove from cart'
                })
            }

        }


    }
}

export const updateCart = (productId, color, size, quantity) => {

    return async (dispatch) => {
         const response = await fetch(`${HOST}/update/cart`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 productId: productId,
                 color: color,
                 size: size,
                 quantity: quantity
             })
         });
 
         if (!response.ok) {
             throw new Error('somethings wrong');
         }
 
         const resData = await response.json();  //converts response string to js object/array
 
         console.log(resData);

         dispatch(fetchCartItems())
         
 
         if (Object.keys(resData)[0] === 'SUCCESS') {
             dispatch({
                 type: UPDATE_CART,
                 message: 'Removed from cart!'
             })
         }
         else if (Object.keys(resData)[0] === 'ERROR') {
             if (resData.ERROR === 'UNAUTHORIZED') {
                 dispatch({
                     type: UPDATE_CART,
                     message: 'Log in first!'
                 })
             }
             else {
                 dispatch({
                     type: UPDATE_CART,
                     message: 'Failed to remove from cart'
                 })
             }
 
         }
 
 
     }
 }

export const fetchCartItems = () => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(`${HOST}/get/cart`, {
                method: 'GET'
            })

            const resData = await response.json();
            const cartItems = [];


            for (const key in resData) {
                cartItems.push(
                    {
                        id: resData[key].PRODUCT_ID,
                        name: resData[key].PRODUCT_NAME,
                        shopname: 'YELLOW',
                        picture: { uri: "${HOST}/img/temp/" + resData[key].THUMBNAIL},
                        price: resData[key].PRICE,
                        discount: resData[key].DISCOUNT,
                        color: resData[key].COLOR,
                        quantity: resData[key].QUANTITY,
                        data: resData[key].DATE,
                        size: resData[key].SIZE


                    }
                )
            }

            // console.log('in action');
            // console.log(cartItems)

            dispatch({
                type: GET_CART_ITEMS,
                items: cartItems
            })


        } catch (err) {
            throw new Error(err.message)
        }
    }





}