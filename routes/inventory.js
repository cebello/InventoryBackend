const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'supersecreto123';

// Middleware de autenticación
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Obtener todos los Products
router.get('/', authMiddleware, (req, res) => {
  Product.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener Product por ID
router.get('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  Product.getById(id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product no encontrado' });
    res.json(row);
  });
});

// Agregar Product
router.post('/', authMiddleware, (req, res) => {
  Product.create(req.body, (err, Product) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(Product);
  });
});

// Editar Product
router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  Product.update(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Eliminar Product
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  Product.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;
