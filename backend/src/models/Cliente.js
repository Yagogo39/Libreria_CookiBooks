const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Cliente = sequelize.define('Cliente', {
    id_cliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_apellido: { type: DataTypes.STRING(200), allowNull: false },
    correo: { type: DataTypes.STRING(255) },
    calle: { type: DataTypes.STRING(150) },
    colonia: { type: DataTypes.STRING(100) },
    municipio: { type: DataTypes.STRING(100) },
    estado: { type: DataTypes.STRING(100) }
}, { tableName: 'cliente', timestamps: false });

module.exports = Cliente;