const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const database = require('./database/db');

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
  database.all('SELECT * FROM places', (err, places) => {
    if (err) return console.log(err);

    return response.render('search-results.html', { places });
  });
});

const PORT = 3000;

server.listen(PORT, () =>
  console.log(`Listening at: http://127.0.0.1:${PORT}/`)
);
