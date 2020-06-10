import HOST from "../../components/host";
export const GET_GROUPS = 'GET_GROUPS';
export const GET_CHATS = 'GET_CHATS';

export const GET_SHOPPING_SESSIONS = 'GET_SHOPPING_SESSIONS';
export const GET_SESSION_CART = 'GET_SESSION_CART';


export const getGroups = (iter = 0) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/groups/${iter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);
        const groups = [];

        for (const key in resData) {
            groups.push({
                id: resData[key].GROUP_ID,
                createdById: resData[key].CREATED_BY_UID,
                name: resData[key].GROUP_NAME,
                startedAt: resData[key].STARTED_AT,
                score: resData[key].SCORE,
                participantId: resData[key].PARTICIPANT_UID,
                // logo: {uri: `${HOST}/img/temp/` + resData[key].LOGO_URL}
            })
        }

        dispatch({
            type: GET_GROUPS,
            groups: groups
        })


    }
}

export const getChats = (groupId, iter = 0) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/group/${groupId}/chat/${iter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);
        const chats = [];

        for (const key in resData) {
            chats.push({
                id: resData[key].SENDER_UID + resData[key].SENT_AT,
                senderId: resData[key].SENDER_UID,
                groupId: resData[key].GROUP_ID,
                text: resData[key].TEXT,
                photo: { uri: `${HOST}/img/temp/` + resData[key].PHOTO },
                time: resData[key].SENT_AT,
                // logo: {uri: `${HOST}/img/temp/` + resData[key].LOGO_URL}
            })
        }

        dispatch({
            type: GET_CHATS,
            chats: chats
        })


    }
}

export const getShoppingSessions = (groupId) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/session/${groupId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);
        const sessions = [];

        for (const key in resData) {
            sessions.push({
                id: resData[key].SESSION_ID,
                name: resData[key].SESSION_NAME,
                date: resData[key].DATE_CREATED,
                duration: resData[key].DURATION,
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
}

export const getSessionCart = (sessionId) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/session/cart/${sessionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            throw new Error('somethings wrong');
        }

        const resData = await response.json();  //converts response string to js object/array

        console.log(resData);
        const cartItems = [];

        for (const key in resData) {
            cartItems.push({
                id: resData[key].SESSION_ID,
                productId: resData[key].PRODUCT_ID,
                color: resData[key].COLOR,
                size: resData[key].SIZE,
                quantity: resData[key].QUANTITY,
                data: resData[key].DATE,
                customerId: resData[key].CUSTOMER_ID,
            })
        }

        dispatch({
            type: GET_SESSION_CART,
            cartItems: cartItems
        })


    }
}


