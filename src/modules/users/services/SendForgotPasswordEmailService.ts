import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
	email: string;
}

@injectable()
class SendForgotPasswordEmailService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,

		@inject('UserTokenRepository')
		private userTokenRepository: IUserTokenRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,
	) {}

	public async execute({ email }: IRequest): Promise<void> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Usuário não existe.');
		}

		const { token } = await this.userTokenRepository.generate(user.id);

		await this.mailProvider.sendMail(
			email,
			`Pedido de recuperação de senha recebido ${token}`,
		);
	}
}

export default SendForgotPasswordEmailService;
