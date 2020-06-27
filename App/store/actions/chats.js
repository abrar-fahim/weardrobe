import HOST, { IMG_URL } from "../../components/host";
import io from "socket.io-client"
export const GET_GROUPS = 'GET_GROUPS';
export const GET_CHATS = 'GET_CHATS';

export const GET_SHOPPING_SESSIONS = 'GET_SHOPPING_SESSIONS';
export const GET_SESSION_CART = 'GET_SESSION_CART';
export const GET_GROUP_PEOPLE = 'GET_GROUP_PEOPLE';

export const SET_SESSION_ACTIVE = 'SET_SESSION_ACTIVE';
export const UPDATE_SESSION_TIMER = 'UPDATE_SESSION_TIMER';

export const ADD_CHAT = 'ADD_CHAT';


import * as popupActions from './Popup'
import * as productActions from './products'

let socket = null;






export const getGroups = (iter = 0) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/groups/${iter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }

        const resData = await response.json();  //converts response string to js object/array

        // console.log(resData);

        if (Object.keys(resData)[0] !== 'ERROR') {
            const groups = [];

            for (const key in resData) {
                resData[key].GROUP_ID ?
                    groups.push({
                        id: resData[key].GROUP_ID,
                        createdById: resData[key].CREATED_BY_UID,
                        name: resData[key].GROUP_NAME,
                        startedAt: resData[key].STARTED_AT,
                        score: resData[key].SCORE,
                        participantId: resData[key].PARTICIPANT_UID,
                        participants: resData[key].PARTICIPANTS,
                        type: 'GROUP'
                    })
                    :
                    groups.push({
                        id: resData[key].CHAT_ID,
                        createdById: resData[key].CREATED_BY_UID,
                        name: resData[key].SHOP_NAME,
                        startedAt: resData[key].CREATED_AT,
                        logo: { uri: `${IMG_URL}` + resData[key].LOGO_URL },
                        type: 'SHOP'
                    })
            }

            dispatch({
                type: GET_GROUPS,
                groups: groups,
                iter: iter
            })
        }

        else {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }




    }
}

export const getChats = (groupId, iter = 0, type = 'GROUP') => {

    //here iter means after which chat i wanna get chats, so just send length of chat array in store
    return async (dispatch) => {

        const url = type === 'GROUP' ? `${HOST}/get/group/${groupId}/chat/${iter}` : `${HOST}/get/shop-chat/${groupId}/${iter}`


        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })

        if (!response.ok) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }

        const resData = await response.json();  //converts response string to js object/array

        if (Object.keys(resData)[0] !== 'ERROR') {
            const chats = [];

            for (const key in resData) {


                const chatType = resData[key].TYPE;
                if (chatType === 'TEXT') {
                    chats.push({
                        id: type === 'GROUP' ? resData[key].SENDER_UID + resData[key].SENT_AT + key : resData[key].SENDER_ID + resData[key].SENT_AT + key,
                        senderId: type === 'GROUP' ? resData[key].SENDER_UID : resData[key].SENDER_ID,
                        groupId: type === 'GROUP' ? resData[key].GROUP_ID : resData[key].CHAT_ID,
                        message: resData[key].MESSAGE,
                        time: resData[key].SENT_AT,
                        type: chatType
                    })
                }
                else if (chatType === 'PHOTO') {
                    chats.push({
                        id: type === 'GROUP' ? resData[key].SENDER_UID + resData[key].SENT_AT + key : resData[key].SENDER_UID + resData[key].SENT_AT + key,
                        senderId: type === 'GROUP' ? resData[key].SENDER_UID : resData[key].SENDER_ID,
                        groupId: type === 'GROUP' ? resData[key].GROUP_ID : resData[key].CHAT_ID,
                        message: { uri: `${HOST}/img/temp/` + resData[key].MESSAGE },
                        time: resData[key].SENT_AT,
                        type: chatType
                    })
                }



                // const productId = resData[key].PRODUCT_ID;



                // if (productId && productId !== "") {
                //     let product = await productActions.fetchProductDetailsDirect(productId);
                //     product = {
                //         ...product,
                //         photos: product.photos.map(photo => ({
                //             image: { uri: IMG_URL + photo.IMAGE_URL }
                //         }))
                //     }
                //     chats.push({
                //         id: resData[key].SENDER_UID + resData[key].SENT_AT + key,
                //         senderId: resData[key].SENDER_UID,
                //         groupId: type === 'GROUP' ? resData[key].GROUP_ID : resData[key].CHAT_ID,
                //         text: resData[key].TEXT,
                //         photo: resData[key].PHOTO ? { uri: `${HOST}/img/temp/` + resData[key].PHOTO } : null,
                //         time: resData[key].SENT_AT,
                //         product: product
                //         // logo: {uri: `${HOST}/img/temp/` + resData[key].LOGO_URL}
                //     })

                // }

                // else {
                //     chats.push({
                //         id: resData[key].SENDER_UID + resData[key].SENT_AT + key,
                //         senderId: resData[key].SENDER_UID,
                //         groupId: type === 'GROUP' ? resData[key].GROUP_ID : resData[key].CHAT_ID,
                //         text: resData[key].TEXT,
                //         photo: resData[key].PHOTO ? { uri: `${HOST}/img/temp/` + resData[key].PHOTO } : null,
                //         time: resData[key].SENT_AT,
                //         // logo: {uri: `${HOST}/img/temp/` + resData[key].LOGO_URL}
                //     })
                // }




                //productIds can be null, "", or valid,


            }

            // chats.reverse()

            dispatch({
                type: GET_CHATS,
                chats: chats,
                iter: iter
            })
        }
        else {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }
    }
}

