// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from '../ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProviderAppointments = new ListProviderAppointmentsService(
			fakeAppointmentsRepository,
		);
	});

	it('should be able to list the appointments on a specific day', async () => {
		const appointment1 = await fakeAppointmentsRepository.create({
			provider_id: 'provider_id',
			user_id: 'user_id',
			date: new Date(2020, 4, 20, 8, 0, 0),
		});

		const appointment2 = await fakeAppointmentsRepository.create({
			provider_id: 'provider_id',
			user_id: 'user_id',
			date: new Date(2020, 4, 20, 8, 0, 0),
		});

		const appointments = await listProviderAppointments.execute({
			provider_id: 'provider_id',
			day: 20,
			month: 5,
			year: 2020,
		});

		expect(appointments).toEqual([appointment1, appointment2]);
	});
});
