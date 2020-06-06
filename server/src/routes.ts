import express from 'express';
import multer from 'multer';
import pointValidator from './validators/storePoint';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import storePoint from './validators/storePoint';

const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (request, response) =>
  response.json({ gretting: 'API Powered by Express' })
);

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.post(
  '/points',
  upload.single('image'),
  storePoint,
  pointsController.store
);
routes.get('/points/:id', pointsController.show);

export default routes;
