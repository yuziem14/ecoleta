import express from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import routes from './routes';
import ehandler from './handlers/ehandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(ehandler);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

const PORT = 3333;
app.listen(PORT, () => console.log(`Listening at: http://127.0.0.1:${PORT}/`));
