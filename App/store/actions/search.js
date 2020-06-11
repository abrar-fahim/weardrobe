import HOST from "../../components/host";

export const SEARCH_ALL_USERNAMES = 'SEARCH_ALL_USERNAMES'

export const searchAllUsernames = (username, iter = 0) => {
    return async (dispatch) => {
        
        const search = username === '' ? ' ' : username
        const response = await fetch(`${HOST}/search/name/all/${search}/${iter}`, {
            method: 'GET',
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
            type: SEARCH_ALL_USERNAMES,
            results: results
        })


    }
}