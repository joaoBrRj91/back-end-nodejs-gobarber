// import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import ResetPasswordService from '../ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeUserTokenRepository = new FakeUserTokenRepository();

		resetPassword = new ResetPasswordService(
			fakeUserRepository,
			fakeUserTokenRepository,
		);
	});

	it('should be able to reset the password', async () => {
		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@exemple.com',
			password: '123456',
		});

		const { token } = await fakeUserTokenRepository.generate(user.id);

		await resetPassword.execute({
			token,
			newPassword: '123123',
		});

		const updatedUser = await fakeUserRepository.findById(user.id);

		expect(updatedUser?.password).toBe('123123');
	});
});
