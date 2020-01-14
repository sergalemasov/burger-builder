import React, {Component, Fragment} from 'react';
import Burger from 'components/Burger/Burger';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler';
import {RouteComponentProps} from 'react-router-dom';
import {Order} from 'shared/interfaces/order';
import storageService from 'services/storageService';

const INGREDIENT_PRICES: Record<string, number> = {
    [BurgerIngredientType.salad]: 0.5,
    [BurgerIngredientType.cheese]: 0.4,
    [BurgerIngredientType.meat]: 1.3,
    [BurgerIngredientType.bacon]: 0.6
};

interface BurgerBuilderState extends Order {
    isPurchasing: boolean;
    isLoading: boolean;
};

class BurgerBuilder extends Component<RouteComponentProps> {
    state: BurgerBuilderState = {
        ingredients: {
            [BurgerIngredientType.salad]: 0,
            [BurgerIngredientType.bacon]: 0,
            [BurgerIngredientType.cheese]: 0,
            [BurgerIngredientType.meat]: 0,
        },
        totalPrice: 0,
        isPurchasing: false,
        isLoading: false
    };

    componentDidMount() {
        const order = storageService.restoreOrder();

        if (order) {
            this.setState(() => order);
        }
    }

    static fixFloat(value: number): number {
        return +(value).toFixed(1);
    }

    render(): JSX.Element {
        const stringifiedTotalPrice = this.state.totalPrice.toFixed(2);

        const orderSummary = this.state.isLoading
            ? <Spinner />
            : (
                <OrderSummary
                    cancelClicked={this.purchaseCancelHandler}
                    continueClicked={this.purchaseConfirmHandler}
                    ingredients={this.state.ingredients}
                    totalPrice={stringifiedTotalPrice}
                />
            );

        return (
            <Fragment>
                <Modal isVisible={this.state.isPurchasing} backdropClicked={this.purchaseCancelHandler}>
                    {orderSummary}
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

    addIngredientHandler = (type: BurgerIngredientType) => {
        this.setState(
            (prevState: BurgerBuilderState) => {
                const priceAddition = INGREDIENT_PRICES[type];
                const updatedCount = prevState.ingredients[type] + 1;

                return {
                    ingredients: {
                        ...prevState.ingredients,
                        [type]: updatedCount
                    },
                    totalPrice: BurgerBuilder.fixFloat(prevState.totalPrice + priceAddition)
                };
            },
            () => storageService.storeOrder({
                ingredients: this.state.ingredients,
                totalPrice: this.state.totalPrice
            })
        );
    }

    removeIngredientHandler = (type: BurgerIngredientType) => {
        this.setState(
            (prevState: BurgerBuilderState) => {
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
            },
            () => storageService.storeOrder({
                ingredients: this.state.ingredients,
                totalPrice: this.state.totalPrice
            })
        );
    }

    purchaseHandler = () => {
        this.setState({isPurchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({isPurchasing: false});
    }

    purchaseConfirmHandler = () => {
        this.props.history.push('/checkout', {
            orderState: {
                ingredients: this.state.ingredients,
                totalPrice: this.state.totalPrice
            }
        });
    }
}

export default withErrorHandler(BurgerBuilder);
