export const SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST';
export const GET_PRODUCT_DETAILS = 'GET_PRODUCT_DETAILS';
export const ADD_TO_CART = 'ADD_TO_CART';

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3000/get/shop/157b9ad96ee8ad27443eb96c572afeb9/products/0', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
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
                    rating: resData[key].PRODUCT_RATING
                })
            }
            // console.log(loadedProducts);
            dispatch({ type: SET_PRODUCTS_LIST, products: loadedProducts })

        }
        catch (err) {
            //send to custom analytics server
            console.log('error on action')
        }
    }
}

export const fetchProductDetails = (productId) => {
    return async (dispatch) => {

        try {
            const response = await fetch(`http://localhost:3000/get/product/${productId}/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Somehthings wrong');
            }
            const resData = await response.json();

            const product = {
                id: resData.PRODUCT_ID,
                name: resData.PRODUCT_NAME,
                price: resData.PRICE,
                description: resData.DESCRIPTION,
                colors: resData.COLOR,
                sizes: resData.SIZE,
                rating: resData.PRODUCT_RATING

            }
            // console.log('acrtion product: ' + product)


            dispatch({ type: GET_PRODUCT_DETAILS, product: product })
        }
        catch (err) {
            throw err;
        }

    }
}

export const addToCart = (productId) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3000/add/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "productId": productId
                })
            })

            console.log(resData)
            if (!response.ok) {
                throw new Error('Somehthings wrong');
            }
            const resData = await response.json();


            //console.log('acrtion product: ' + product)


            dispatch({ type: ADD_TO_CART })
        }
        catch (err) {
            throw err;
        }
    }

}