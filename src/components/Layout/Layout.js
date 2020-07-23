import React, {Component} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Auxilary/Aux';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';
class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    SideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() {
      
        return (
            <Aux>
                
                <Toolbar isAuth={this.props.isAuthenticated} clicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                 closed={this.SideDrawerClosedHandler} />

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }


}
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token != null
    }
}
export default connect(mapStateToProps)(Layout);