// src/middleware/auth.js
// Middleware JWT — verifica el token en cada ruta protegida
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // El token viene en el header: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar y decodificar el token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.user_id; // disponible en todas las rutas protegidas
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, mensaje: 'Token inválido o expirado' });
  }
};
