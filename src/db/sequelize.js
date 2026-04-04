// src/db/sequelize.js
// Conexión a PostgreSQL con Sequelize
require('dotenv').config();
const { Sequelize } = require('sequelize');

const estaEnProduccion = process.env.DATABASE_URL.includes('render.com');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: estaEnProduccion ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

module.exports = sequelize;


//¿Ves la lógica?
//- `estaEnProduccion` revisa si la URL contiene `render.com`
//- Si sí → activa SSL (para Render)
//- Si no → sin SSL (para tu computador local)

//Pero también necesitas cambiar tu `.env` local para que apunte a tu base de datos local, no a Render. Abre el `.env` y cambia `DATABASE_URL` por tu base de datos local:

//DATABASE_URL=postgres://postgres:TU_CONTRASEÑA@localhost:5432/ecommerce_db