import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation:{},
                value: 'fastest',
                valid: true
            }

        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    orderHander = (event) => {
        event.preventDefault();

       // this.setState({ loading: true })
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,   
            orderData: formData
        }

        this.props.onOrderBuger(order, this.props.token)
        // axios.post('/orders.json', order)
        //     .then(res => {
        //         this.setState({ loading: false })
        //         this.props.history.push('/');
        //     }).catch(err => {
        //         this.setState({ loading: false })
             
        //     });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const formData = {
            ...this.state.orderForm
        }
        const uptFormElement = {
            ...formData[inputIdentifier]

        }
        uptFormElement.value = event.target.value;
    
        uptFormElement.valid = this.checkValidity(uptFormElement.value, uptFormElement.validation)
        uptFormElement.touched = true;
        uptFormElement.formIsValid = true
        formData[inputIdentifier] = uptFormElement;
        let formIsValid = true;
        for(let key in formData){
            
            formIsValid = formData[key].valid && formIsValid;
          
        }
        
        this.setState({ orderForm: formData, formIsValid: formIsValid})
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push(
                {
                    ...this.state.orderForm[key],
                    id: key
                }
            )
        }
        let form = (<form onSubmit={this.orderHander}>
            {formElementsArray.map(formElement => {
                return <Input key={formElement.id} elementType={formElement.elementType}
                    elementConfig={formElement.elementConfig}
                    invalid={!formElement.valid}
                    validation={formElement.validation}
                    touched={formElement.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    value={formElement.value} />
            })}
            <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);

      
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }

}
const mapStateToProps= state =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispathToProps = dispath =>{
    return{
        onOrderBuger: (order, token)=> dispath(actions.purchaseStart(order, token))
    }
}


export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(ContactData, axios));