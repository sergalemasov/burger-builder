import {ContactData} from 'shared/interfaces/contactData';

export interface OrderDto {
    ingredients: Record<string, number>;
    totalPrice: number;
    contactData: ContactData;
}
