const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Autor = sequelize.define('Autor', {
    id_autor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'autor', timestamps: false });

module.exports = Autor;