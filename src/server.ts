import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'Business Error',
			message: err.message,
		});
	}

	return response.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
});

app.listen(3333, () => {
	// eslint-disable-next-line no-console
	console.log('✔ Server Started on port 3333!!');
});
