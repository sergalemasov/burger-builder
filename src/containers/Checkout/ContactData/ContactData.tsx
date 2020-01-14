import React, {Component} from 'react';
import Button from 'components/UI/Button/Button';
import classes from './ContactData.module.css';
import ButtonType from 'shared/enums/ButtonType.enum';
import ordersClient from 'clients/orders.client';
import {Order} from 'shared/interfaces/order';
import Spinner from 'components/UI/Spinner/Spinner';
import storageService from 'services/storageService';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import Input from 'components/UI/Input/Input';
import InputType from 'shared/enums/InputType.enum';
import {InputConfig} from 'shared/interfaces/inputConfig';
import {ContactData as IContactData} from 'shared/interfaces/contactData';

interface ContactDataProps extends Order {
}

interface ContactDataState {
    orderForm: Record<string, {
        elementType: InputType;
        elementConfig: InputConfig;
        value: string;
    }>;
    isLoading: boolean;
}

class ContactData extends Component<RouteComponentProps & ContactDataProps, ContactDataState> {
    state: ContactDataState = {
        orderForm: {
            name: {
                elementType: InputType.text,
                elementConfig: {
                    placeholder: 'Your name'
                },
                value: ''
            },
            email: {
                elementType: InputType.email,
                elementConfig: {
                    placeholder: 'Your E-Mmail'
                },
                value: ''
            },
            street: {
                elementType: InputType.text,
                elementConfig: {
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: InputType.text,
                elementConfig: {
                    placeholder: 'ZIP'
                },
                value: ''
            },
            country: {
                elementType: InputType.text,
                elementConfig: {
                    placeholder: 'Country'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: InputType.select,
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            name: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            name: 'Cheapest'
                        }
                    ]
                },
                value: ''
            }
        },
        isLoading: false
    };

    orderHandler = (event: React.MouseEvent) => {
        event.preventDefault();

        this.setState({isLoading: true});

        const contactData = Object.keys(this.state.orderForm)
            .reduce<IContactData>((acc, key) => ({
                ...acc,
                [key]: this.state.orderForm[key].value as string
            }), {} as IContactData);

        ordersClient.createOrder({
            totalPrice: this.props.totalPrice,
            ingredients: this.props.ingredients,
            contactData: contactData
        })
            .then(() => {
                this.setState({isLoading: false});
                storageService.clearOrder();
                this.props.history.replace('/orders');
            })
            .catch(error => {
                this.setState({isLoading: false});
                console.log(error);
            });
    }

    inputChangedHandler(
        controlName: string,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const value = event.target.value;

        this.setState((prevState) =>
            ({orderForm: {
                ...prevState.orderForm,
                [controlName]: {
                    ...prevState.orderForm[controlName],
                    value
                }
            }})
        );
    }

    render() {
        const controls = Object.keys(this.state.orderForm)
            .map(controlName => {
                const control = (this.state.orderForm as Record<string, any>)[controlName];

                return (
                    <Input
                        key={controlName}
                        elementConfig={control.elementConfig}
                        elementType={control.elementType}
                        value={control.value}
                        changed={event => this.inputChangedHandler(controlName, event)}
                    />
                );
            });

        const form = this.state.isLoading
            ? <Spinner />
            : (
                <React.Fragment>
                    <h4>Enter your Contact Data</h4>
                    <form>
                        {controls}
                        <Button type={ButtonType.success} clicked={this.orderHandler}>
                            ORDER
                        </Button>
                    </form>
                </React.Fragment>
            );

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);