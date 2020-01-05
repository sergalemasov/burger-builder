import React, {Component, Fragment} from 'react';
import Burger from 'components/Burger/Burger';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES: Record<string, number> = {
    [BurgerIngredientType.salad]: 0.5,
    [BurgerIngredientType.cheese]: 0.4,
    [BurgerIngredientType.meat]: 1.3,
    [BurgerIngredientType.bacon]: 0.6
};

interface BurgerBuilderState {
    ingredients: Record<string, number>;
    totalPrice: number;
    isPurchasing: boolean;
};

class BurgerBuilder extends Component {
    state: BurgerBuilderState = {
        ingredients: {
            [BurgerIngredientType.salad]: 0,
            [BurgerIngredientType.bacon]: 0,
            [BurgerIngredientType.cheese]: 0,
            [BurgerIngredientType.meat]: 0,
        },
        totalPrice: 0,
        isPurchasing: false
    };

    static fixFloat(value: number): number {
        return +(value).toFixed(1);
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
                totalPrice: BurgerBuilder.fixFloat(prevState.totalPrice + priceAddition)
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
                totalPrice: BurgerBuilder.fixFloat(prevState.totalPrice - priceSubstraction)
            };
        });
    }

    purchaseHandler = () => {
        this.setState({isPurchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({isPurchasing: false});
    }

    purchaseConfirmHandler = () => {

    }

    render(): JSX.Element {
        const stringifiedTotalPrice = this.state.totalPrice.toFixed(2);

        return (
            <Fragment>
                <Modal isVisible={this.state.isPurchasing} backdropClicked={this.purchaseCancelHandler}>
                    <OrderSummary
                        cancelClicked={this.purchaseCancelHandler}
                        continueClicked={this.purchaseConfirmHandler}
                        ingredients={this.state.ingredients}
                        totalPrice={stringifiedTotalPrice}
                    ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ordered={this.purchaseHandler}
                    totalPrice={stringifiedTotalPrice}
                    ingredients={this.state.ingredients}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;
