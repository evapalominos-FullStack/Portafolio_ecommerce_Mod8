// src/models/CartItem.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('CartItem', {
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id:    { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity:   { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  }, { tableName: 'cart_items', timestamps: false });
