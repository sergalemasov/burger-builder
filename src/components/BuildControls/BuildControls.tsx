import React from 'react';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

interface BuildControlsProps {
    ingredientAdded: (type: BurgerIngredientType) => void;
    ingredientRemoved: (type: BurgerIngredientType) => void;
    ingredients: Record<string, number>;
    totalPrice: number;
}

const controls: {type: BurgerIngredientType, label: string}[] = [
    {
        type: BurgerIngredientType.bacon,
        label: 'Bacon'
    },
    {
        type: BurgerIngredientType.cheese,
        label: 'Cheese'
    },
    {
        type: BurgerIngredientType.salad,
        label: 'Salad'
    },
    {
        type: BurgerIngredientType.meat,
        label: 'Meat'
    }
];

const buildControls = (props: BuildControlsProps) => {
    const isPurchasable = Object.values(props.ingredients)
        .some(value => !!value);

    return (
        <div className={classes.BuildControls}>
            <div>Current price: <strong>{props.totalPrice}</strong></div>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    isRemovingDisabled={!props.ingredients[control.type]}
                    ingredientAdded={() => props.ingredientAdded(control.type)}
                    ingredientRemoved={() => props.ingredientRemoved(control.type)}
                />
            ))}
            <button
                disabled={!isPurchasable}
                className={classes.OrderButton}>
                ORDER NOW
            </button>
        </div>
    )
};

export default buildControls;
