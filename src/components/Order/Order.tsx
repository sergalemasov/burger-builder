import React from 'react';
import classes from './Order.module.css';
import {Order} from 'shared/interfaces/order';

interface OrderProps {
    order: Order;
}

const order: React.FC<OrderProps> = (props) => {
    const ingredients = Object.keys(props.order.ingredients)
        .map(ingredientName => `${ingredientName} (${props.order.ingredients[ingredientName]})`)
        .join(', ');

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {props.order.totalPrice.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;