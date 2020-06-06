import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assests/images/burger-logo.png';

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt='Myburger'></img>
    </div>
);

export default Logo;