import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../../src/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props)
        this.props.onInitIngredients()

      
    }
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true })
        }else{
            this.props.onSetAuthRedirect('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        //alert('You can continue')

      
    //     const queryParams = [];
    //     for (let i in this.state.ingredients){
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    //     }
    //     queryParams.push("price="+ this.state.totalPrice)
    //     const queryString = queryParams.join('&')
    //     this.props.history.push({pathname:'/checkout',
    //                             search: '?' + queryString
    
    // });
    this.props.onPurchaseInit()
    this.props.history.push('/checkout')
    }

    updatePurchaseState=(ingredients)=> {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
       return sum > 0 ;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.prop.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

     
        let burger = this.props.error? <p>Something went wrong</p>:<Spinner />
        if (this.props.ingredients) {
             burger =(
                <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    isAuth={this.props.isAuthenticated}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    price={this.props.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            )

            orderSummary=  <OrderSummary
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.totalPrice}
            ingredients={this.props.ingredients} />
        }
        

            if (this.state.loading) {
                orderSummary = <Spinner />
            }

        return (
            
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}

                </Modal>
                {burger}
                
            </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
       
    }
}
const mapDispathToProps = dispatch =>{
    return{
        onIngredientAdded: (ingredientName)=> dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName)=> dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: ()=> dispatch(actions.initIngredients()),
        onPurchaseInit: ()=> dispatch(actions.purchased()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(BurgerBuilder, axios));