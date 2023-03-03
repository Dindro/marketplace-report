import type ProductId from '@/entities/ProductId';

export default interface IProductData {
    productId: ProductId;
    price: number;
}