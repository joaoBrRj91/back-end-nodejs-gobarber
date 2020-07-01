import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
// 	const appointmentsRepository = getCustomRepository(AppointmentRepository);
// 	return response.json(await appointmentsRepository.find());
// });

appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentService(
		appointmentsRepository,
	);

	const appointment = await createAppointment.Execute({
		provider_id,
		date: parsedDate,
	});

	return response.json(appointment);
});

export default appointmentsRouter;
