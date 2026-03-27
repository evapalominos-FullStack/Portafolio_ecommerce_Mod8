// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const { sequelize, Product } = require('./models');

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const uploadRouter = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── Rutas API ──────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/upload', uploadRouter);

// ── Ruta raíz ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ── 404 ────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: `Ruta ${req.method} ${req.path} no encontrada` });
});

// ── Seed de productos de ejemplo ───────────────────────────────────────────
const PRODUCTOS = [
  { name: 'MacBook Air M3', description: 'Laptop ultradelgada con chip M3', price: 1299 },
  { name: 'iPhone 16 Pro', description: 'Smartphone flagship de Apple', price: 999 },
  { name: 'AirPods Pro 3', description: 'Auriculares inalámbricos premium', price: 249 },
  { name: 'iPad Air M2', description: 'Tablet potente y versátil', price: 599 },
  { name: 'Apple Watch Ultra', description: 'Smartwatch de alta gama', price: 799 },
  { name: 'Mac mini M4', description: 'Computador compacto y potente', price: 599 },
  { name: 'Apple TV 4K', description: 'Streaming en resolución 4K HDR', price: 129 },
  { name: 'HomePod mini', description: 'Altavoz inteligente con Siri', price: 99 },
];

// ── Inicialización ─────────────────────────────────────────────────────────
async function bootstrap() {
  try {
    await sequelize.sync({ force: false });
    console.log('[Sequelize] Tablas sincronizadas ✓');

    const count = await Product.count();
if (count === 0) {
  await Product.bulkCreate(PRODUCTOS);
}
    console.log('[Seed] Productos insertados ✓');

    // Resetear secuencia
    await sequelize.query(
      `SELECT setval(pg_get_serial_sequence('products', 'id'), MAX(id)) FROM products;`
    );

    app.listen(PORT, () => {
      console.log(`\n🛒 E-Commerce corriendo en http://localhost:${PORT}`);
      console.log(`   Auth:     POST /api/auth/register | POST /api/auth/login`);
      console.log(`   Products: GET  /api/products`);
      console.log(`   Cart:     GET/POST/DELETE /api/cart\n`);
    });
  } catch (e) {
    console.error('[bootstrap]', e.message);
    process.exit(1);
  }
}

bootstrap();