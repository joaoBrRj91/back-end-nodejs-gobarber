import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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

		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
	) {}

	public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
		const user = await this.userRepository.findById(user_id);

		if (!user) {
			throw new AppError('Only authenticated users can change avatar.');
		}

		// Deleta antes de salvar o novo
		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar);
		}

		const fileName = await this.storageProvider.saveFile(avatarFileName);

		user.avatar = fileName;

		await this.userRepository.save(user);

		delete user.password;

		return user;
	}
}

export default UpdateUserAvatarService;
