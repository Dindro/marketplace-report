import UserFraction from '@/entities/UserFraction';
import ProductId from '@/entities/ProductId';
import type IUserFractionRepository from '@/use-cases/IUserFractionRepository';

import data from '@/data/userFractions.json';

export default class UserFractionRepository implements IUserFractionRepository {
    async getByProductId(productId: ProductId): Promise<UserFraction[]> {
        const items: any[] = data.filter((item) => {
            const itemProductId = new ProductId(
                item.productId.code,
                item.productId.article,
                item.productId.barcode,
                item.productId.hatch,
            );
            
            return productId.compare(itemProductId);
        });

        const userFractions: UserFraction[] = items.map((item) => new UserFraction(item.id, item.userIds, item.value, productId));

        return Promise.resolve(userFractions);
    }
}