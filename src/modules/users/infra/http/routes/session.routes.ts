import { Router } from 'express';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
	const { email, password } = request.body;

	const userRepository = new UserRepository();
	const authenticateUser = new AuthenticateUserService(userRepository);

	const { user, token } = await authenticateUser.execute({
		email,
		password,
	});

	return response.json({ user, token });
});

export default sessionRouter;
