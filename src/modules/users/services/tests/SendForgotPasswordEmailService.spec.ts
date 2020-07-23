import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeEmailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeUserTokenRepository = new FakeUserTokenRepository();
		fakeMailProvider = new FakeMailProvider();

		sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUserRepository,
			fakeUserTokenRepository,
			fakeMailProvider,
		);
	});

	it('should be able to recover the password using the email', async () => {
		const sendEmailFunction = jest.spyOn(fakeMailProvider, 'sendMail');

		await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@exemple.com',
			password: '123456',
		});

		await sendForgotPasswordEmail.execute({
			email: 'johndoe@exemple.com',
		});

		expect(sendEmailFunction).toHaveBeenCalled();
	});

	it('should not be able to recover a non-existing user password', async () => {
		await expect(
			sendForgotPasswordEmail.execute({
				email: 'johndoe@exemple.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be generate a forgot password token', async () => {
		const generateTokenFunction = jest.spyOn(
			fakeUserTokenRepository,
			'generate',
		);

		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@exemple.com',
			password: '123456',
		});

		await sendForgotPasswordEmail.execute({
			email: 'johndoe@exemple.com',
		});

		expect(generateTokenFunction).toHaveBeenCalledWith(user.id);
	});
});
