import type { UserId } from '@/entities/User';
import type User from '@/entities/User';
import type { Maybe } from '@/types/common';

export default interface IUserRepository {
    getById: (userId: UserId) => Promise<Maybe<User>>;
    getByIds: (userIds: UserId[]) => Promise<Maybe<User>[]>
}