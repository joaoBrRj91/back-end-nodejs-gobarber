import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providerRouter = Router();
const providerController = new ProviderController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index);

providerRouter.get(
	'/:provider_id/day-availability',
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required(),
		},
	}),
	providerDayAvailabilityController.index,
);

providerRouter.get(
	'/:provider_id/month-availability',
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required(),
		},
	}),
	providerMonthAvailabilityController.index,
);

export default providerRouter;
