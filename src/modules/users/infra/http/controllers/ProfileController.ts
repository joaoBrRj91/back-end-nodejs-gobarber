import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

// index, show, create, update, delete

export default class ProfileController {
	public async show(request: Request, response: Response): Promise<Response> {
		const showProfile = container.resolve(ShowProfileService);
		const user = await showProfile.execute({ user_id: request.user.id });

		delete user.password;

		return response.json(user);
	}

	public async update(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { name, email, old_password, password } = request.body;

		const updateProfile = container.resolve(UpdateProfileService);

		const user = await updateProfile.execute({
			user_id: request.user.id,
			name,
			email,
			password,
			old_Password: old_password,
		});

		delete user.password;

		return response.json({ user });
	}
}
