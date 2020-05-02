import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../Repositories/AppointmentRepository';

interface Request {
	provider: string;

	date: Date;
}

class CreateAppointmentService {
	public async Execute({ date, provider }: Request): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(
			AppointmentRepository,
		);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}

		const appointment = appointmentRepository.create({
			provider,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
