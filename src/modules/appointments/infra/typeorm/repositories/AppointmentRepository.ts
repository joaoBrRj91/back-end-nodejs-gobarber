import { getRepository, Repository } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
	private ormRepository: Repository<Appointment>;

	constructor() {
		this.ormRepository = getRepository(Appointment);
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = await this.ormRepository.findOne({
			where: { date },
		});
		return findAppointment || undefined;
	}

	public async create({
		provider_id,
		date,
	}: ICreateAppointmentDto): Promise<Appointment> {
		const appointment = this.ormRepository.create({ provider_id, date });
		await this.ormRepository.save(appointment);
		return appointment;
	}
}

export default AppointmentsRepository;
