import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';

const providerRouter = Router();
const providerController = new ProviderController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index);

export default providerRouter;
