import HOST from "../../components/host";

export const SEARCH_PEOPLE = 'SEARCH_PEOPLE'
export const SEARCH_SHOPS = 'SEARCH_SHOPS'
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS'
export const SEARCH_CATEGORIES = 'SEARCH_CATEGORIES'
import * as popupActions from './Popup'


export const searchAllUsernames = (username, iter = 0) => {
    return async (dispatch) => {

        const search = username === '' ? ' ' : username
        const response = await fetch(`${HOST}/search/name/all/${search}/${iter}`, {
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
        const results = [];

        if (Object.keys(resData)[0] !== 'ERROR') {
            for (const key in resData) {
                results.push({
                    id: resData[key].UID,
                    username: resData[key].USERNAME,
                    profilePic: { uri: `${HOST}/img/temp/` + resData[key].PROFILE_PIC },
                    firstName: resData[key].FIRST_NAME,
                    lastName: resData[key].LAST_NAME
                    // logo: {uri: `${HOST}/img/temp/` + resData[key].LOGO_URL}
                })
            }

            dispatch({
                type: SEARCH_PEOPLE,
                results: results,
                iter: iter
            })
        }




    }
}

export const searchAllFriendUsernames = (username, iter = 0) => {
    return async (dispatch) => {

        const search = username === '' ? ' ' : username
        const response = await fetch(`${HOST}/search/username/friends/${search}/${iter}`, {
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

        if (Object.keys(resData)[0] !== 'ERROR') {
            const results = [];

            for (const key in resData) {
                results.push({
                    id: resData[key].UID,
                    username: resData[key].USERNAME,
                    profilePic: { uri: `${HOST}/img/temp/` + resData[key].PROFILE_PIC },
                    firstName: resData[key].FIRST_NAME,
                    lastName: resData[key].LAST_NAME,
                    slave: resData[key].SLAVE,
                    master: resData[key].MASTER,
                    // logo: {uri: `${HOST}/img/temp/` + resData[key].LOGO_URL}
                })
            }

            dispatch({
                type: SEARCH_PEOPLE,
                results: results
            })
        }

        // console.log(resData);



    }
}

export const searchAllNames = (name, iter = 0) => {
    return async (dispatch) => {

        const search = name === '' ? ' ' : name
        const response = await fetch(`${HOST}/search/name/all/${search}/${iter}`, {
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


        if (Object.keys(resData)[0] !== 'ERROR') {
            const results = [];

            for (const key in resData) {
                results.push({
                    id: resData[key].UID,
                    username: resData[key].USERNAME,
                    profilePic: { uri: `${HOST}/img/temp/` + resData[key].PROFILE_PIC },
                    firstName: resData[key].FIRST_NAME,
                    lastName: resData[key].LAST_NAME,
                })
            }

            dispatch({
                type: SEARCH_PEOPLE,
                results: results
            })
        }
        // console.log(resData);



    }
}

export const searchAllShops = (name, iter = 0) => {
    return async (dispatch) => {

        const search = name === '' ? ' ' : name
        const response = await fetch(`${HOST}/search/shopname/${search}/${iter}`, {
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

        if (Object.keys(resData)[0] !== 'ERROR') {
            const results = [];

            for (const key in resData) {
                results.push({
                    id: resData[key].SHOP_ID,
                    name: resData[key].SHOP_NAME,
                    logo: { uri: `${HOST}/img/temp/` + resData[key].LOGO_URL },
                    username: resData[key].SHOP_USERNAME,
                    rating: resData[key].SHOP_RATING,
                    ratingCount: resData[key].RATING_COUNT,
                })
            }

            dispatch({
                type: SEARCH_SHOPS,
                results: results,
                iter: iter
            })
        }
        // console.log(resData);



    }
}

export const searchCategories = (name, iter = 0) => {
    return async (dispatch) => {

        const search = name === '' ? ' ' : name
        const response = await fetch(`${HOST}/search/category/${search}/${iter}`, {
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

        if (Object.keys(resData)[0] !== 'ERROR') {
            const results = [];

            for (const key in resData) {
                results.push({
                    id: resData[key].CATEGORY_ID,
                    name: resData[key].CATEGORY_NAME,
                    thumbnail: { uri: `${HOST}/img/temp/` + resData[key].THUMBNAIL },
                    description: resData[key].DESCRIPTION,
                })
            }

            dispatch({
                type: SEARCH_CATEGORIES,
                results: results,
                iter:iter
            })

        }
        // console.log(resData);



    }
}

export const searchAllProducts = (name, iter = 0) => {
    return async (dispatch) => {

        const search = name === '' ? ' ' : name
        const response = await fetch(`${HOST}/search/productname/${search}/${iter}`, {
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
        const results = [];

        if (Object.keys(resData)[0] !== 'ERROR') {
            for (const key in resData) {
                results.push({
                    id: resData[key].PRODUCT_ID,
                    name: resData[key].PRODUCT_NAME,
                    thumbnail: { uri: `${HOST}/img/temp/` + resData[key].THUMBNAIL },
                    price: resData[key].PRICE,
                    discount: resData[key].DISCOUNT,
                    rating: resData[key].PRODUCT_RATING,
                    ratingCount: resData[key].RATING_COUNT,

                })
            }

            dispatch({
                type: SEARCH_PRODUCTS,
                results: results,
                iter: iter
            })
        }




    }
}