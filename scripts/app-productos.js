const sequelize = require('../config/database');
const Producto = require('../models/producto');

async function ejecutarCRUD() {
    try {
        // 1. Sincronizar: Crea la tabla si no existe
        await sequelize.sync({ force: false }); 
        console.log("🚀 Tabla sincronizada.");

        // --- 1. CREAR (create) ---
        const nuevo = await Producto.create({ 
            nombre: 'Teclado Mecánico', 
            precio: 45000.50 
        });
        console.log(`✅ Producto creado: ${nuevo.nombre}`);

        // --- 2. LEER (findAll y findByPk) ---
        const productos = await Producto.findAll();
        console.log("📋 Todos los productos:");
        console.table(productos.map(p => p.toJSON()));

        const uno = await Producto.findByPk(1);
        console.log("🔍 Producto con ID 1:", uno ? uno.nombre : "No encontrado");

        // --- 3. ACTUALIZAR (update) ---
        await Producto.update(
            { precio: 39990.00 }, 
            { where: { id: 1 } }
        );
        console.log("🔄 Precio del producto 1 actualizado.");

        // --- 4. ELIMINAR (destroy) ---
        // await Producto.destroy({ where: { id: 2 } });
        // console.log("Producto eliminado.");

    } catch (error) {
        console.error("❌ Error en el CRUD:", error);
    } finally {
        await sequelize.close();
    }
}

ejecutarCRUD();