import { startOfHour } from 'date-fns';
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
