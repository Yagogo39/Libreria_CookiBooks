const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DetallePedido = sequelize.define('DetallePedido', {
    id_pedido: { type: DataTypes.INTEGER, primaryKey: true },
    id_libro: { type: DataTypes.INTEGER, primaryKey: true },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { tableName: 'detalle_pedido', timestamps: false });

module.exports = DetallePedido;