import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDto {
	provider: string;
	date: Date;
}

class AppointmentsRepository {
	private appointments: Appointment[];

	constructor() {
		this.appointments = [];
	}

	public All(): Appointment[] {
		return this.appointments;
	}

	public findByDate(date: Date): Appointment | null {
		const findAppointment = this.appointments.find((appointment) =>
			isEqual(date, appointment.date),
		);

		return findAppointment || null;
	}

	public create({ provider, date }: CreateAppointmentDto): Appointment {
		const appointment = new Appointment({ provider, date });
		this.appointments.push(appointment);
		return appointment;
	}
}

export default AppointmentsRepository;
