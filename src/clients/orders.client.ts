import {BaseClient} from './base.client';
import {OrderDto} from 'shared/dto/request/order.dto';

class OrderClient extends BaseClient {
    createOrder(order: OrderDto): Promise<void> {
        return this.post('/orders.json', order);
    }
}

export default new OrderClient();
