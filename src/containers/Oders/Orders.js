import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/order'
import {connect} from 'react-redux'
class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }
    componentDidMount(){
        // axios.get('/orders.json').then(res=>{
        //     const fetchedOrders = [];
        //     for(let key in res.data){
        //         fetchedOrders.push({
        //             ...res.data[key],
        //             id: key
        //         })
        //     }
        //    this.setState({orders:fetchedOrders, loading: false})
        // }).catch(err=>{
        //     this.setState({loading: false})
        // })

        this.props.onOrderFetched(this.props.token)
    }
    render(){
        return(
            <div>
               {this.props.orders.map(ord =>{
                   return <Order key={ord.id} ingredients={ord.ingredients}
                    price={ord.price}
                />
               })}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        orders: state.order.order,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderFetched: (token)=> dispatch(actions.fetchOrder(token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios)) ;