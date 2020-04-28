import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../Repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
	return response.json(appointmentRepository.All());
});

appointmentsRouter.post('/', (request, response) => {
	try {
		const { provider, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointment = new CreateAppointmentService(
			appointmentRepository,
		);

		const appointment = createAppointment.Execute({
			provider,
			date: parsedDate,
		});

		return response.json(appointment);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default appointmentsRouter;
