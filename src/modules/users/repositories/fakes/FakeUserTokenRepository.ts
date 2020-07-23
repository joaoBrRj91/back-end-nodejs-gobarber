import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';
import IUserTokenRepository from '../IUserTokenRepository';

class FakeUserTokenRepository implements IUserTokenRepository {
	private usersTokens: UserToken[] = [];

	public async generate(user_id: string): Promise<UserToken> {
		const userToken = new UserToken();

		Object.assign(userToken, {
			id: uuid(),
			token: uuid(),
			user_id,
		});

		this.usersTokens.push(userToken);

		return userToken;
	}
}

export default FakeUserTokenRepository;
