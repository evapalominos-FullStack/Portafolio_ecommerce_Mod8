// src/routes/cart.js
const express              = require('express');
const router               = express.Router();
const auth                 = require('../middleware/auth');
const { CartItem, Product } = require('../models');

// ── GET /api/cart (protegida) ────────────────────────────────────────────────
// Retorna el carrito del usuario autenticado con JOIN a productos
router.get('/', auth, async (req, res) => {
  try {
    const items = await CartItem.findAll({
      where: { user_id: req.userId },
      include: [{ model: Product, as: 'product' }],
    });

    // Calcular total
    const total = items.reduce((sum, item) => {
      return sum + (parseFloat(item.product.price) * item.quantity);
    }, 0);

    res.status(200).json({ ok: true, data: items, total: parseFloat(total.toFixed(2)) });
  } catch (e) {
    console.error('[GET /cart]', e.message);
    res.status(500).json({ ok: false, mensaje: 'Error al obtener carrito' });
  }
});

// ── POST /api/cart (protegida) ───────────────────────────────────────────────
// Agrega o actualiza un producto en el carrito
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ ok: false, mensaje: 'productId es requerido' });
    }

    // Verificar que el producto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }

    // Si ya está en el carrito, sumar cantidad
    const existing = await CartItem.findOne({
      where: { user_id: req.userId, product_id: productId }
    });

    if (existing) {
      await existing.update({ quantity: existing.quantity + quantity });
      return res.status(200).json({ ok: true, mensaje: 'Cantidad actualizada', data: existing });
    }

    // Si no está, crear nuevo item
    const item = await CartItem.create({
      user_id: req.userId,
      product_id: productId,
      quantity,
    });

    res.status(201).json({ ok: true, mensaje: 'Producto agregado al carrito', data: item });
  } catch (e) {
    console.error('[POST /cart]', e.message);
    res.status(500).json({ ok: false, mensaje: 'Error al agregar al carrito' });
  }
});

// ── DELETE /api/cart/:productId (protegida) ──────────────────────────────────
// Elimina un producto del carrito del usuario autenticado
router.delete('/:productId', auth, async (req, res) => {
  try {
    const item = await CartItem.findOne({
      where: { user_id: req.userId, product_id: req.params.productId }
    });

    if (!item) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no está en el carrito' });
    }

    await item.destroy();
    res.status(200).json({ ok: true, mensaje: 'Producto eliminado del carrito' });
  } catch (e) {
    console.error('[DELETE /cart]', e.message);
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar del carrito' });
  }
});

module.exports = router;
