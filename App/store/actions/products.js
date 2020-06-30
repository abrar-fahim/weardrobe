export const SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST';
export const GET_PRODUCT_DETAILS = 'GET_PRODUCT_DETAILS';
// export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_ERROR = 'SET_ERROR';
export const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_PRODUCTS_FN = 'GET_PRODUCTS_FN'
export const GET_SHOP_FEED = 'GET_SHOP_FEED';
import HOST from "../../components/host";
import * as popupActions from './Popup'

export const fetchProducts = (iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/allproducts/${iter}`, {
                method: 'GET',
                credentials: 'include',
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
                    shopName: resData[key].SHOP_NAME,
                    price: resData[key].PRICE,
                    rating: resData[key].PRODUCT_RATING,
                    discount: resData[key].DISCOUNT,
                    thumbnail: { uri: `${HOST}/img/temp/` + resData[key].THUMBNAIL },
                    inventoryQuantity: resData[key].INVENTORY_QUANTITY

                })
            }
            // console.log(loadedProducts);
            dispatch(
                { type: SET_PRODUCTS_LIST, products: loadedProducts, iter: iter }
            )

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
            const response = await fetch(`${HOST}/get/product/${productId}/details`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });
            console.log('PRODUCT DETAILS')
            console.log('----------------')
            console.log(response.headers)

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
                ratingCount: resData.RATING_COUNT,
                isFavorite: resData.IS_FAVOURITE,
                hasReviewed: resData.HAS_REVIEWED

            }
            // console.log('acrtion product: ' + product)


            dispatch({ type: GET_PRODUCT_DETAILS, product: product })
        }
        catch (err) {
            throw err;
        }

    }
}

export const fetchProductDetailsDirect = async (productId) => {
    // return async (dispatch) => {

    try {
        const response = await fetch(`${HOST}/get/product/${productId}/details`, {
            method: 'GET',
            credentials: 'include',
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
            ratingCount: resData.RATING_COUNT,
            isFavorite: resData.IS_FAVOURITE,
            hasReviewed: resData.HAS_REVIEWED

        }
        // console.log('acrtion product: ' + product)

        return product;


        // dispatch({ type: GET_PRODUCT_DETAILS, product: product })
    }
    catch (err) {
        throw err;
    }

    // }
}

export const fetchProductReviews = (productId, iter = 0) => {
    return async (dispatch) => {

        try {
            const response = await fetch(`${HOST}/get/product/${productId}/reviews/${iter}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });


            console.log('PRODUCT REVIEWS')
            console.log('----------------')
            console.log(response.headers)

            
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


            dispatch({
                type: GET_PRODUCT_REVIEWS,
                productReviews: productReviews,
                iter: iter
            })
        }
        catch (err) {
            throw err;
        }

    }

}

export const addReview = (productId, rating, review) => {
    return async (dispatch) => {

        try {
            const response = await fetch(`${HOST}/review/product`, {
                method: 'POST',
                credentials: 'include',
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


export const fetchCategories = (iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/category/list/${iter}`, {
                method: 'GET',
                credentials: 'include',
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
                    thumbnail: { uri: `${HOST}/img/temp/` + resData[key].THUMBNAIL }
                })
            }
            // console.log(loadedProducts);
            dispatch({ type: GET_CATEGORIES, categories: categories, iter: iter })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const fetchProductsByCategory = (categoryId, iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/category/${categoryId}/products/${iter}`, {
                method: 'GET',
                credentials: 'include',
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
                    thumbnail: { uri: `${HOST}/img/temp/` + resData[key].THUMBNAIL }

                })
            }
            // console.log(loadedProducts);
            dispatch({ type: SET_PRODUCTS_LIST, products: loadedProducts, iter: iter })

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

export const fetchShopFeed = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/shopfeed`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const feed = [];

            for (const key in resData) {
                const banners = JSON.parse(resData[key].BANNERS)

                if (resData[key].FEED_TYPE < 4) {
                    //banners
                    const processedBanners = banners.map((item, index) => (
                        {
                            id: index.toString(),
                            image: { uri: `${HOST}/img/temp/` + item.BANNER_URL },
                            searchTerm: item.SEARCH_TERM,
                        }
                    ))

                    feed.push({
                        id: resData[key].FEED_ID,
                        type: resData[key].FEED_TYPE,
                        listSize: resData[key].LIST_SIZE,
                        description: resData[key].DESCRIPTION,
                        title: resData[key].TITLE,
                        order: resData[key].FEED_ORDER,
                        searchTerm: resData[key].SEARCH_TERM,
                        destinationType: resData[key].DESTINATION_TYPE,
                        banners: processedBanners,
                    })


                }
                else {



                    const processedLists = resData[key].LISTS.map(item => ({
                        id: item.PRODUCT_ID,
                        name: item.PRODUCT_NAME,
                        shopId: item.SHOP_ID,
                        price: item.PRICE,
                        rating: item.PRODUCT_RATING,
                        ratingCount: item.RATING_COUNT,
                        description: item.DESCRIPTION,
                        postDate: item.PRODUCT_POST_DATE,
                        discount: item.DISCOUNT,
                        modelNo: item.MODEL_NO,
                        image: { uri: `${HOST}/img/temp/` + item.THUMBNAIL }

                    }))
                    feed.push({
                        id: resData[key].FEED_ID,
                        type: resData[key].FEED_TYPE,
                        listSize: resData[key].LIST_SIZE,
                        description: resData[key].DESCRIPTION,
                        title: resData[key].TITLE,
                        order: resData[key].FEED_ORDER,
                        searchTerm: resData[key].SEARCH_TERM,
                        destinationType: resData[key].DESTINATION_TYPE,
                        banners: banners,
                        lists: processedLists
                    })

                }

            }
            // console.log(loadedProducts);
            dispatch({ type: GET_SHOP_FEED, feed: feed })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}


