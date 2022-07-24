import User from '@/entities/User';
import type ICreateUserRequestModel from '@/use-cases/CreateUser/ICreateUserRequestModel';
import type IUserRepository from '@/use-cases/IUserRepository';

export default class CreateUserUseCase {
    readonly userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    execute(request: ICreateUserRequestModel) {
        const user = new User(0, request.name);
        this.userRepository.create(user);
    }
}