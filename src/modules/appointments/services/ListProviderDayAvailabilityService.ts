import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
	provider_id: string;
	day: number;
	month: number;
	year: number;
}

type IResponse = Array<{
	hour: number;
	available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
	constructor(
		@inject('AppointmentRepository')
		private appointmentRepository: IAppointmentRepository,
	) {}

	public async execute({
		provider_id,
		month,
		year,
		day,
	}: IRequest): Promise<IResponse> {
		const appointments = await this.appointmentRepository.findAllInDayFromProvider(
			{
				provider_id,
				month,
				year,
				day,
			},
		);

		const hourStart = 8;

		const eachHourArray = Array.from(
			{ length: 10 },
			(_, index) => index + hourStart,
		);

		const availability = eachHourArray.map((hour) => {
			const hasAppointmentInHour = appointments.find(
				(appointment) => getHours(appointment.date) === hour,
			);

			const currentDate = new Date(Date.now());
			const compareDate = new Date(year, month - 1, day, hour);

			return {
				hour,
				available:
					!hasAppointmentInHour && isAfter(compareDate, currentDate),
			};
		});

		return availability;
	}
}

export default ListProviderDayAvailabilityService;
