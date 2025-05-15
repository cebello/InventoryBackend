const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'supersecreto123';

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isValid = await require('bcryptjs').compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

// Registro de usuario (opcional)
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.create({ name, email, password }, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(user);
  });
});

module.exports = router;
