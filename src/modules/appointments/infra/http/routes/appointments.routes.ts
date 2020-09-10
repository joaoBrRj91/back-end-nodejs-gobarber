import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
// 	const appointmentsRepository = getCustomRepository(AppointmentRepository);
// 	return response.json(await appointmentsRepository.find());
// });

appointmentsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			provider_id: Joi.string().uuid().required(),
			date: Joi.date(),
		},
	}),
	appointmentController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.Index);

export default appointmentsRouter;
