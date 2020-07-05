import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	constructor(private userRepository: IUserRepository) {}

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const checkUserExists = await this.userRepository.findByEmail(email);

		if (checkUserExists) {
			throw new AppError('Email address already used by another');
		}

		const hashedPassword = await hash(password, 8);

		const user = await this.userRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		delete user.password;

		return user;
	}
}

export default CreateUserService;
