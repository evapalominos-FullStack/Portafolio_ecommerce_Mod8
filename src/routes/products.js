// src/routes/products.js
const express     = require('express');
const router      = express.Router();
const auth        = require('../middleware/auth');
const { Product } = require('../models');

// ── GET /api/products (protegida) ────────────────────────────────────────────
// Lista todos los productos — requiere JWT
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['id', 'ASC']] });
    res.status(200).json({ ok: true, data: products });
  } catch (e) {
    console.error('[GET /products]', e.message);
    res.status(500).json({ ok: false, mensaje: 'Error al obtener productos' });
  }
});

// ── POST /api/products (protegida) ───────────────────────────────────────────
// Crea un producto nuevo
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ ok: false, mensaje: 'name y price son requeridos' });
    }
    const product = await Product.create({ name, description, price });
    res.status(201).json({ ok: true, data: product });
  } catch (e) {
    console.error('[POST /products]', e.message);
    res.status(500).json({ ok: false, mensaje: 'Error al crear producto' });
  }
});

// ── DELETE /api/products/:id (protegida) ─────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    await product.destroy();
    res.status(200).json({ ok: true, mensaje: 'Producto eliminado' });
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar producto' });
  }
});

module.exports = router;
