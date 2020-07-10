import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const checkUserExists = await this.userRepository.findByEmail(email);

		if (checkUserExists) {
			throw new AppError('Email address already used by another');
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.userRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		// delete user.password;

		return user;
	}
}

export default CreateUserService;
