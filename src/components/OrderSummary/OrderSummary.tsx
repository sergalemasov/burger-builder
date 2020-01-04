import React, {Fragment} from 'react';

const orderSummary = (props: any) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingredientName => (
            <li>
                <span>{ingredientName}: props.ingredients[ingredientName]</span>
            </li>
        ))

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>

            </ul>
        </Fragment>
    );
}

export default orderSummary;
