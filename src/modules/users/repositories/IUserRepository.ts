import User from '../infra/typeorm/entities/User';
import ICreateUserDto from '../dtos/ICreateUserDto';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
	findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(data: ICreateUserDto): Promise<User>;
	save(user: User): Promise<User>;
}
