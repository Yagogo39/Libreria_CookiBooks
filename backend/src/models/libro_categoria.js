const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const LibroCategoria = sequelize.define('LibroCategoria', {
    id_categoria: { type: DataTypes.INTEGER, primaryKey: true },
    id_libro: { type: DataTypes.INTEGER, primaryKey: true }
}, { tableName: 'libro_categoria', timestamps: false });

module.exports = LibroCategoria;