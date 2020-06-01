import express from 'express';

const app = express();

app.get('/', (request, response) =>
  response.json({ gretting: 'API Powered by Express' })
);

const PORT = 3333;
app.listen(PORT, () => console.log(`Listening at: http://127.0.0.1:${PORT}/`));
