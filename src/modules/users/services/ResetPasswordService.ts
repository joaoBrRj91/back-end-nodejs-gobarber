import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
	token: string;
	newPassword: string;
}

@injectable()
class ResetPasswordService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,

		@inject('UserTokenRepository')
		private userTokenRepository: IUserTokenRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token, newPassword }: IRequest): Promise<void> {
		const userToken = await this.userTokenRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('User token does not exists');
		}

		const user = await this.userRepository.findById(userToken.user_id);

		if (!user) {
			throw new AppError('User does not exists');
		}

		const tokenCreatedAt = userToken.created_at;
		const compareDate = addHours(tokenCreatedAt, 2);

		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('Token expired');
		}

		user.password = await this.hashProvider.generateHash(newPassword);

		await this.userRepository.save(user);
	}
}

export default ResetPasswordService;
