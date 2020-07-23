import * as actionTypes from '../actions/actionTypes'

const initialState = {
    order: [],
    loading: false,
    purchased: false
}
const reducer =(state=initialState , action) =>{

    switch(action.type){

        case actionTypes.FETCH_ORDER_START : 
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                order: action.order,
                loading: false
            }

        case actionTypes.FETCH_ORDER_FAIL:
            return{
                ...state,
                loading: false
            }
        case actionTypes.PURCHASED:
            return{
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOder ={
                ...action.orderData,
                id: action.orderId
            }
        
        return{
                ...state,
                loading: false,
                order: state.order.concat(newOder),
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;