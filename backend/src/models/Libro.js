const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Libro = sequelize.define('Libro', {
    id_libro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(255), allowNull: false },
    edicion: { type: DataTypes.STRING(100) },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stockminimo: { type: DataTypes.INTEGER, defaultValue: 5 },
    stockmaximo: { type: DataTypes.INTEGER, defaultValue: 100 },
    existencias: { type: DataTypes.INTEGER, defaultValue: 0 },
    imagen_url: { type: DataTypes.STRING(500) },
    id_autor: { type: DataTypes.INTEGER },
    id_editorial: { type: DataTypes.INTEGER }
}, { tableName: 'libros', timestamps: false });

module.exports = Libro;