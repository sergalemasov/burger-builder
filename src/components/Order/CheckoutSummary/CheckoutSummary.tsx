import React from 'react';
import Burger from 'components/Burger/Burger';
import Button from 'components/UI/Button/Button';
import ButtonType from 'shared/enums/ButtonType.enum';
import classes from './CheckoutSummary.module.css'

interface CheckoutSummaryProps {
    ingredients: Record<string, number>;
    cancelClicked: () => void;
    continueClicked: () => void;
}

const checkoutSummary: React.FC<CheckoutSummaryProps> = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <Burger ingredients={props.ingredients}/>
            <Button
                clicked={props.cancelClicked}
                type={ButtonType.danger}>
                CANCEL
            </Button>
            <Button
                clicked={props.continueClicked}
                type={ButtonType.success}>
                CONTINUE
            </Button>
        </div>
    );
};

export default checkoutSummary;