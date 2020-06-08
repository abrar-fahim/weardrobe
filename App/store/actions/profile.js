import HOST from '../../components/host'
export const GET_SELF_POSTS = 'GET_SELF_POSTS';
export const GET_SELF_BLOGS = 'GET_SELF_BLOGS';
export const GET_FOLLOW_REQUESTS = 'GET_FOLLOW_REQUESTS';

export const GET_FOLLOW_COUNTS = 'GET_FOLLOW_COUNTS';
export const GET_MY_FOLLOWERS = 'GET_MY_FOLLOWERS';
export const GET_MY_FOLLOWING = 'GET_MY_FOLLOWING';

export const GET_POSTS = 'GET_POSTS';
export const GET_BLOGS = 'GET_BLOGS';

export const GET_PROFILE = 'GET_PROFILE';
export const GET_MY_PROFILE = 'GET_MY_PROFILE';



export const fetchMyPosts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/self/posts/0`, {
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
            const posts = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    const processedImages = resData[key].PHOTO.map((item, index) => (
                        {
                            id: index.toString(),
                            postId: item.CUSTOMER_POST_ID,
                            image: { uri: `${HOST}/img/temp/` + item.IMAGE_URL }
                        }
                    ))
                    posts.push({
                        id: resData[key].POST_ID,
                        userId: resData[key].CUSTOMER_UID,
                        postDate: resData[key].POST_DATE,
                        text: resData[key].CAPTIONS,
                        productId: resData[key].PRODUCT_ID,
                        images: processedImages,
                        numComments: resData[key].COMMENT,
                        numReacts: resData[key].REACT,

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SELF_POSTS, posts: posts })
            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}
export const fetchUserPosts = (userId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/user/${userId}/posts/0`, {
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
            const posts = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    const processedImages = resData[key].PHOTO.map((item, index) => (

                        {
                            id: index.toString(),
                            postId: item.CUSTOMER_POST_ID,
                            image: { uri: `${HOST}/img/temp/` + item.IMAGE_URL }
                        }
                    ))
                    posts.push({
                        id: resData[key].POST_ID,
                        userId: resData[key].CUSTOMER_UID,
                        postDate: resData[key].POST_DATE,
                        captions: resData[key].CAPTIONS,
                        productId: resData[key].PRODUCT_ID,
                        images: processedImages,
                        numComments: resData[key].COMMENT,
                        numReacts: resData[key].REACT,
                        hasReacted: resData[key].HAS_REACTED

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_POSTS, posts: posts })
            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}

