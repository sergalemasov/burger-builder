import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';

const burger = (props: {ingredients: Record<string, number>}) => {
    const ingredientComponents = Object.keys(props.ingredients)
        .reduce<JSX.Element[]>(
            (components, ingredientName) => components.concat([...Array(props.ingredients[ingredientName])]
                .map((_, i) => <BurgerIngredient type={ingredientName} key={`${ingredientName}${i}`}/>)
            ),
            []
        );

    const empty = <BurgerIngredient type={BurgerIngredientType.empty}/>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={BurgerIngredientType.breadTop}/>
            {ingredientComponents.length ? ingredientComponents : empty}
            <BurgerIngredient type={BurgerIngredientType.breadBottom}/>
        </div>
    );
};

export default burger;