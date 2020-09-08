import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
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

		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,
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

		const dateFormatted = format(
			appointmentDate,
			"dd/MM/yyyy 'às' HH:mm'h'",
		);

		await this.notificationsRepository.create({
			recipient_id: provider_id,
			content: `Novo agendamento para o dia ${dateFormatted}`,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
