const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Editorial = sequelize.define('Editorial', {
    id_editorial: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'editorial', timestamps: false });

module.exports = Editorial;