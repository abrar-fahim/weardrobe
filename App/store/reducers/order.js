import { GET_ORDERS } from '../actions/order'
const initialState = {
    orders: []

}


export default (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {

        case GET_ORDERS:
            return {
                orders: action.orders

            }


        default:
            return state;
    }
}