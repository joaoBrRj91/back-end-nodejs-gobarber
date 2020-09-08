import { Request, Response } from 'express';
import { container } from 'tsyringe';
import listProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
	public async Index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const provider_id = request.user.id;
		const { day, month, year } = request.body;

		const listProviderAppointments = container.resolve(
			listProviderAppointmentsService,
		);

		const appointments = await listProviderAppointments.execute({
			provider_id,
			day,
			month,
			year,
		});

		return response.json(appointments);
	}
}
