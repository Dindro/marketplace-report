import type ProductId from '@/entities/ProductId';

export default interface IRetentionData {
    productId: ProductId;
    price: number;
}