export const fetchMyBlogs = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${HOST}/get/self/blogs/0`, {
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
            const blogs = [];

            if (Object.keys(resData)[0] !== 'ERROR') {

                for (const key in resData) {
                    const processedImages = resData[key].PHOTO.map((item, index) => (
                        {
                            id: index.toString(),
                            postId: item?.CUSTOMER_POST_ID,
                            image: { uri: `${HOST}/img/temp/` + item?.IMAGE_URL }
                        }
                    ))

                    const processedTexts = resData[key].WRITING.map((item, index) => (
                        {
                            id: index.toString(),
                            text: item.TEXT


                        }
                    ))
                    blogs.push({
                        id: resData[key].BLOG_ID,
                        userId: resData[key].CUSTOMER_UID,
                        date: resData[key].BLOG_DATE,
                        texts: processedTexts,
                        images: processedImages,
                        numComments: resData[key].COMMENT,
                        numReacts: resData[key].REACT,
                        structure: resData[key].STRUCTURE

                    })
                }
                // console.log(loadedProducts);
                dispatch({ type: GET_SELF_BLOGS, blogs: blogs })
            }

            else {
                throw new Error(resData.ERROR)
            }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }
    }
}


export const createUserBlog = (formData) => {
    return async (dispatch) => {
        try {

            const response = await fetch(`${HOST}/upload/blog`, {
                method: 'POST',
                body: formData,
                //no headers here, otherwise error

            });


            if (!response.ok) {
                throw new Error('response not ok');
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
            throw new Error(err)
        }

        dispatch(fetchMyBlogs())
    }
}

export const deleteUserBlog = (blogId) => {
    return async (dispatch) => {
        try {

            const response = await fetch(`${HOST}/delete/user-blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    blogId: blogId
                })
                //no headers here, otherwise error

            });


            if (!response.ok) {
                throw new Error('response not ok');
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
            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const deleteUserPost = (postId) => {
    return async (dispatch) => {
        try {

            const response = await fetch(`${HOST}/delete/user-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    postId: postId
                }),
                //no headers here, otherwise error

            });


            if (!response.ok) {
                throw new Error('response not ok');
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
            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const followUser = (userId) => {
    return async (dispatch) => {
        try {

            const response = await fetch(`${HOST}/follow/customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    uid: userId
                }),
                //no headers here, otherwise error

            });


            if (!response.ok) {
                throw new Error('response not ok');
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
            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const getFollowRequests = () => {
    return async (dispatch) => {
        try {



            const response = await fetch(`${HOST}/get/follow-requests/0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },


            });



            if (!response.ok) {
                throw new Error('response not ok');
            }



            const resData = await response.json();


            const followRequests = []


            // if (Object.keys(resData)[0] === 'SUCCESS') {

            for (const key in resData) {
                followRequests.push({
                    id: resData[key].UID,
                    firstName: resData[key].FIRST_NAME,
                    lastName: resData[key].LAST_NAME,
                    username: resData[key].USERNAME,
                })
            }

            dispatch({
                type: GET_FOLLOW_REQUESTS,
                followRequests: followRequests
            })





            // }


            // else {
            //     throw new Error(resData.ERROR)
            // }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const acceptFollowRequest = (userId) => {
    return async (dispatch) => {
        try {

            const response = await fetch(`${HOST}/follow/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    uid: userId
                }),
                //no headers here, otherwise error

            });


            if (!response.ok) {
                throw new Error('response not ok');
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
            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const getFollowCounts = (userId) => {
    return async (dispatch) => {
        try {


            const response = await fetch(`${HOST}/get/follow-counts/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },


            });



            if (!response.ok) {
                throw new Error('response not ok');
            }



            const resData = await response.json();

            const numFollowers = resData[0].FOLLOWERS;
            const numFollowing = resData[0].FOLLOWING;
            const numFollowingShop = resData[0].FOLLOWING_SHOP;



            //const followRequests = []


            // if (Object.keys(resData)[0] === 'SUCCESS') {

            // for(const key in resData) {
            //     followRequests.push({
            //         id: resData[key].UID,
            //         firstName: resData[key].FIRST_NAME,
            //         lastName: resData[key].LAST_NAME,
            //         username: resData[key].USERNAME,
            //     })
            // }





            dispatch({
                type: GET_FOLLOW_COUNTS,
                numFollowers: numFollowers,
                numFollowing: numFollowing,
                numFollowingShop: numFollowingShop

            })





            // }


            // else {
            //     throw new Error(resData.ERROR)
            // }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const getMyFollowers = (userId) => {
    return async (dispatch) => {
        try {



            const response = await fetch(`${HOST}/get/self-followers/0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },


            });



            if (!response.ok) {
                throw new Error('response not ok');
            }



            const resData = await response.json();


            const followers = []


            // if (Object.keys(resData)[0] === 'SUCCESS') {

            for (const key in resData) {
                followers.push({
                    id: resData[key].UID,
                    firstName: resData[key].FIRST_NAME,
                    lastName: resData[key].LAST_NAME,
                    username: resData[key].USERNAME,
                })
            }

            dispatch({
                type: GET_MY_FOLLOWERS,
                followers: followers
            })





            // }


            // else {
            //     throw new Error(resData.ERROR)
            // }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const getMyFollowing = () => {
    return async (dispatch) => {
        try {



            const response = await fetch(`${HOST}/get/self-following-people/0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },


            });



            if (!response.ok) {
                throw new Error('response not ok');
            }



            const resData = await response.json();


            const following = []


            // if (Object.keys(resData)[0] === 'SUCCESS') {

            for (const key in resData) {
                following.push({
                    id: resData[key].UID,
                    firstName: resData[key].FIRST_NAME,
                    lastName: resData[key].LAST_NAME,
                    username: resData[key].USERNAME,
                })
            }

            dispatch({
                type: GET_MY_FOLLOWING,
                following: following
            })





            // }


            // else {
            //     throw new Error(resData.ERROR)
            // }



        }
        catch (err) {
            //send to custom analytics server
            //console.log('error on action')
            //dispatch({ type: SET_ERROR, message: 'error while retrieving products' })
            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const getProfile = (userId, params) => {

    //implement this later
    return async (dispatch) => {
        try {



            const response = await fetch(`${HOST}/user-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    uid: userId,
                    params: params
                })


            });



            if (!response.ok) {
                throw new Error('response not ok');
            }



            const resData = await response.json();


            const profile = {
                firstName: resData.FIRST_NAME,
                lastName: resData.LAST_NAME,
                email: resData.EMAIL,
                phoneNumber: resData.PHONE,
                birthday: resData.BIRTHDAY,
                profilePic: { uri: `${HOST}/img/temp/` + resData.PROFILE_PIC },
                bio: resData.BIO,
                privacyType: resData.PRIVACY_TYPE,
                points: resData.POINTS,
                type: resData.TYPE,

            }
            dispatch({
                type: GET_PROFILE,
                profile: profile
            })


        }
        catch (err) {

            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const getMyProfile = (userId, params) => {

    //implement this later
    return async (dispatch) => {
        try {



            const response = await fetch(`${HOST}/user-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    uid: userId,
                    params: params
                })


            });



            if (!response.ok) {
                throw new Error('response not ok');
            }



            const resData = await response.json();


            const profile = {
                firstName: resData.FIRST_NAME,
                lastName: resData.LAST_NAME,
                email: resData.EMAIL,
                phoneNumber: resData.PHONE,
                birthday: resData.BIRTHDAY,
                profilePic: { uri: `${HOST}/img/temp/` + resData.PROFILE_PIC },
                bio: resData.BIO,
                privacyType: resData.PRIVACY_TYPE,
                points: resData.POINTS,
                type: resData.TYPE,

            }
            dispatch({
                type: GET_MY_PROFILE,
                profile: profile
            })


        }
        catch (err) {

            throw new Error(err)
        }

        //dispatch(fetchMyBlogs())
    }
}

export const uploadProfilePicture = (formData) => {
    return async (dispatch) => {
        try {

            const response = await fetch(`${HOST}/upload/profile-pic`, {
                method: 'POST',
                body: formData,
                //no headers here, otherwise error

            });


            if (!response.ok) {
                throw new Error('response not ok');
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
            throw new Error(err)
        }


    }
}



