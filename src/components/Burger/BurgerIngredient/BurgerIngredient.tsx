import React from 'react';
import classes from './BurgerIngredient.module.css';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';

const burgerIngredient = (props: {type: string}) => {
    let ingredient: JSX.Element | null;

    switch (props.type) {
        case BurgerIngredientType.breadBottom:
            ingredient = <div className={classes.BreadBottom}></div>;
            break;

        case BurgerIngredientType.breadTop:
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;

        case BurgerIngredientType.meat:
            ingredient = <div className={classes.Meat}></div>;
            break;

        case BurgerIngredientType.cheese:
            ingredient = <div className={classes.Cheese}></div>;
            break;

        case BurgerIngredientType.salad:
            ingredient = <div className={classes.Salad}></div>;
            break;

        case BurgerIngredientType.bacon:
            ingredient = <div className={classes.Bacon}></div>;
            break;

        case BurgerIngredientType.empty:
            ingredient = <p className={classes.Empty}>Please start adding ingredients</p>
            break;

        default:
            ingredient = null;
    }

    return ingredient;
};

export default burgerIngredient;