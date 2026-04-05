require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,      
    process.env.DB_USER,      // postgres
    process.env.DB_PASSWORD,  
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false // Para que no ensucie la consola con SQL
    }
);

// Probar la conexión
const probarConexion = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a DB establecida correctamente con Sequelize.');
    } catch (error) {
        console.error('❌ No se pudo conectar a la DB:', error);
    }
};

probarConexion();

module.exports = sequelize;