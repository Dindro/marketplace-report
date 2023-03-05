import type ProductId from '@/entities/ProductId';

export default interface IReceptionProductData {
    productId: ProductId;
    price: number;
}