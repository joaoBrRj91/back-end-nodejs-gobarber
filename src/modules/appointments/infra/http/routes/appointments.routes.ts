import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
// 	const appointmentsRepository = getCustomRepository(AppointmentRepository);
// 	return response.json(await appointmentsRepository.find());
// });

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
