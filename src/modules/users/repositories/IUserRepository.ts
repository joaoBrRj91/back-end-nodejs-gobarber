import User from '../infra/typeorm/entities/User';
import ICreateUserDto from '../dtos/ICreateUserDto';

export default interface IUserRepository {
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(data: ICreateUserDto): Promise<User>;
	save(user: User): Promise<User>;
}
