import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentDto';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentRepository {
	create(data: ICreateAppointmentDto): Promise<Appointment>;
	findByDate(date: Date): Promise<Appointment | undefined>;
	findAllInMonthFromProvider(
		data: IFindAllInMonthFromProviderDTO,
	): Promise<Appointment[]>;
	findAllInDayFromProvider(
		data: IFindAllInDayFromProviderDTO,
	): Promise<Appointment[]>;
}
