// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderService from '../ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProviderService;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		listProviders = new ListProviderService(fakeUserRepository);
	});

	it('should be able list the providers', async () => {
		const user1 = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const user2 = await fakeUserRepository.create({
			name: 'John Trê',
			email: 'johntre@example.com',
			password: '123456',
		});

		const loggedUser = await fakeUserRepository.create({
			name: 'John Qua',
			email: 'johnqua@example.com',
			password: '123456',
		});

		const providers = await listProviders.execute({
			user_id: loggedUser.id,
		});

		expect(providers).toEqual([user1, user2]);
	});
});
