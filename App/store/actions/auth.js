
import { AsyncStorage } from "react-native";

// import tough from 'tough-cookie';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// const cookiejar = new tough.CookieJar();




export const login = (email, password) => {


    return async (dispatch) => {

        // const storedCookie = await AsyncStorage.getItem('user-cookie');

        // if (!storedCookie) {

        const response = await fetch('http://192.168.0.20:3000/login-customer', {
            // credentials: 'omit',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        // console.log('ion action uasasd')
        // const header = await response.headers
        // console.log(header)

        //const cookie = header.map["set-cookie"];

        // console.log(cookie)

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
        const response = await fetch('http://192.168.0.20:3000/authrequired', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"

            }
        })

        console.log('yaay')
        const resData = await response.json();  //converts 
        console.log(resData)

        if (Object.keys(resData)[0] === 'SUCCESS') {

            const userId = resData.SUCCESS;

            console.log("got user id from authreq: " + userId)

            dispatch({
                type: LOGIN,
                userId: userId
            })


        }
        
    }
}

export const logout = () => {

    return async dispatch => {

        const response = await fetch('http://192.168.0.20:3000/logout', {
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