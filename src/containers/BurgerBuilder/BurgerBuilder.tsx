import React, {Component, Fragment} from 'react';
import Burger from 'components/Burger/Burger';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import ordersClient from 'clients/orders.client';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler';

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
    isLoading: boolean;
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
        isPurchasing: false,
        isLoading: false
    };

    static fixFloat(value: number): number {
        return +(value).toFixed(1);
    }

    componentDidMount() {
        let orderId = localStorage.getItem('currentOrderId');

        if (!orderId) {
            return;
        }

        ordersClient.getOrder(orderId)
            .then(response => this.setState({ingredients: response.data}))
            .catch(error => console.log(error))
            .finally(() => this.setState({isLoading: false}));
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
        this.setState({isLoading: true});

        ordersClient.createOrder({
            totalPrice: this.state.totalPrice,
            ingredients: this.state.ingredients
        })
            .then(response => localStorage.setItem('currentOrderId', response.data.name))
            .catch(error => console.log(error))
            .finally(() => this.setState({isLoading: false}));
    }
}

export default withErrorHandler(BurgerBuilder);
