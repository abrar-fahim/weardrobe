export const FOLLOW_SHOP = 'FOLLOW_SHOP';
export const GET_SHOPS = 'GET_SHOPS';
export const GET_SHOP_PRODUCTS = 'GET_SHOP_PRODUCTS';
export const GET_SHOP_DETAILS = 'GET_SHOP_DETAILS';
export const GET_MY_SHOPS = 'GET_MY_SHOPS';
export const UNFOLLOW_SHOP = 'UNFOLLOW_SHOP';
export const GET_SHOP_REVIEWS = 'GET_SHOP_REVIEWS';
export const ADD_SHOP_REVIEW = 'ADD_SHOP_REVIEW';
export const GET_SHOP_CATEGORIES = 'GET_SHOP_CATEGORIES';

export const GET_SELLER_POSTS = 'GET_SELLER_POSTS';


import HOST from "../../components/host";
import * as popupActions from './Popup'
import { SHOP_POST } from "./magazine";



export const getShops = (iter = 0) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/allshops/${iter}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        // console.log(resData);
        const shops = [];

        for (const key in resData) {
            shops.push({
                id: resData[key].SHOP_ID,
                name: resData[key].SHOP_NAME,
                rating: resData[key].SHOP_RATING,
                logo: { uri: `${HOST}/img/temp/` + resData[key].LOGO_URL }
            })
        }

        dispatch({
            type: GET_SHOPS,
            shops: shops,
            iter: iter
        })


    }
}


export const fetchShopProducts = (shopId, iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/shop/${shopId}/products/${iter}`, {
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
                    thumbnail: { uri: `${HOST}/img/temp/` + resData[key].THUMBNAIL },
                    ratingCount: resData[key].RATING_COUNT,

                })
            }
            // console.log(loadedProducts);
            dispatch({ type: GET_SHOP_PRODUCTS, products: loadedProducts, iter: iter })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error('error while retrieving products')
        }
    }
}

export const fetchShopDetails = (shopId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/shop/${shopId}/details`, {
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


            const shopDetails = {
                id: resData.SHOP_ID,
                name: resData.SHOP_NAME,
                description: resData.SHOP_DESCRIPTION,
                contact: resData.CONTACT_NUMBER,
                email: resData.SHOP_EMAIL,
                username: resData.SHOP_USERNAME,
                category: resData.SHOP_CATEGORY,
                rating: resData.SHOP_RATING,
                logo: { uri: `${HOST}/img/temp/` + resData.LOGO_URL },
                isFavorite: resData.IS_FAVOURITE,
                hasReviewed: resData.HAS_REVIEWED,
                ratingCount: resData.RATING_COUNT


            }
            // console.log(loadedProducts);
            dispatch({ type: GET_SHOP_DETAILS, shopDetails: shopDetails })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const followShop = (shopId) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/follow/shop`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shopId: shopId
            })
        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);

        if (Object.keys(resData)[0] === 'SUCCESS') {
            dispatch({
                type: FOLLOW_SHOP,
                message: 'Liked!'
            })
        }
        else if (Object.keys(resData)[0] === 'ERROR') {
            if (resData.ERROR === 'UNAUTHORIZED') {
                dispatch({
                    type: FOLLOW_SHOP,
                    message: 'Log in first!'
                })
            }
            else {
                dispatch({
                    type: FOLLOW_SHOP,
                    message: 'Failed to follow :('
                })
            }

        }

        dispatch(fetchMyShops())


    }
}

export const fetchMyShops = (iter = 0) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/myshoplist/${iter}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        // console.log(resData);

        const myShops = []

        for (const key in resData) {
            myShops.push({
                id: resData[key].SHOP_ID,
                name: resData[key].SHOP_NAME,
                rating: resData[key].SHOP_RATING,
                logo: { uri: `${HOST}/img/temp/` + resData[key].LOGO_URL }
            })
        }

        dispatch({
            type: GET_MY_SHOPS,
            myShops: myShops,
            iter: iter
        })

        // if (Object.keys(resData)[0] === 'SUCCESS') {
        //     dispatch({
        //         type: FOLLOW_SHOP,
        //         message: 'Liked!'
        //     })
        // }
        // else if (Object.keys(resData)[0] === 'ERROR') {
        //     if (resData.ERROR === 'UNAUTHORIZED') {
        //         dispatch({
        //             type: FOLLOW_SHOP,
        //             message: 'Log in first!'
        //         })
        //     }
        //     else {
        //         dispatch({
        //             type: FOLLOW_SHOP,
        //             message: 'Failed to follow :('
        //         })
        //     }

        // }


    }
}

export const unFollowShop = (shopId) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/unfollow/shop`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shopId: shopId
            })
        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);

        if (Object.keys(resData)[0] === 'SUCCESS') {
            dispatch({
                type: UNFOLLOW_SHOP,
                message: 'unFollowed!'
            })
        }
        else if (Object.keys(resData)[0] === 'ERROR') {
            if (resData.ERROR === 'UNAUTHORIZED') {
                dispatch({
                    type: UNFOLLOW_SHOP,
                    message: 'Log in first!'
                })
            }
            else {
                dispatch({
                    type: UNFOLLOW_SHOP,
                    message: 'Failed to unfollow :('
                })
            }

        }

        dispatch(fetchMyShops())


    }
}

