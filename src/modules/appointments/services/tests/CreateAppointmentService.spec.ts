import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from '../CreateAppointmentService';

describe('CreateAppointment', () => {
	it('should be able to create a new appointment', async () => {
		const fakeAppointmentRepository = new FakeAppointmentRepository();
		const createAppointment = new CreateAppointmentService(
			fakeAppointmentRepository,
		);

		const appointment = await createAppointment.Execute({
			date: new Date(),
			provider_id: '12',
		});

		expect(appointment).toHaveProperty('id');
		// expect(appointment.id).toBeTruthy();
		expect(appointment.provider_id).toBe('12');
	});
});

describe('CreateAppointment', () => {
	it('should not be able to create a two appointments on the same time', async () => {
		const fakeAppointmentRepository = new FakeAppointmentRepository();
		const createAppointment = new CreateAppointmentService(
			fakeAppointmentRepository,
		);

		const appointmentDate = new Date();

		await createAppointment.Execute({
			date: appointmentDate,
			provider_id: '12',
		});

		expect(
			createAppointment.Execute({
				date: appointmentDate,
				provider_id: '12',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
