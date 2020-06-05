import HOST from '../../components/host'
export const GET_SELF_POSTS = 'GET_SELF_POSTS';
export const GET_SELF_BLOGS = 'GET_SELF_BLOGS';

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
                    const processedImages = resData[key].PHOTO.map((item) => (
                        {
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
                    const processedImages = resData[key].PHOTO.map((item) => (
                        {
                            postId: item?.CUSTOMER_POST_ID,
                            image: { uri: `${HOST}/img/temp/` + item?.IMAGE_URL }
                        }
                    ))
                    blogs.push({
                        id: resData[key].BLOG_ID,
                        userId: resData[key].CUSTOMER_UID,
                        date: resData[key].BLOG_DATE,
                        writing: resData[key].WRITING,
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