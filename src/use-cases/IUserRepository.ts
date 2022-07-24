import type User from '@/entities/User';

export default interface IUserRepository {
    create: (user: User) => void;
}