export default {
	jwt: {
		word_secret: 'GoBarber Application',
		secret: process.env.APP_SECRET,
		expiresIn: '1d',
	},
};
