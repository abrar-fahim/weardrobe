import HOST from '../../components/host'

export const GET_SHOP_POSTS = 'GET_SHOP_POSTS';
export const GET_FRIENDS_POSTS = 'GET_FRIENDS_POSTS';

export const GET_SHOP_POST_COMMENTS = 'GET_SHOP_POST_COMMENTS';
export const GET_SHOP_POST_REACTS = 'GET_SHOP_POST_REACTS';

export const GET_USER_POST_REACTS = 'GET_USER_POST_REACTS';
export const GET_USER_POST_COMMENTS = 'GET_USER_POST_COMMENTS';

export const GET_USER_BLOG_REACTS = 'GET_USER_BLOG_REACTS';
export const GET_USER_BLOG_COMMENTS = 'GET_USER_BLOG_COMMENTS';

import * as profileActions from './profile'
import * as popupActions from './Popup'

export const fetchShopPosts = (iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/newsfeed-stores/${iter}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
            }

            const resData = await response.json();
            const shopPosts = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    const processedImages = resData[key].PHOTO.map((item, index) => (
                        {
                            id: index.toString(),
                            postId: item.POST_ID,
                            image: { uri: `${HOST}/img/temp/` + item.IMAGE_URL }
                        }
                    ))
                    shopPosts.push({
                        type: 'SHOP',
                        id: resData[key].POST_ID,
                        shopId: resData[key].SHOP_ID,
                        date: resData[key].POST_DATE,
                        text: resData[key].TEXT,
                        productId: resData[key].PRODUCT_ID,
                        images: processedImages,
                        numComments: resData[key].COMMENT,
                        numReacts: resData[key].REACT,
                        hasReacted: resData[key].HAS_REACTED,
                        name: resData[key].SHOP_NAME,
                        username: resData[key].SHOP_USERNAME,
                        logo: { uri: `${HOST}/img/temp/` + resData[key].LOGO_URL },



                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SHOP_POSTS, shopPosts: shopPosts, iter: iter })
            }

            else {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {



            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}
export const fetchFriendsPosts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/newsfeed-friends/0`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const friendPosts = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    const processedImages = resData[key].PHOTO.map((item, index) => (
                        {
                            id: index.toString(),
                            postId: item.POST_ID,
                            image: { uri: `${HOST}/img/temp/` + item.IMAGE_URL }
                        }
                    ))
                    friendPosts.push({
                        type: 'CUSTOMER',
                        id: resData[key].POST_ID,
                        userId: resData[key].CUSTOMER_UID,
                        name: resData[key].FIRST_NAME + " " + resData[key].LAST_NAME,
                        date: resData[key].POST_DATE,
                        text: resData[key].CAPTIONS,
                        productId: resData[key].PRODUCT_ID,
                        username: resData[key].USERNAME,
                        logo: { uri: `${HOST}/img/temp/` + resData[key].PROFILE_PIC },
                        images: processedImages,
                        numComments: resData[key].COMMENT,
                        numReacts: resData[key].REACT,
                        hasReacted: resData[key].HAS_REACTED,

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_FRIENDS_POSTS, friendPosts: friendPosts })
            }

            else {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const fetchShopPostComments = (postId, iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/shop-post/${postId}/comments/${iter}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const shopPostComments = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    shopPostComments.push({
                        id: resData[key].COMMENT_ID,
                        postId: resData[key].POST_ID,
                        commenterId: resData[key].COMMENTER_ID,
                        date: resData[key].DATE,
                        username: resData[key].USERNAME,
                        comment: resData[key].COMMENT,

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SHOP_POST_COMMENTS, shopPostComments: shopPostComments, iter: iter })
            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}
export const fetchShopPostReacts = (postId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/shop-post/${postId}/reacts/0`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const shopPostReacts = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    shopPostReacts.push({
                        id: resData[key].POST_ID + resData[key].LIKER_UID,
                        likerId: resData[key].LIKER_UID,
                        date: resData[key].REACT_DATE,
                        type: resData[key].REACT_TYPE,
                        postId: resData[key].POST_ID,
                        username: resData[key].USERNAME

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SHOP_POST_REACTS, shopPostReacts: shopPostReacts })
            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const reactUserPost = (postId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/post/react`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    postId: postId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        // dispatch(fetchPostReacts(productId))
    }
}
export const unReactUserPost = (postId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/delete/post/react`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    postId: postId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        // dispatch(fetchPostReacts(productId))
    }
}


