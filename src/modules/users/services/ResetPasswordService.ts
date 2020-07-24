import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

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

		user.password = newPassword;

		await this.userRepository.save(user);
	}
}

export default ResetPasswordService;
