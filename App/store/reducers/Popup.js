import { SET_MESSAGE } from '../actions/Popup'


const initialState = {
    message: '',
    isError: false
}


const popupReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message,
                isError: action.isError
            }
    }

    return state

}

export default popupReducer