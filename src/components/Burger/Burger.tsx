import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';

interface BurgerProps {
    ingredients: Record<string, number>;
}

const burger: React.FC<BurgerProps> = props => {
    const ingredientComponents = Object.keys(props.ingredients)
        .reduce<JSX.Element[]>(
            (components, ingredientName) => components.concat([...Array(props.ingredients[ingredientName])]
                .map((_, i) => <BurgerIngredient
                    type={ingredientName as BurgerIngredientType}
                    key={`${ingredientName}${i}`}/>
                )
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