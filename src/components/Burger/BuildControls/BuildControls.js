import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(item => {
            return <BuildControl
                key={item.label}
                label={item.label}
                moreHandler = {()=> props.increment(item.type)}
                lessHandler = {()=> props.decrement(item.type)}
                disabled = {props.disabledInfo[item.type]}
            />;
        })}

        <button 
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}> ORDER NOW </button>

    </div>
)

export default buildControls;