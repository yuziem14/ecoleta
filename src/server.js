const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

server.use(express.static('public'));

nunjucks.configure(path.resolve(__dirname, 'views'), {
  express: server,
  noCache: true,
});

server.get('/', (request, response) => {
  return response.render('index.html');
});

server.get('/create-point', (request, response) => {
  return response.render('create-point.html');
});

server.get('/search', (request, response) => {
  return response.render('search-results.html');
});

const PORT = 3000;

server.listen(PORT, () =>
  console.log(`Listening at: http://127.0.0.1:${PORT}/`)
);
