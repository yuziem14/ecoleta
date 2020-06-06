import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import routes from './routes';
import ehandler from './handlers/ehandler';

const app = express();

app.set('title', process.env.APP_NAME);

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(ehandler);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Listening at: http://${process.env.HOST}:${PORT}`)
);
