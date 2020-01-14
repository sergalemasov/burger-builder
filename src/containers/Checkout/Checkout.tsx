import React, {Component} from 'react';
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary';
import {RouteComponentProps, Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';
import storageService from 'services/storageService';
import {Order} from 'shared/interfaces/order';

interface CheckoutState extends Order {}

class Checkout extends Component<RouteComponentProps> {
    state: CheckoutState = {
        ingredients: {
            [BurgerIngredientType.salad]: 0,
            [BurgerIngredientType.bacon]: 0,
            [BurgerIngredientType.cheese]: 0,
            [BurgerIngredientType.meat]: 0,
        },
        totalPrice: 0
    };

    componentDidMount() {
        const order = storageService.restoreOrder();

        if (order) {
            this.setState(() => order);
        }
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutProceedHandler = () => {
        this.props.history.replace(`${this.props.match.path}/contact-data`)
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelClicked={this.checkoutCancelHandler}
                    continueClicked={this.checkoutProceedHandler}
                />
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    render={() => <ContactData
                        totalPrice={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                    />}
                />
            </div>
        );
    }
}

export default Checkout;