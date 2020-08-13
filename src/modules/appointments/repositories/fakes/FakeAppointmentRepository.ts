import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';

import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentRepository {
	private appointments: Appointment[] = [];

	public async findAllInDayFromProvider({
		provider_id,
		day,
		month,
		year,
	}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
		const appointments = this.appointments.filter(
			(appointment) =>
				appointment.provider_id === provider_id &&
				getDate(appointment.date) === day &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year,
		);

		return appointments;
	}

	public async findAllInMonthFromProvider({
		provider_id,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
		const appointments = this.appointments.filter(
			(appointment) =>
				appointment.provider_id === provider_id &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year,
		);

		return appointments;
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = this.appointments.find((appointment) =>
			isEqual(appointment.date, date),
		);

		return findAppointment;
	}

	public async create({
		provider_id,
		date,
		user_id,
	}: ICreateAppointmentDto): Promise<Appointment> {
		const newAppointment = new Appointment();

		Object.assign(newAppointment, {
			id: uuid(),
			date,
			provider_id,
			user_id,
		});

		// newAppointment.id = uuid();
		// newAppointment.date = date;
		// newAppointment.provider_id = provider_id;

		this.appointments.push(newAppointment);

		return newAppointment;
	}
}

export default FakeAppointmentsRepository;