export const reactShopPost = (postId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/shop-post/react`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    postId: postId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            throw new Error(err)
        }

        //         dispatch(fetchShopPostReacts(postId))
    }
}
export const unReactShopPost = (postId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/delete/shop-post/react`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    postId: postId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //         dispatch(fetchShopPostReacts(postId))
    }
}

export const commentShopPost = (postId, comment) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/shop-post/comment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    comment: comment,
                    postId: postId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        // dispatch(fetchShopPostComments(postId, 0))
    }
}
export const deleteCommentShopPost = (commentId, postId) => {
    //here, iter is the current iter where the comment was found, needed to refetch comments in current iter
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/delete/shop-post/comment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    commentId: commentId,
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        // dispatch(fetchShopPostComments(postId, 0))
    }
}


export const commentUserPost = (postId, comment) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/post/comment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    comment: comment,
                    postId: postId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        // dispatch(fetchShopPostComments(postId, 0))
    }
}
export const deleteCommentUserPost = (commentId, postId) => {
    //here, iter is the current iter where the comment was found, needed to refetch comments in current iter
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/delete/post/comment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    commentId: commentId,
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        // dispatch(fetchShopPostComments(postId, 0))
    }
}


export const fetchUserPostComments = (postId, iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/post/${postId}/comments/${iter}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });


            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const userPostComments = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    userPostComments.push({
                        id: resData[key].COMMENT_ID,
                        postId: resData[key].CUSTOMER_POST_ID,
                        commenterId: resData[key].COMMENTER_ID,
                        date: resData[key].DATE,
                        username: resData[key].USERNAME,
                        comment: resData[key].COMMENT,

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SHOP_POST_COMMENTS, shopPostComments: userPostComments, iter: iter })
            }

            else {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}
export const fetchUserPostReacts = (postId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/post/${postId}/reacts/0`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const userPostReacts = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    userPostReacts.push({
                        id: resData[key].CUSTOMER_POST_ID + resData[key].LIKER_UID,
                        likerId: resData[key].LIKER_UID,
                        date: resData[key].REACT_DATE,
                        type: resData[key].REACT_TYPE,
                        postId: resData[key].CUSTOMER_POST_ID,
                        username: resData[key].USERNAME

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SHOP_POST_REACTS, shopPostReacts: userPostReacts })
            }

            else {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const fetchUserBlogComments = (blogId, iter = 0) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/blog/${blogId}/comments/${iter}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const userBlogComments = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    userBlogComments.push({
                        id: resData[key].COMMENT_ID,

                        blogId: resData[key].CUSTOMER_BLOG_ID,
                        commenterId: resData[key].COMMENTER_ID,
                        date: resData[key].DATE,
                        username: resData[key].USERNAME,
                        comment: resData[key].COMMENT,

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SHOP_POST_COMMENTS, shopPostComments: userBlogComments, iter: iter })
            }

            else {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}
export const fetchUserBlogReacts = (blogId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/blog/${blogId}/reacts/0`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            const userBlogReacts = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    userBlogReacts.push({
                        id: resData[key].POST_ID + resData[key].LIKER_UID,
                        likerId: resData[key].LIKER_UID,
                        date: resData[key].REACT_DATE,
                        type: resData[key].REACT_TYPE,
                        postId: resData[key].POST_ID,
                        username: resData[key].USERNAME

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SHOP_POST_REACTS, shopPostReacts: userBlogReacts })
            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const reactUserBlog = (blogId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/blog/react`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    blogId: blogId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //         dispatch(fetchShopPostReacts(postId))
    }
}
export const unReactUserBlog = (blogId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/delete/blog/react`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    blogId: blogId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //         dispatch(fetchShopPostReacts(postId))
    }
}

export const commentUserBlog = (blogId, comment) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/blog/comment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    comment: comment,
                    blogId: blogId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //dispatch(fetchShopPostReacts(postId))
    }
}
export const deleteCommentUserBlog = (commentId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/delete/blog/comment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    commentId: commentId
                })
            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('wrong!!');
            }

            const resData = await response.json();
            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //dispatch(fetchShopPostReacts(postId))
    }
}





export const createUserPost = (formData) => {
    return async (dispatch) => {
        try {

            const response = await fetch(`${HOST}/upload/post`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                //     'Accept': "application/json"
                // }

            });


            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error('response not ok');
            }


            const resData = await response.json();

            console.log(resData);

            if (Object.keys(resData)[0] === 'SUCCESS') {


            }

            else {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        dispatch(profileActions.fetchMyPosts())
    }
}