export const getShoppingSessions = (groupId, iter = 0) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/session/${groupId}/${iter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }

        const resData = await response.json();  //converts response string to js object/array

        // console.log(resData);
        if (Object.keys(resData)[0] !== 'ERROR') {
            const sessions = [];

            for (const key in resData) {
                sessions.push({
                    id: resData[key].SESSION_ID,
                    name: resData[key].SESSION_NAME,
                    date: resData[key].DATE_CREATED,
                    duration: resData[key].DURATION,      //assuming duration is in min
                    isExpired: resData[key].IS_EXPIRED,
                    discount: resData[key].DISCOUNT,
                    minCost: resData[key].MIN_COST,
                })
            }

            dispatch({
                type: GET_SHOPPING_SESSIONS,
                sessions: sessions
            })

        }
        else {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }


    }
}

export const getSessionCart = (sessionId) => {


    return async (dispatch) => {

        try {
            const response = await fetch(`${HOST}/get/session-cart/${sessionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (!response.ok) {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
            }

            const resData = await response.json();  //converts response string to js object/array

            // console.log(resData);
            if (Object.keys(resData)[0] !== 'ERROR') {
                const cartItems = [];

                for (const key in resData) {
                    cartItems.push({
                        id: resData[key].PRODUCT_ID + resData[key].CUSTOMER_ID + resData[key].SIZE + resData[key].COLOR,
                        productId: resData[key].PRODUCT_ID,
                        color: resData[key].COLOR,
                        username: resData[key].USERNAME,
                        thumbnail: { uri: `${HOST}/img/temp/` + resData[key].THUMBNAIL },
                        productName: resData[key].PRODUCT_NAME,
                        shopName: resData[key].SHOP_NAME,
                        size: resData[key].SIZE,
                        quantity: resData[key].QUANTITY,
                        data: resData[key].DATE,
                        customerId: resData[key].CUSTOMER_ID,
                        username: resData[key].USERNAME,
                        profilePic: { uri: `${HOST}/img/temp/` + resData[key].PROFILE_PIC },
                        price: resData[key].PRICE,
                    })
                }

                dispatch({
                    type: GET_SESSION_CART,
                    cartItems: cartItems
                })
            }
            else {
                dispatch(popupActions.setMessage('Something Went Wrong', true))
            }
        }

        catch (err) {
            console.log(err)
        }





    }
}

export const setSessionActive = (groupId, sessionId, timeRemaining = 30, expiresIn) => {
    return async (dispatch) => {


        dispatch({
            type: SET_SESSION_ACTIVE,
            sessionGroupId: groupId,
            sessionId: sessionId,
            timeLeft: timeRemaining,
            expiresIn: expiresIn
        })




    }
}


export const updateSessionTimer = (timeRemaining) => {
    return async (dispatch) => {


        dispatch({
            type: UPDATE_SESSION_TIMER,
            timeLeft: timeRemaining
        })




    }
}
export const startSession = (groupId, sessionName) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/session/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupId: groupId,
                sessionName: sessionName
            })

        });

        if (!response.ok) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);

        if (Object.keys(resData)[0] === 'SUCCESS') {

            const sessionId = resData.SESSION_ID

            await dispatch(getShoppingSessions(groupId))

            dispatch(setSessionActive(groupId, sessionId))





        }
        else {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }

    }
}

export const getGroupPeople = (groupId) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/group/${groupId}/participants`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }

        const resData = await response.json();  //converts response string to js object/array

        // console.log(resData);
        if (Object.keys(resData)[0] !== 'ERROR') {
            const people = [];

            for (const key in resData) {
                people.push({
                    id: resData[key].PARTICIPANT_UID,
                    firstName: resData[key].FIRST_NAME,
                    lastName: resData[key].LAST_NAME,
                    profilePic: { uri: `${HOST}/img/temp/` + resData[key].PROFILE_PIC },
                    username: resData[key].USERNAME,
                })
            }

            dispatch({
                type: GET_GROUP_PEOPLE,
                groupPeople: people
            })
        }
        else {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }



    }
}

export const createGroup = (participants) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/create-group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                participants: participants
            })

        });

        if (!response.ok) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);


        if (Object.keys(resData)[0] === 'SUCCESS') {


        }
        else {
            dispatch(popupActions.setMessage('Couldn\'t create group', true))

        }
        // const cartItems = [];

        // for (const key in resData) {
        //     cartItems.push({
        //         id: resData[key].SESSION_ID,
        //         productId: resData[key].PRODUCT_ID,
        //         color: resData[key].COLOR,
        //         size: resData[key].SIZE,
        //         quantity: resData[key].QUANTITY,
        //         data: resData[key].DATE,
        //         customerId: resData[key].CUSTOMER_ID,
        //     })
        // }

        // dispatch({
        //     type: GET_SESSION_CART,
        //     cartItems: cartItems
        // })


    }
}
export const deleteGroup = (groupId) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/delete-group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupId: groupId
            })

        });

        if (!response.ok) {
            dispatch(popupActions.setMessage('Something Went Wrong', true))
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);


        if (Object.keys(resData)[0] === 'SUCCESS') {


        }
        else {
            dispatch(popupActions.setMessage('Couldn\'t delete group', true))

        }
        // const cartItems = [];

        // for (const key in resData) {
        //     cartItems.push({
        //         id: resData[key].SESSION_ID,
        //         productId: resData[key].PRODUCT_ID,
        //         color: resData[key].COLOR,
        //         size: resData[key].SIZE,
        //         quantity: resData[key].QUANTITY,
        //         data: resData[key].DATE,
        //         customerId: resData[key].CUSTOMER_ID,
        //     })
        // }

        // dispatch({
        //     type: GET_SESSION_CART,
        //     cartItems: cartItems
        // })


    }
}

