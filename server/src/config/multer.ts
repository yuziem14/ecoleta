import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
  fileFilter: (request, file, callback) => {
    const allowdMimeTypes = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/svg+xml',
    ];

    if (!allowdMimeTypes.includes(file.mimetype)) {
      const message = `Image with ${file.mimetype} extension not supported.`;

      request.fileValidationError = {
        status: 400,
        message,
      };

      callback(new Error(message));
      return;
    }

    callback(null, true);
  },
};
