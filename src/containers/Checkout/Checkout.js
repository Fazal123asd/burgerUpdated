import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner//Spinner'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    //  componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //         const ingredients ={};
    //         let price=0;
    //         for (let param of query.entries()) {
    //             if(param[0] === 'price'){
    //                 price = param[1]
    //             }else{
    //                 ingredients[param[0]] = +param[1]
    //             }


    //         }
    //         this.setState({ingredients: ingredients, totalPrice: price});
    //  }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary =  <Redirect to='/' />
        if (this.props.ingredients) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ingredients} />
                </div>


            )
        }
        return (
            <div>
                {summary}
                <Route path='/checkout/contact-data'
                    // render={(props)=> <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>}
                    component={ContactData} />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);