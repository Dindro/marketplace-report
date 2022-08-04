import User, { type UserId } from '@/entities/User';
import type IUserRepository from '@/use-cases/IUserRepository';
import type IUserData from '@/infastructure/UserRepository/IUserData';
import type { Maybe } from '@/types/common';

export default class UserRepository implements IUserRepository {
    private data: IUserData[];

    constructor(data: IUserData[]) {
        this.data = data;
    }

    getById(userId: UserId): Promise<Maybe<User>> {
        const foundUser = this.data.find(item => item.id ===  userId);
        if (foundUser) {
            return Promise.resolve(new User(foundUser.id, foundUser.name));
        }

        return Promise.resolve(null);
    }

    getByIds(userIds: UserId[]): Promise<Maybe<User>[]> {
        const requests = userIds.map(this.getById);
        return Promise.all(requests);
    }
}