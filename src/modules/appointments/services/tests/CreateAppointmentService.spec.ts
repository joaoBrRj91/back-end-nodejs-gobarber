import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentRepository from '../../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from '../CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentRepository = new FakeAppointmentRepository();
		fakeNotificationsRepository = new FakeNotificationsRepository();
		createAppointment = new CreateAppointmentService(
			fakeAppointmentRepository,
			fakeNotificationsRepository,
		);
	});

	it('should be able to create a new appointment', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		const appointment = await createAppointment.Execute({
			date: new Date(2020, 4, 10, 13),
			provider_id: '12',
			user_id: '1',
		});

		expect(appointment).toHaveProperty('id');
		// expect(appointment.id).toBeTruthy();
		expect(appointment.provider_id).toBe('12');
	});

	it('should not be able to create a two appointments on the same time', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		await createAppointment.Execute({
			date: new Date(2020, 4, 10, 13),
			provider_id: '12',
			user_id: '1',
		});

		await expect(
			createAppointment.Execute({
				date: new Date(2020, 4, 10, 13),
				provider_id: '12',
				user_id: '1',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create a an appointment on a past date', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		await expect(
			createAppointment.Execute({
				date: new Date(2020, 4, 10, 11),
				provider_id: '12',
				user_id: '1',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create a an appointment with same user as provider', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		await expect(
			createAppointment.Execute({
				date: new Date(2020, 4, 10, 13),
				provider_id: '12',
				user_id: '12',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create a an appointment before 8am and after 5pm', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		await expect(
			createAppointment.Execute({
				date: new Date(2020, 4, 11, 7),
				provider_id: 'provider-id',
				user_id: 'user-id',
			}),
		).rejects.toBeInstanceOf(AppError);

		await expect(
			createAppointment.Execute({
				date: new Date(2020, 4, 11, 18),
				provider_id: 'provider-id',
				user_id: 'user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