export const connectSocket = () => {
    socket = io(`${HOST}/group-chat`)
}

export const connectToGroup = (groupId) => {


    return async (dispatch) => {

        console.log('connecting')
        console.log(socket.id)



        socket.emit('join', `{"groupId": "${groupId}"}`);

        socket.on('sendMessageGroup', async (chat) => {
            console.log(chat)
            // dispatch(getChats(groupId))
            // console.log(text)



            const chatType = chat.TYPE;

            if (chatType === 'TEXT') {
                dispatch({
                    type: ADD_CHAT,
                    chat: {
                        id: chat.SENDER_UID + chat.SENT_AT + Date.now(),
                        senderId: chat.SENDER_UID,
                        groupId: chat.GROUP_ID,
                        message: chat.MESSAGE,
                        time: chat.SENT_AT,
                        type: chatType
                    }


                })
            }

            else if (chatType === 'PHOTO') {

                dispatch({
                    type: ADD_CHAT,
                    chat: {
                        id: chat.SENDER_UID + chat.SENT_AT + Date.now(),
                        senderId: chat.SENDER_UID,
                        groupId: chat.GROUP_ID,
                        message: { uri: `${HOST}/img/temp/` + chat.MESSAGE },
                        time: chat.SENT_AT,
                        type: chatType

                    }


                })
            }

            else if (chatType === 'PRODUCT') {
                const productId = chat.MESSAGE;
                let product = await productActions.fetchProductDetailsDirect(productId);
                product = {
                    ...product,
                    photos: product.photos.map(photo => ({
                        image: { uri: IMG_URL + photo.IMAGE_URL }
                    }))
                }
                dispatch({
                    type: ADD_CHAT,
                    chat: {
                        id: chat.SENDER_UID + chat.SENT_AT + Date.now(),
                        senderId: chat.SENDER_UID,
                        groupId: chat.GROUP_ID,
                        time: chat.SENT_AT,
                        message: product,
                        type: chatType

                    }


                })
            }

        });


        socket.on('status', (data) => {
            console.log('status: ' + data)
        });
    }
}

