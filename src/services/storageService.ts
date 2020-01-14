import {Order} from 'shared/interfaces/order';

class StorageService {
    private keys = {
        ORDER: 'order'
    };

    restoreOrder(): Order | null {
        return this.getItem(this.keys.ORDER);
    }

    storeOrder(order: Order) {
        this.setItem(this.keys.ORDER, order);
    }

    clearOrder() {
        this.removeItem(this.keys.ORDER);
    }

    private getItem<T>(key: string): T | null {
        const rawItem = localStorage.getItem(key);

        if (!rawItem) {
            return null;
        }

        let item: T | null;

        try {
            item = JSON.parse(rawItem);
        } catch (e) {
            item = null;
        }

        return item;
    }

    private setItem<T>(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    private removeItem(key: string) {
        localStorage.removeItem(key);
    }
}

export default new StorageService();