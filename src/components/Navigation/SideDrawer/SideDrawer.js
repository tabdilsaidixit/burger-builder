import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const SideDrawer = (props) => {
    return (
        <Auxiliary>
            <Backdrop
            show={props.open} clicked={props.closed}></Backdrop>
            <div className={[classes.SideDrawer, props.open?classes.Open:classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Auxiliary>


    );
}
export default SideDrawer;
