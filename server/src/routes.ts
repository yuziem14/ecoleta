import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (request, response) =>
  response.json({ gretting: 'API Powered by Express' })
);

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.post('/points', pointsController.store);
routes.get('/points/:id', pointsController.show);

export default routes;