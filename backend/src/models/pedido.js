const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pedido = sequelize.define('Pedido', {
    id_pedido: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fechainicio: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    fechaexpiracion: { type: DataTypes.DATEONLY },
    total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    id_cliente: { type: DataTypes.INTEGER }
}, { tableName: 'pedido', timestamps: false });

module.exports = Pedido;