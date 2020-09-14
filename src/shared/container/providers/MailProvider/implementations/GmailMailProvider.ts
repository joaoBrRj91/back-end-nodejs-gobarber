import { inject, injectable } from 'tsyringe';
import mailConfig from '@config/mail';
import nodemailer, { Transporter } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class GmailMailProvider implements IMailProvider {
	private client: Transporter;

	constructor(
		@inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider,
	) {
		const transporter = nodemailer.createTransport(
			smtpTransport({
				service: mailConfig.driver,
				host: 'smtp.gmail.com',
				auth: {
					user: mailConfig.default.auth.user,
					pass: mailConfig.default.auth.pass,
				},
			}),
		);

		this.client = transporter;
	}

	public async sendMail({
		to,
		from,
		subject,
		templateData,
	}: ISendMailDTO): Promise<void> {
		const { email, name } = mailConfig.default.from;

		await this.client.sendMail({
			from: {
				name: from?.name || email,
				address: from?.email || name,
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await this.mailTemplateProvider.parse(templateData),
		});
	}
}
