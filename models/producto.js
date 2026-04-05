const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false // No puede ser nulo
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false // No puede ser nulo
    }
}, {
    tableName: 'productos', // Nombre de la tabla en plural
    timestamps: true        // Crea createdAt y updatedAt automáticamente
});

module.exports = Producto;