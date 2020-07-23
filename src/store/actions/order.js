import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}


export const purchaseBurgerFail = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
       
    }
}

export const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchased = () =>{
    return{
        type: actionTypes.PURCHASED
    }
}

export const purchaseStart = (orderData,token) =>{
    return dispath =>{
        dispath(purchaseBurgerStart())
        axios.post('/orders.json?auth='+ token, orderData)
        .then(res => {
           dispath(purchaseBurgerSuccess(res.data.name, orderData))
        }).catch(err => {
           dispath(purchaseBurgerFail(err))
         
        });
    }
}

export const fetchOrderSuccess = (order) =>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: order
    }
}

export const fetchOrderFail = (error) =>{
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
      
    }
}

export const fetchOrderStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const fetchOrder = (token) =>{
    return dispatch =>{
        dispatch(fetchOrderStart())
        axios.get('/orders.json?auth='+ token).then(res=>{
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
           //this.setState({orders:fetchedOrders, loading: false})
           dispatch(fetchOrderSuccess(fetchedOrders))
        }).catch(err=>{
            //this.setState({loading: false})
            dispatch(fetchOrderFail())
        })
    }
}