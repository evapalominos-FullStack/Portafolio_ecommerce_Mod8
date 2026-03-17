// src/routes/upload.js
const express = require('express');
const router  = express.Router();
const path    = require('path');
const auth    = require('../middleware/auth');

// ── POST /api/upload (protegida) ─────────────────────────────────────────────
// Sube una imagen al servidor — requiere JWT
router.post('/', auth, (req, res) => {
  try {
    if (!req.files || !req.files.imagen) {
      return res.status(400).json({ ok: false, mensaje: 'No se recibió ningún archivo' });
    }

    const file = req.files.imagen;
    const ext  = path.extname(file.name).toLowerCase();

    // Validar extensión
    const permitidos = ['.jpg', '.jpeg', '.png', '.gif'];
    if (!permitidos.includes(ext)) {
      return res.status(415).json({ ok: false, mensaje: 'Solo se permiten jpg, jpeg, png, gif' });
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ ok: false, mensaje: 'El archivo no puede superar 5MB' });
    }

    // Nombre único
    const nombre   = `${Date.now()}${ext}`;
    const rutaDest = path.join(__dirname, '../../uploads', nombre);

    file.mv(rutaDest, (err) => {
      if (err) {
        console.error('[UPLOAD]', err.message);
        return res.status(500).json({ ok: false, mensaje: 'Error al guardar el archivo' });
      }

      res.status(201).json({
        ok: true,
        mensaje: 'Imagen subida correctamente',
        archivo: nombre,
        ruta: `/uploads/${nombre}`,
      });
    });
  } catch (e) {
    console.error('[POST /upload]', e.message);
    res.status(500).json({ ok: false, mensaje: 'Error interno' });
  }
});

module.exports = router;
