// src/models/index.js
const sequelize = require('../db/sequelize');

const User     = require('./User')(sequelize);
const Product  = require('./Product')(sequelize);
const CartItem = require('./CartItem')(sequelize);

// Asociaciones
User.hasMany(CartItem,     { foreignKey: 'user_id',    as: 'cartItems' });
CartItem.belongsTo(User,   { foreignKey: 'user_id',    as: 'user' });
Product.hasMany(CartItem,  { foreignKey: 'product_id', as: 'cartItems' });
CartItem.belongsTo(Product,{ foreignKey: 'product_id', as: 'product' });

module.exports = { sequelize, User, Product, CartItem };
