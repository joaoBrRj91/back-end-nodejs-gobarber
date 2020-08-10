import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentDto';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentRepository {
	create(data: ICreateAppointmentDto): Promise<Appointment>;
	findByDate(date: Date): Promise<Appointment | undefined>;
	findAllInMonthFromProvider(
		data: IFindAllInMonthFromProviderDTO,
	): Promise<Appointment[]>;
}
