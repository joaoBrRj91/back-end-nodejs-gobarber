import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
	provider_id: string;

	date: Date;
}

class CreateAppointmentService {
	public async Execute({ date, provider_id }: Request): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(
			AppointmentRepository,
		);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw new AppError('This appointment is already booked');
		}

		const appointment = appointmentRepository.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
