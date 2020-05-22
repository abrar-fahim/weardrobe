export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3000/get/shop/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "iter": 0,
                    "shopId": "157b9ad96ee8ad27443eb96c572afeb9"
                })
            });

            if (!response.ok) {
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push({
                    id: resData[key].PRODUCT_ID,
                    name: resData[key].PRODUCT_NAME
                })
            }
            console.log(loadedProducts);
            dispatch({ type: SET_PRODUCTS, products: loadedProducts })

        }
        catch (err) {
            //send to custom analytics server
            console.log('error on action')
        }
    }
}