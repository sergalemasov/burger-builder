export interface Order {
    ingredients: Record<string, number>;
    totalPrice: number;
    id?: string;
}