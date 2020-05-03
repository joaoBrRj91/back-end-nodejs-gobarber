import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionRouter from './session.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
