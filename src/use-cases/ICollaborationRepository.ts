import type { ProductId } from '@/entities/Product';
import type UserFraction from '@/entities/UserFraction';

export interface ICollaborationRepository {
    getByProductId(productId: ProductId): Promise<UserFraction[]>;
}