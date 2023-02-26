import type ProductId from '@/entities/ProductId';

export default interface IUserFractionData {
    id: number;
    userIds: number[],
    productId: ProductId;
    value: number;
}