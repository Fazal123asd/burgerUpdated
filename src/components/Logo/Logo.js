import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) =>(
    <div className={classes.Logo} style={{height:props.height, margin: props.margin}}>
        <img src={burgerLogo} alt="My Burger"/>
    </div>
);

export default logo;