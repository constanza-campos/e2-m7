const { query } = require('./db'); 

// 1. FUNCIÓN INSERTAR (CREATE)
const insertarTarea = async (titulo, descripcion) => {
    try {
        const consulta = 'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2)';
        const valores = [titulo, descripcion];
        
        const resultado = await query(consulta, valores);
        
        console.log(`Tarea "${titulo}" insertada. Filas afectadas: ${resultado.rowCount}`);
    } catch (error) {
        console.error("Error al insertar:", error.message);
    }
};

// 2. FUNCIÓN ACTUALIZAR (UPDATE)
const actualizarTarea = async (id, nuevoTitulo, nuevaDescripcion) => {
    try {
        const consulta = 'UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3';
        const valores = [nuevoTitulo, nuevaDescripcion, id];
        
        const resultado = await query(consulta, valores);
        
        if (resultado.rowCount > 0) {
            console.log(`Tarea ID ${id} actualizada con éxito.`);
        } else {
            console.log(`No se encontró la tarea con ID ${id} para actualizar.`);
        }
    } catch (error) {
        console.error("Error al actualizar:", error.message);
    }
};

// 3. FUNCIÓN ELIMINAR (DELETE)
const eliminarTarea = async (id) => {
    try {
        const consulta = 'DELETE FROM tareas WHERE id = $1';
        const valores = [id];
        
        const resultado = await query(consulta, valores);
        
        if (resultado.rowCount > 0) {
            console.log(`Tarea ID ${id} eliminada.`);
        } else {
            console.log(`No existe ninguna tarea con ID ${id} para borrar.`);
        }
    } catch (error) {
        console.error("Error al eliminar:", error.message);
    }
};

// FUNCIÓN PRINCIPAL PARA PROBAR TODO
async function main() {
    console.log("--- Iniciando pruebas CRUD ---");
    
    await insertarTarea('Estudiar para el IP', 'Repasar Node y Postgres para el examen.');
    await actualizarTarea(1, 'Dominando Node.js', 'Ya completé la primera parte de la guía.');
    await eliminarTarea(2); 
    
    console.log("--- Pruebas finalizadas ---");
}

main();