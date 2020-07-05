import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
	user_id: string;
	avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
		const user = await this.userRepository.findById(user_id);

		if (!user) {
			throw new AppError('Only authenticated users can change avatar.');
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(
				uploadConfig.directory,
				user.avatar,
			);

			const userAvatarFileExists = await fs.promises.stat(
				userAvatarFilePath,
			);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatarFileName;

		await this.userRepository.save(user);

		delete user.password;

		return user;
	}
}

export default UpdateUserAvatarService;
