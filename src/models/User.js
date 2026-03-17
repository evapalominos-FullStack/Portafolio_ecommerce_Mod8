// src/models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('User', {
    id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username:      { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email:         { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  }, { tableName: 'users', timestamps: false });
