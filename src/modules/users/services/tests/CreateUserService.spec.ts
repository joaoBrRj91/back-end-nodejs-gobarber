import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import CreateUserService from '../CreateUserService';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const createUser = new CreateUserService(fakeUserRepository);

		const user = await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@exemple.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
		expect(user.id).toBeTruthy();
	});

	it('should not be able to create a new user with same email from another', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const createUser = new CreateUserService(fakeUserRepository);

		await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@exemple.com',
			password: '123456',
		});

		expect(
			createUser.execute({
				name: 'John Doe',
				email: 'johndoe@exemple.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
