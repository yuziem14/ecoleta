const db = require('./db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      complement TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `);

  db.run(`DELETE FROM places`);

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

  const values = [
    [
      'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      'Colectoria',
      'Guilherme Gemballa, Jardim América',
      'Nº 260',
      'Santa Catarina',
      'Rio do Sul',
      'Resíduos Eletrônicos, Lâmpadas',
    ],
    [
      'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
      'Papersider',
      'Guilherme Gemballa, Jardim América',
      'Nº 260',
      'Santa Catarina',
      'Rio do Sul',
      'Papéis e Papelão',
    ],
  ];

  values.map(data => {
    db.run(insertQuery, data, function (err) {
      if (err) return console.log(err);

      console.log(`ID inserted: ${this.lastID}`);
    });
  });
});
