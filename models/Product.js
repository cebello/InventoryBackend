const db = require('../db');

const Product = {
  getAll: (callback) => {
    db.all('SELECT * FROM inventory', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM inventory WHERE id = ?', [id], callback);
  },

  create: ({ name, size, description }, callback) => {
    db.run(
      'INSERT INTO inventory (name, size, description) VALUES (?, ?, ?)',
      [name, size, description],
      function (err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, name, size, description });
      }
    );
  },

  update: (id, { name, size, description }, callback) => {
    db.run(
      'UPDATE inventory SET name = ?, size = ?, description = ? WHERE id = ?',
      [name, size, description, id],
      function (err) {
        if (err) return callback(err);
        callback(null, { updated: this.changes });
      }
    );
  },

  delete: (id, callback) => {
    db.run('DELETE FROM inventory WHERE id = ?', [id], function (err) {
      if (err) return callback(err);
      callback(null, { deleted: this.changes });
    });
  }
};

module.exports = Product;