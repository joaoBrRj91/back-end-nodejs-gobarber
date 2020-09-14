interface IMailConfig {
	driver: 'ethereal' | 'amazon-ses' | 'gmail';
	default: {
		from: {
			email: string;
			name: string;
		};
		auth: {
			user: string;
			pass: string;
		};
	};
}

export default {
	driver: process.env.MAIL_DRIVER || 'ethereal',

	default: {
		from: {
			email: process.env.MAIL_DOMAIN,
			name: 'João Nascimento - InfoTech',
		},

		auth: {
			user: process.env.MAIL_AUTH_USER,
			pass: process.env.MAIL_AUTH_PASS,
		},
	},
} as IMailConfig;
