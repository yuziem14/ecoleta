const express = require('express');

const server = express();

server.use(express.static('public'));

server.get('/', (request, response) => {
  return response.sendFile(`${__dirname}/views/index.html`);
});

const PORT = 3000;

server.listen(PORT, () =>
  console.log(`Listening at: http://127.0.0.1:${PORT}/`)
);
