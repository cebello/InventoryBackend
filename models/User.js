const db = require('../db');
const bcrypt = require('bcryptjs');

const User = {
  findByEmail: (email, callback) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  create: async ({ name, email, password }, callback) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      function (err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, name, email });
      }
    );
  }
};

module.exports = User;