export const fetchShopReviews = (shopId, iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/shop/${shopId}/reviews/${iter}`, {
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
            const shopReviews = []

            for (const key in resData) {
                shopReviews.push({
                    id: key,
                    shopId: resData[key].SHOP_ID,
                    reviewerId: resData[key].REVIEWER_ID,
                    rating: resData[key].RATING,
                    review: resData[key].REVIEW,
                    reviewDate: resData[key].REVIEW_DATE,
                    reviewerName: resData[key].USERNAME
                })
            }
            // console.log(loadedProducts);
            dispatch({ type: GET_SHOP_REVIEWS, shopReviews: shopReviews })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error('error while retrieving shop reviews')
        }
    }
}

export const addReview = (shopId, rating, review) => {
    return async (dispatch) => {

        try {
            const response = await fetch(`${HOST}/review/shop`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    shopId: shopId,
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

                dispatch(fetchShopReviews(shopId))

            }

            else {
                throw new Error(resData.ERROR)
            }



            // console.log('acrtion product: ' + product)


            //dispatch({ type: GET_PRODUCT_REVIEWS, productReviews: productReviews })
        }
        catch (err) {
            throw err;
        }

    }
}

export const fetchShopCategories = (shopId, iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/category/list-by-shops/${shopId}/${iter}`, {
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
            const categories = []



            for (const key in resData) {


                let inventory = resData[key].INVENTORY

                for (const id in inventory) {
                    inventory[id] = {
                        ...inventory[id],
                        id: id
                    }
                }



                categories.push({

                    id: resData[key].CATEGORY_ID,
                    name: resData[key].CATEGORY_NAME,
                    inventory: inventory

                })
            }
            // console.log(loadedProducts);
            await dispatch({ type: GET_SHOP_CATEGORIES, categories: categories, iter: iter })

        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}
export const getSellerPosts = (shopId, iter = 0) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/shop/${shopId}/posts/${iter}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        // console.log(resData);
        const posts = [];

        for (const key in resData) {
            const processedPhotos = resData[key].PHOTO.map((photo, index) => ({
                id: index.toString(),
                postId: photo.POST_ID,
                image: { uri: `${HOST}/img/temp/` + photo.IMAGE_URL }
            }))
            posts.push({
                type: SHOP_POST,
                id: resData[key].POST_ID,
                shopId: resData[key].SHOP_ID,
                text: resData[key].TEXT,
                date: resData[key].POST_DATE,
                productId: resData[key].PRODUCT_ID,
                numComments: resData[key].COMMENT,
                numReacts: resData[key].REACT,
                hasReacted: resData[key].HAS_REACTED,
                images: processedPhotos
            })
        }

        dispatch({
            type: GET_SELLER_POSTS,
            posts: posts,
            iter: iter
        })


    }
}
