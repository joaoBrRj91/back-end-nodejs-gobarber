import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';

import UpdateUserAvatarService from '../UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
	it('should be able to update avatar from existing user', async () => {
		const fakeStorageProvider = new FakeStorageProvider();
		const fakeUserRepository = new FakeUserRepository();

		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUserRepository,
			fakeStorageProvider,
		);

		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFileName: 'avatar.jpg',
		});

		expect(user.avatar).toBe('avatar.jpg');
	});

	it('should not be able to update avatar from non existing user', async () => {
		const fakeStorageProvider = new FakeStorageProvider();
		const fakeUserRepository = new FakeUserRepository();

		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUserRepository,
			fakeStorageProvider,
		);

		expect(
			updateUserAvatar.execute({
				user_id: 'non-existing-user',
				avatarFileName: 'avatar.jpg',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should delete old avatar when updating new one', async () => {
		const fakeStorageProvider = new FakeStorageProvider();
		const fakeUserRepository = new FakeUserRepository();

		const deleteFileFunction = jest.spyOn(
			fakeStorageProvider,
			'deleteFile',
		);

		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUserRepository,
			fakeStorageProvider,
		);

		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFileName: 'avatar.jpg',
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFileName: 'avatar2.jpg',
		});

		expect(deleteFileFunction).toBeCalledWith('avatar.jpg');
		expect(user.avatar).toBe('avatar2.jpg');
	});
});
