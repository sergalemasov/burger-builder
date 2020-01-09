import {BaseClient} from './base.client';
import {OrderDto} from 'shared/dto/request/order.dto';
import axiosInstance from 'axiosInstance';
import {AxiosResponse} from 'axios';

class OrderClient extends BaseClient {
    createOrder(order: OrderDto): Promise<AxiosResponse<{name: string}>> {
        return this.post('/orders.json', order);
    }

    getOrder(orderId: string): Promise<AxiosResponse<Record<string, number>>> {
        return this.get(`/orders/${orderId}/ingredients.json`);
    }
}

export default new OrderClient(axiosInstance);
