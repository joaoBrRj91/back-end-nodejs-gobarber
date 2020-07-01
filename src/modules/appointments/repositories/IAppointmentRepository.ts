import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentDto';

export default interface IAppointmentRepository {
	create(data: ICreateAppointmentDto): Promise<Appointment>;
	findByDate(date: Date): Promise<Appointment | undefined>;
}
