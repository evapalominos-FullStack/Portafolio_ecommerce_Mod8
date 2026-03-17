// src/routes/auth.js
const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { User } = require('../models');

// ── POST /api/auth/register ──────────────────────────────────────────────────
// Registra un nuevo usuario — hashea la contraseña con bcrypt
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, mensaje: 'username, email y password son requeridos' });
    }

    // Verificar si ya existe
    const existe = await User.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({ ok: false, mensaje: 'El email ya está registrado' });
    }

    // Hashear contraseña — nunca se guarda la contraseña real
    // 10 = número de rondas de encriptación (más alto = más seguro pero más lento)
    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password_hash });

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado correctamente',
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (e) {
    console.error('[POST /register]', e.message);
    res.status(500).json({ ok: false, mensaje: 'Error al registrar usuario' });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────
// Login — verifica contraseña y genera JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, mensaje: 'email y password son requeridos' });
    }

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
    }

    // Comparar contraseña con el hash guardado
    const passwordOk = await bcrypt.compare(password, user.password_hash);
    if (!passwordOk) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
    }

    // Generar JWT — expira en 8 horas
    const token = jwt.sign(
      { user_id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({
      ok: true,
      mensaje: 'Login exitoso',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (e) {
    console.error('[POST /login]', e.message);
    res.status(500).json({ ok: false, mensaje: 'Error al iniciar sesión' });
  }
});

module.exports = router;
