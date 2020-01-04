import React, {Component, Fragment} from 'react';
import Burger from 'components/Burger/Burger';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';
import BuildControls from 'components/BuildControls/BuildControls';

const INGREDIENT_PRICES: Record<string, number> = {
    [BurgerIngredientType.salad]: 0.5,
    [BurgerIngredientType.cheese]: 0.4,
    [BurgerIngredientType.meat]: 1.3,
    [BurgerIngredientType.bacon]: 0.6
};

interface BurgerBuilderState {
    ingredients: Record<string, number>;
    totalPrice: number;
};

class BurgerBuilder extends Component {
    state: BurgerBuilderState = {
        ingredients: {
            [BurgerIngredientType.salad]: 0,
            [BurgerIngredientType.bacon]: 0,
            [BurgerIngredientType.cheese]: 0,
            [BurgerIngredientType.meat]: 0,
        },
        totalPrice: 0
    };

    static toFixed2(value: number): number {
        return +(value).toFixed(2);
    }

    addIngredientHandler = (type: BurgerIngredientType) => {
        this.setState((prevState: BurgerBuilderState) => {
            const priceAddition = INGREDIENT_PRICES[type];
            const updatedCount = prevState.ingredients[type] + 1;

            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: updatedCount
                },
                totalPrice: BurgerBuilder.toFixed2(prevState.totalPrice + priceAddition)
            };
        });
    }

    removeIngredientHandler = (type: BurgerIngredientType) => {
        this.setState((prevState: BurgerBuilderState) => {
            if (!prevState.ingredients[type]) {
                return;
            }

            const priceSubstraction = INGREDIENT_PRICES[type];
            const updatedCount = prevState.ingredients[type] - 1;

            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: updatedCount
                },
                totalPrice: BurgerBuilder.toFixed2(prevState.totalPrice - priceSubstraction)
            };
        });
    }

    render(): JSX.Element {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;
