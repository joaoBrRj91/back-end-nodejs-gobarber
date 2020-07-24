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
			created_at: new Date(),
			updated_at: new Date(),
		});

		this.usersTokens.push(userToken);

		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const findUserToken = this.usersTokens.find(
			(userToken) => userToken.token === token,
		);

		return findUserToken;
	}
}

export default FakeUserTokenRepository;
