import {BaseClient} from './base.client';
import {OrderDto} from 'shared/dto/request/order.dto';
import axiosInstance from 'axiosInstance';
import {AxiosResponse} from 'axios';
import {Order} from 'shared/interfaces/order';

class OrderClient extends BaseClient {
    createOrder(order: OrderDto): Promise<AxiosResponse<{name: string}>> {
        return this.post('/orders.json', order);
    }

    getOrder(orderId: string): Promise<AxiosResponse<Record<string, number>>> {
        return this.get(`/orders/${orderId}/ingredients.json`);
    }

    getOrders(): Promise<AxiosResponse<Record<string, Order>>> {
        return this.get(`/orders.json`);
    }
}

export default new OrderClient(axiosInstance);
