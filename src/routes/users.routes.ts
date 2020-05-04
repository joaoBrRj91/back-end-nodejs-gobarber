import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		return response.json({ user });
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

userRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		try {
			const updateUserAvatar = new UpdateUserAvatarService();

			const user = await updateUserAvatar.execute({
				user_id: request.user.id,
				avatarFileName: request.file.filename,
			});

			return response.json(user);
		} catch (error) {
			return response.status(400).json({ error: error.message });
		}
	},
);

export default userRouter;
