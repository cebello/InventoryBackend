const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

const dbPath = process.env.SQLITE_DB_PATH || path.join(__dirname, 'db', 'inventory.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con SQLite:', err.message);
    process.exit(1);
  }
});

async function crearUsuarioDemo() {
  try {
    const passwordHash = await bcrypt.hash('123456', 10);

    // Insertar usuario demo
    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      ['Usuario Demo', 'usuario@demo.com', passwordHash],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            console.log('⚠️ Usuario demo ya existe');
          } else {
            console.error('❌ Error al crear usuario:', err.message);
          }
        } else {
          console.log('✅ Usuario creado correctamente con ID:', this.lastID);
        }
        db.close();
      }
    );
  } catch (error) {
    console.error('❌ Error al hashear la contraseña:', error);
    db.close();
  }
}

crearUsuarioDemo();