import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		nodemailer.createTestAccount().then((account) => {
			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass,
				},
			});

			console.log(account);

			this.client = transporter;
		});
	}

	public async sendMail(to: string, body: string): Promise<void> {
		const message = await this.client.sendMail({
			from: 'Equipe GoBarber <equipe@gobarber.com>',
			to,
			subject: 'Recuperação de senha',
			text: body,
		});

		console.log('Message sent: %s', message.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}
}
