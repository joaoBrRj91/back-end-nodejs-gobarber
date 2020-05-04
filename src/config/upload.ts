import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'tmp'),
		filename(request, file, callback) {
			const filehash = crypto.randomBytes(10).toString('HEX');
			const fileName = `${filehash}-${file.originalname}`;
			return callback(null, fileName);
		},
	}),
};
