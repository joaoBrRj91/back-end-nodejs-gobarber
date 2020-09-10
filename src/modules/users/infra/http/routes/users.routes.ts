import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

userRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	userController.create,
);

userRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	userAvatarController.update,
);

export default userRouter;
