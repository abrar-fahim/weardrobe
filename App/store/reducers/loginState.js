import { TOGGLE_LOGIN } from "../actions/loginAction";

const initialState = {
    login: false
}



export default function loginReducer (state = initialState, action) {
    // switch(action.type) {
    //     case TOGGLE_LOGIN:
    //         if(login) login = false;
    //         else login = true;
    //     default:
    //         return state;
    // }

    return state;
}