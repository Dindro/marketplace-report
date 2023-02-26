import type ProductId from '@/entities/ProductId';
import type UserFraction from '@/entities/UserFraction';

export default interface IUserFractionRepository {
    getByProductId(productId: ProductId): Promise<UserFraction[]>;
}