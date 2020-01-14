import React, {Component} from 'react';
import Order from 'components/Order/Order';
import ordersClient from 'clients/orders.client';
import {Order as IOrder} from 'shared/interfaces/order';
import Spinner from 'components/UI/Spinner/Spinner';

interface OrdersState {
    orders: IOrder[];
    isLoading: boolean;
}

class Orders extends Component {
    state: OrdersState = {
        orders: [],
        isLoading: true
    };

    componentDidMount() {
        ordersClient.getOrders()
            .then(response => Object.keys(response.data).map(key => ({...response.data[key], id: key})))
            .then(orders => this.setState({orders, isLoading: false}))
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            });
    }

    render() {
        const orders = this.state.isLoading
            ? <Spinner />
            : this.state.orders
                .map(order => <Order key={order.id} order={order}/>);

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default Orders;