const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const database = require('./database/db');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

nunjucks.configure(path.resolve(__dirname, 'views'), {
  express: server,
  noCache: true,
});

server.get('/', (request, response) => {
  return response.render('index.html');
});

server.get('/points/create', (request, response) => {
  return response.render('create-point.html');
});

server.post('/points', (request, response) => {
  const { image, name, address, complement, state, city, items } = request.body;
  const data = [image, name, address, complement, state, city, items];
  const insertQuery = `
      INSERT INTO places (
        image,
        name,
        address,
        complement,
        state,
        city,
        items
      ) VALUES (?,?,?,?,?,?,?);
  `;

  function callback(err) {
    const SUCCESS_MESSAGE = 'Cadastro concluído!';
    const ERROR_MESSAGE =
      'Whoops... Houve um problema, tente novamente mais tarde.';

    const viewParams = {
      showModal: true,
      message: SUCCESS_MESSAGE,
      icon: 'check.svg',
      class: '',
    };

    if (err) {
      viewParams.message = ERROR_MESSAGE;
      viewParams.icon = 'x.svg';
      viewParams.class = 'failed';
    }

    return response.render('create-point.html', viewParams);
  }

  database.run(insertQuery, data, callback);
});

server.get('/points', (request, response) => {
  const { search } = request.query;

  if (!search) return response.render('search-results.html', { places: [] });

  database.all(
    `SELECT * FROM places WHERE city LIKE '%${search}%'`,
    (err, places) => {
      if (err) return console.log(err);

      return response.render('search-results.html', { places });
    }
  );
});

const PORT = 3000;

server.listen(PORT, () =>
  console.log(`Listening at: http://127.0.0.1:${PORT}/`)
);
