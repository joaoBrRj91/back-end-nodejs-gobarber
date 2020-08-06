import { getRepository, Repository, Not } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

class UserRepository implements IUserRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async findAllProviders({
		expect_user_id,
	}: IFindAllProvidersDTO): Promise<User[]> {
		let users: User[];

		if (expect_user_id) {
			users = await this.ormRepository.find({
				where: {
					id: Not(expect_user_id),
				},
			});
		} else {
			users = await this.ormRepository.find();
		}

		return users;
	}

	public async findById(id: string): Promise<User | undefined> {
		const findUser = await this.ormRepository.findOne(id);
		return findUser;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const findUser = await this.ormRepository.findOne({
			where: { email },
		});

		return findUser;
	}

	public async create({
		name,
		email,
		password,
	}: ICreateUserDto): Promise<User> {
		const user = this.ormRepository.create({ name, email, password });
		await this.ormRepository.save(user);
		return user;
	}

	public async save(user: User): Promise<User> {
		await this.ormRepository.save(user);
		return user;
	}
}

export default UserRepository;
