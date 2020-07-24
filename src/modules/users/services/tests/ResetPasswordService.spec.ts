import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import ResetPasswordService from '../ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeUserTokenRepository = new FakeUserTokenRepository();
		fakeHashProvider = new FakeHashProvider();

		resetPassword = new ResetPasswordService(
			fakeUserRepository,
			fakeUserTokenRepository,
			fakeHashProvider,
		);
	});

	it('should be able to reset the password', async () => {
		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@exemple.com',
			password: '123456',
		});

		const { token } = await fakeUserTokenRepository.generate(user.id);

		const generateHashFunction = jest.spyOn(
			fakeHashProvider,
			'generateHash',
		);

		await resetPassword.execute({
			token,
			newPassword: '123123',
		});

		const updatedUser = await fakeUserRepository.findById(user.id);

		expect(generateHashFunction).toBeCalledWith('123123');
		expect(updatedUser?.password).toBe('123123');
	});

	it('should not be able to reset the password with non-existing token', async () => {
		await expect(
			resetPassword.execute({
				token: 'non-existing-token',
				newPassword: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password with non-existing user', async () => {
		const { token } = await fakeUserTokenRepository.generate(
			'non-existing-user',
		);

		await expect(
			resetPassword.execute({
				token,
				newPassword: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password if passed more than 2 hours', async () => {
		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@exemple.com',
			password: '123456',
		});

		const { token } = await fakeUserTokenRepository.generate(user.id);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			const customDate = new Date();

			return customDate.setHours(customDate.getHours() + 3);
		});

		await expect(
			resetPassword.execute({
				token,
				newPassword: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
