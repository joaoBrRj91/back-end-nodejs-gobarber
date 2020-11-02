import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import GmailMailProvider from './implementations/GmailMailProvider';

import IMailProvider from './models/IMailProvider';

const providers = {
	ethereal: container.resolve(EtherealMailProvider),
	gmail: container.resolve(GmailMailProvider),
};

container.registerInstance<IMailProvider>(
	'MailProvider',
	providers[mailConfig.driver],
);
