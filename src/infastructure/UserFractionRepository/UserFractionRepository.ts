import UserFraction from '@/entities/UserFraction';
import User from '@/entities/User';
import type { ProductId } from '@/entities/Product';
import type IUserFractionRepository from '@/use-cases/IUserFractionRepository';
import type IUserFractionData from '@/infastructure/UserFractionRepository/IUserFractionData';
import type IUserRepository from '@/use-cases/IUserRepository';

export default class UserRepository implements IUserFractionRepository {
    readonly data: IUserFractionData[];
    readonly userRepository: IUserRepository;

    constructor(data: IUserFractionData[], userRepository: IUserRepository) {
        this.data = data;
        this.userRepository = userRepository;
    }
    
    async getByProductId(productId: ProductId): Promise<UserFraction[]> {
        const items = this.data.filter(item => item.productId === productId);
        
        const userFractions: UserFraction[] = [];
        for (const item of items) {
            const users = await this.userRepository.getByIds(item.userIds);
            const usersFilled = users.map((user, userIndex) => {
                if (user instanceof User) {
                    return user;
                }
                
                return User.createUndefinedUser(item.userIds[userIndex]);
            });
            userFractions.push(new UserFraction(item.id, usersFilled, item.value, item.productId));
        }

        return Promise.resolve(userFractions);
    }
}