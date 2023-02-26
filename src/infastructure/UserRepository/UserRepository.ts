import User, { type UserId } from '@/entities/User';
import type IUserRepository from '@/use-cases/IUserRepository';
import type { Maybe } from '@/types/common';

import data from '@/data/users.json';

export default class UserRepository implements IUserRepository {
    create(id: number, name: string): Promise<User> {
        data.push({ id, name });
        const created = new User(id, name);
        return Promise.resolve(created);
    }

    createAnonymous(): Promise<User> {
        let id: UserId = 0;
        const last = data[data.length - 1];
        if (last) id = last.id + 1;

        const name: string = `Неизвестный-${id}`;

        return this.create(id, name);
    }

    getById(userId: UserId): Promise<Maybe<User>> {
        const foundUser = data.find(item => item.id === userId);
        if (foundUser) return Promise.resolve(new User(foundUser.id, foundUser.name));

        return Promise.resolve(null);
    }

    getByIds(userIds: UserId[]): Promise<Maybe<User>[]> {
        const requests = userIds.map(this.getById);
        return Promise.all(requests);
    }
}