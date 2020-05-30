export const FOLLOW_SHOP = 'FOLLOW_SHOP';
export const GET_SHOPS = 'GET_SHOPS';
export const GET_SHOP_PRODUCTS = 'GET_SHOP_PRODUCTS'

export const getShops = () => {
    return async (dispatch) => {
        const response = await fetch('http://192.168.0.20:3000/get/allshops/0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
           
        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);
        const shops = [];

        for(const key in resData) {
            shops.push({
                id: resData[key].SHOP_ID,
                name: resData[key].SHOP_NAME,
                rating: resData[key].SHOP_RATING,
                logo: {uri: "http://192.168.0.20:3000/img/temp/" + resData[key].LOGO_URL}
            })
        } 

        dispatch({
            type: GET_SHOPS,
            shops: shops
        })


    }
}


export const fetchShopProducts = (shopId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://192.168.0.20:3000/get/shop/${shopId}/products/0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push({
                    id: resData[key].PRODUCT_ID,
                    name: resData[key].PRODUCT_NAME,
                    price: resData[key].PRICE,
                    rating: resData[key].PRODUCT_RATING,
                    discount: resData[key].DISCOUNT,
                    thumbnail: { uri: "http://localhost:3000/img/temp/" + resData[key].THUMBNAIL }

                })
            }
            // console.log(loadedProducts);
            dispatch({ type: SET_SHOP_PRODUCTS, products: loadedProducts })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error('error while retrieving products')
        }
    }
}




export const followShop = (shopId) => {
    return async (dispatch) => {
        const response = await fetch('http://192.168.0.20:3000/get/allshops/0', {
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
