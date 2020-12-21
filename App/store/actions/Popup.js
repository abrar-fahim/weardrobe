import HOST from "../../components/host";

export const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = (message, isError = false) => {

    return async (dispatch) => {

        dispatch({
            type: SET_MESSAGE,
            message: message,
            isError: isError
        })
        
    }
}