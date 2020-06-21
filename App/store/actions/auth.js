import { AsyncStorage } from "react-native";
import HOST from "../../components/host";

// import tough from 'tough-cookie';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';

export const signup = ({ firstName, lastName, username, email, phone, birthday, password }) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/register-customer`, {
            // credentials: 'omit',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                phoneNumber: phone,
                birthday: birthday,
                password: password,
            })
        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);



        if (Object.keys(resData)[0] === 'SUCCESS') {

            const userId = resData.SUCCESS;

            console.log(userId)

            dispatch({
                type: LOGIN,
                userId: userId
            })


        }
        else {
            console.log('erroring')
            throw new Error(resData.ERROR)
        }
    }
}

export const login = (email, password, token) => {

    return async (dispatch) => {


        console.log('hjello')
        console.log(token)

        console.log('hi')

        const response = await fetch(`${HOST}/login-customer`,
            {
                // credentials: 'omit',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify(
                    {
                        username: email,
                        password: password,
                        notificationToken: token,

                    }
                )
            }
        );




        if (!response.ok) {
            throw new Error('somethings wrong');
            //console.log(response)
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);



        if (Object.keys(resData)[0] === 'SUCCESS') {

            const userId = resData.SUCCESS;

            console.log(userId)

            dispatch(
                {
                    type: LOGIN,
                    userId: userId
                }
            )


        }

        else {
            throw new Error(resData.ERROR)
        }

        // AsyncStorage.setItem('user-cookie', JSON.stringify({
        //     cookie: cookie
        // }))
        // }

        // else {
        //     const cookie = JSON.parse(storedCookie)
        // const response2 = await fetch('http://localhost:3000/authrequired', {
        //     method: 'GET',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Set-Cookie': cookie,
        //     }
        // })

        // const resData2 = await response2.json();  //converts 
        // console.log(resData2);
        // }




        // const cookies = await cookiejar.getCookies('http://localhost:3000/authrequired') ;

        // // const cookie = await CookieManager.get('http://localhost:3000/authrequired')

        //  console.log('cookieL ' + cookies)

    }
}

export const getUserId = () => {
    return async dispatch => {
        const response = await fetch(`${HOST}/authrequired`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"

            }
        })

        // console.log('yaay')
        const resData = await response.json();  //converts 
        console.log(resData)

        if (Object.keys(resData)[0] === 'SUCCESS') {

            const userId = resData.SUCCESS;

            console.log("got user id from authreq: " + userId)

            await dispatch({
                type: LOGIN,
                userId: userId
            })


        }

    }
}

export const logout = () => {

    return async dispatch => {

        const response = await fetch(`${HOST}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('wooong');
        }

        const resData = await response.json();

        console.log(resData);

        dispatch({
            type: LOGOUT

        })

        AsyncStorage.removeItem('user-cookie');

    }
}