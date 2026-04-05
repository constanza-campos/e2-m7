const sequelize = require('../config/database');
const usuario = require('../models/usuario');
const publicacion = require('../models/publicacion');

usuario.hasMany(publicacion, { foreignKey: 'usuario_id' });
publicacion.belongsTo(usuario, { foreignKey: 'usuario_id' });

async function ejecutarProcesoBlog() {
    try {
        await sequelize.sync({ force: false });
        console.log("INFO: Sincronización de entidades finalizada.");

        const autor = await usuario.create({ 
            nombre: 'Constanza Campos', 
            email: 'ccampos@example.com' 
        });

        await autor.createPublicacion({
            titulo: 'Finalización de Módulo 7',
            contenido: 'Implementación exitosa de relaciones 1:N.'
        });

        const dataset = await usuario.findByPk(autor.id, {
            include: publicacion
        });

        console.log("--- DATASET RELACIONAL ---");
        console.log(JSON.stringify(dataset, null, 2));

    } catch (error) {
        console.error("FATAL ERROR:", error.message);
    } finally {
        await sequelize.close();
        console.log("INFO: Conexión cerrada. Fin del proceso.");
    }
}

ejecutarProcesoBlog();