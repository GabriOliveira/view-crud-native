const db = require('./../config/db');
class Usuario{
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
      }

      static all(callback) {
        db.all('SELECT * FROM users', (err, rows) => {
          if (err) {
            callback(err);
          } else {
            const users = rows.map(row => new Usuario(row.id, row.name, row.email, row.password));
            callback(null, users);
          }
        });
      }

      static create(name, email, password, callback) {
        db.run(
        `
          INSERT INTO users (name, email, password)
          VALUES (?, ?, ?)
        `, [name, email, password], function(err) {
          if (err) {
            callback(err);
          } else {
            const user = new Usuario(this.lastID, name, email, password);
            callback(null, user);
          }
        });
      }

      static update(name, email, password, callback) {
        db.run(
        `
          UPDATE users (name, email, password)
          VALUES (?, ?, ?)
        `, [name, email, password], function(err) {
          if (err) {
            callback(err);
          } else {
            const user = new Usuario(this.lastID, name, email, password);
            callback(null, user);
          }
        });
      }

      static update(id, name, email, password, callback) {
        db.run(`
          UPDATE users
          SET name = ?, email = ?, password = ?
          WHERE id = ?
        `, [name, email, password, id], (err) => {
          callback(err);
        });
      }

      static delete(id, callback) {
        db.run(`
          DELETE FROM users
          WHERE id = ?
        `, id, (err) => {
          callback(err);
        });
      }

}
module.exports = Usuario;