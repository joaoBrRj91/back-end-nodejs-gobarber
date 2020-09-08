import { injectable, inject } from 'tsyringe';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
	provider_id: string;
	day: number;
	month: number;
	year: number;
}

@injectable()
class ListProviderAppointmentsService {
	constructor(
		@inject('AppointmentRepository')
		private appointmentRepository: IAppointmentRepository,
	) {}

	public async execute({
		provider_id,
		day,
		month,
		year,
	}: IRequest): Promise<Appointment[]> {
		const appointments = await this.appointmentRepository.findAllInDayFromProvider(
			{
				provider_id,
				day,
				month,
				year,
			},
		);

		return appointments;
	}
}

export default ListProviderAppointmentsService;