export const sendChat = (groupId, text, type = 'GROUP') => {


    return async (dispatch) => {

        type === 'GROUP' ? await socket?.emit('sendMessageGroup', `{"groupId": "${groupId}", "message":"${text}", "type":"TEXT"}`) : await socket?.emit('sendMessageGroup', `{"chatId": "${groupId}", "message":"${text}", "type":"TEXT"}`)

        socket?.emit('status');

    }
}

export const sendProduct = (groupId, productId) => {

    console.log('sending product')

    return async (dispatch) => {

        await socket?.emit('sendMessageGroup', `{"groupId": "${groupId}", "message":"${productId}"}, "type: "PRODUCT"`);

        socket?.emit('status');

    }
}


export const disconnectFromGroup = (groupId) => {




    return async (dispatch) => {

        // socket?.close()
        console.log('close')
        socket.emit('disconnect');
        socket.removeListener('sendMessageGroup')


    }
}

// export const sendPhoto = (groupId, formData) => {
//     return async (dispatch) => {
//         const response = await fetch(`${HOST}/group/send-photo`, {
//             method: 'POST',
//             body: formData
//         });

//         if (!response.ok) {
//             throw new Error('somethings wrong');
//         }

//         const resData = await response.json();  //converts response string to js object/array

//         console.log(resData);

//         if (Object.keys(resData)[0] === 'SUCCESS') {

//             await dispatch(sendChat(groupId, ''));


//         }
//         else {

//         }
//         // const cartItems = [];

//         // for (const key in resData) {
//         //     cartItems.push({
//         //         id: resData[key].SESSION_ID,
//         //         productId: resData[key].PRODUCT_ID,
//         //         color: resData[key].COLOR,
//         //         size: resData[key].SIZE,
//         //         quantity: resData[key].QUANTITY,
//         //         data: resData[key].DATE,
//         //         customerId: resData[key].CUSTOMER_ID,
//         //     })
//         // }

//         // dispatch({
//         //     type: GET_SESSION_CART,
//         //     cartItems: cartItems
//         // })


//     }
// }

export const sendPhotoFile = (groupId, image) => {

    return async (dispatch) => {

        // var reader = new FileReader();
        // reader.onload = function (evt) {
        //     //code to send photo
        //     var msg = {};
        //     msg.groupId = groupId;
        //     msg.photo = evt.target.result;
        //     msg = JSON.stringify(msg);
        //     socket.emit('sendMessageGroup', msg);
        // };


        // let pic = await fetch(image.uri);
        // pic = await pic.blob()
        // console.log
        //reader.readAsDataURL(pic);





        socket.emit('sendMessageGroup', JSON.stringify({
            groupId: groupId,
            photo: image,
            type: 'PHOTO'
        }))
        socket?.emit('status');



    }
}

// export const sendPhotoFile2 = (formData) => {

//     return async (dispatch) => {

//         // var reader = new FileReader();
//         // reader.onload = function (evt) {
//         //     //code to send photo
//         //     var msg = {};
//         //     msg.groupId = groupId;
//         //     msg.photo = evt.target.result;
//         //     msg = JSON.stringify(msg);
//         //     socket.emit('sendMessageGroup', msg);
//         // };
//         // let pic = await fetch(image.uri);
//         // pic = await pic.blob()
//         // reader.readAsDataURL(pic);

//         socket.emit('sendMessageGroup', JSON.stringify(formData))
//         // socket?.emit('status');



//     }
// }






