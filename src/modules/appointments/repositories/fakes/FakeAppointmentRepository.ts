import { uuid } from 'uuidv4';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentRepository {
	private appointments: Appointment[] = [];

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = this.appointments.find(
			(appointment) => appointment.date === date,
		);

		return findAppointment;
	}

	public async create({
		provider_id,
		date,
	}: ICreateAppointmentDto): Promise<Appointment> {
		const newAppointment = new Appointment();

		Object.assign(newAppointment, { id: uuid(), date, provider_id });

		// newAppointment.id = uuid();
		// newAppointment.date = date;
		// newAppointment.provider_id = provider_id;

		this.appointments.push(newAppointment);

		return newAppointment;
	}
}

export default FakeAppointmentsRepository;
