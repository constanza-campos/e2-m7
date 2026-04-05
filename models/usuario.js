const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'usuarios' // Forzamos el nombre de la tabla en minúsculas
});

module.exports = Usuario;