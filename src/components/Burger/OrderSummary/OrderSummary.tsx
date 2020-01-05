import React, {Fragment} from 'react';
import classes from './OrderSummary.module.css';
import Button from 'components/UI/Button/Button';
import ButtonType from 'shared/enums/ButtonType.enum';

interface OrderSummaryProps {
    ingredients: Record<string, number>;
    cancelClicked: () => void;
    continueClicked: () => void;
    children?: React.ReactNode;
    totalPrice: string;
}

const orderSummary: React.FC<OrderSummaryProps> = props => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingredientName => (
            <li key={ingredientName}>
                <span className={classes.IngredientName}>{ingredientName}</span>: {props.ingredients[ingredientName]}
            </li>
        ));

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancelClicked} type={ButtonType.danger}>
                CANCEL
            </Button>
            <Button clicked={props.continueClicked} type={ButtonType.success}>
                CONTINUE
            </Button>
        </Fragment>
    );
}

export default orderSummary;
