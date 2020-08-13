import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
	provider_id: string;
	user_id: string;
	date: Date;
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentRepository')
		private appointmentRepository: IAppointmentRepository,
	) {}

	public async Execute({
		date,
		provider_id,
		user_id,
	}: IRequest): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError(
				'You can not create an appointment on a past date',
			);
		}

		if (user_id === provider_id) {
			throw new AppError(
				'You can not create an appointment with yourself.',
			);
		}

		if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
			throw new AppError(
				'You can only create appointments between 8am and 5pm',
			);
		}

		const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw new AppError('This appointment is already booked');
		}

		const appointment = this.appointmentRepository.create({
			provider_id,
			user_id,
			date: appointmentDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
