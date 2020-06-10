import HOST from "../../components/host";
export const GET_GROUPS = 'GET_GROUPS';
export const GET_CHATS = 'GET_CHATS';

export const getGroups = () => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}/get/groups`, {
            method: 'POST',
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
        const response = await fetch(`${HOST}/get/groups-chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId: groupId,
                iter: iter
            })

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


