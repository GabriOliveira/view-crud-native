const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config();

const DB_PATH = process.env.DB_NAME;

const db = new sqlite3.Database(DB_PATH, err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

db.serialize(() => {
  // Cria a tabela users
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
});

module.exports = db;
