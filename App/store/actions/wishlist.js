export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const GET_WISHLIST_ITEMS = 'GET_WISHLIST_ITEMS';

export const addToWishlist = productId => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:3000/add/wishlist', {
            method: 'POST',
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
            // dispatch({
            //     type: ADD_TO_WISHLIST,
            //     productId: productId
            // })
        }

    }
}

export const removeFromWishlist= productId => {
    return {
        type: REMOVE_FROM_WISHLIST,
        productId: productId
    }
}

export const fetchItems = () => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch('http://localhost:3000/get/wishlist', {
                method: 'GET'
            })

            const resData = await response.json();
            const wishListItems = [];
            

            for(const key in resData) {
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


        } catch(err) {
            throw new Error(err.message)
        }
    }





}