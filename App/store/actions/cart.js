export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_CART_ITEMS = 'GET_CART_ITEMS';

export const addToCart = (productId, color, size, quantity) => {
    return async (dispatch) => {
        const response = await fetch('http://192.168.0.20:3000/add/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId,
                inventory: {
                    data: [{
                        color: color,
                        size: size,
                        quantity: quantity
                    }

                    ]
                }
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
                msg: 'Added to cart!'
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

export const removeFromCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        productId: productId
    }
}

export const fetchCartItems = () => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch('http://192.168.0.20:3000/get/cart', {
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
                type: GET_CART_ITEMS,
                items: cartItems
            })


        } catch (err) {
            throw new Error(err.message)
        }
    }





}