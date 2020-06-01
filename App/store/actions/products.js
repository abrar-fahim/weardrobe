export const SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST';
export const GET_PRODUCT_DETAILS = 'GET_PRODUCT_DETAILS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_ERROR = 'SET_ERROR';
export const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_PRODUCTS_FN = 'GET_PRODUCTS_FN'

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://192.168.0.20:3000/get/shop/157b9ad96ee8ad27443eb96c572afeb9/products/0', {
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
            dispatch({ type: SET_PRODUCTS_LIST, products: loadedProducts })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error('error while retrieving products')
        }
    }
}

export const fetchProductDetails = (productId) => {
    return async (dispatch) => {

        try {
            const response = await fetch(`http://192.168.0.20:3000/get/product/${productId}/details`, {
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
                rating: resData.PRODUCT_RATING,
                colors: resData.COLORS,
                photos: resData.PHOTOS,
                ratingCount: resData.RATING_COUNT

            }
            // console.log('acrtion product: ' + product)


            dispatch({ type: GET_PRODUCT_DETAILS, product: product })
        }
        catch (err) {
            throw err;
        }

    }
}

export const fetchProductReviews = (productId) => {
    return async (dispatch) => {

        try {
            const response = await fetch(`http://192.168.0.20:3000/get/product/${productId}/reviews/0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Somehthings wrong');
            }
            const resData = await response.json();

            const productReviews = []

            for (const key in resData) {
                productReviews.push({
                    id: resData[key].REVIEWER_ID + key,
                    reviewerId: resData[key].REVIEWER_ID,
                    review: resData[key].REVIEW,
                    rating: resData[key].RATING,
                    date: resData[key].REVIEW_DATE,
                    reviewerName: resData[key].USERNAME
                })

            }

            // console.log('acrtion product: ' + product)


            dispatch({ type: GET_PRODUCT_REVIEWS, productReviews: productReviews })
        }
        catch (err) {
            throw err;
        }

    }

}

export const addReview = (productId, rating, review) => {
    return async (dispatch) => {

        try {
            const response = await fetch(`http://192.168.0.20:3000/review/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    review: review,
                    rating: rating

                })
            })

            if (!response.ok) {
                throw new Error('Somehthings wrong');
            }
            const resData = await response.json();

            console.log(resData)

            if (Object.keys(resData)[0] === 'SUCCESS') {
                dispatch(
                    {
                        type: SET_ERROR,
                        message: 'Added review Successfully!'
                    }
                )

                dispatch(fetchProductReviews(productId))

            }
            else {
                dispatch(
                    {
                        type: SET_ERROR,
                        message: 'Review Failed'
                    }
                )
            }



            // console.log('acrtion product: ' + product)


            //dispatch({ type: GET_PRODUCT_REVIEWS, productReviews: productReviews })
        }
        catch (err) {
            throw err;
        }

    }
}


export const fetchCategories = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://192.168.0.20:3000/get/category/list/0', {
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
            const categories = [];

            for (const key in resData) {
                categories.push({
                    id: resData[key].CATEGORY_ID,
                    name: resData[key].CATEGORY_NAME,
                })
            }
            // console.log(loadedProducts);
            dispatch({ type: GET_CATEGORIES, categories: categories })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const fetchProductsByCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://192.168.0.20:3000/get/category/${categoryId}/products/0`, {
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
            dispatch({ type: SET_PRODUCTS_LIST, products: loadedProducts })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const getProductsFn = (getProductsFn) => {
    return async (dispatch) => {

        dispatch({
            type: GET_PRODUCTS_FN,
            fn: getProductsFn
        })


    }
}


