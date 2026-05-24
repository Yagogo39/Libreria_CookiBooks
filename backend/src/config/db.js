const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,

    //? Confifuración para servidor externo
    dialectOptions: {
        connectTimeout: 60000, // Tiempo de espera para la conexión (en milisegundos)
    },

    pool: {
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
});

const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Conexión con la BD establecida con éxito')
    } catch (error) {
        console.error('Falló la conexión con la BD:', error.message);
    }
};

module.exports = { sequelize, connectDB };