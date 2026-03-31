const { pool } = require('./db'); // Importamos el pool

const realizarTransferencia = async (cuentaOrigenId, cuentaDestinoId, monto) => {
    // 1. Obtener un cliente del pool
    const client = await pool.connect();

    try {
        // 2. Iniciar la transacción 
        await client.query('BEGIN');

        // 3. Restar dinero de la cuenta origen
        const sqlRestar = 'UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2';
        await client.query(sqlRestar, [monto, cuentaOrigenId]);

        // 4. Sumar dinero a la cuenta destino
        const sqlSumar = 'UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2';
        await client.query(sqlSumar, [monto, cuentaDestinoId]);

        // 5. Si llegamos aquí sin errores, guardamos todo permanentemente
        await client.query('COMMIT');
        console.log(` Transferencia de $${monto} realizada con éxito.`);

    } catch (error) {
        // 6. Si algo falló (ej: saldo insuficiente), deshacemos TODO
        await client.query('ROLLBACK');
        console.error(' Error en la transferencia. Se aplicó ROLLBACK:', error.message);
    } finally {
        // 7. SIEMPRE liberamos al cliente para que otros puedan usarlo
        client.release();
    }
};

// --- PRUEBAS ---
async function pruebas() {
    console.log("--- Caso 1: Transferencia Exitosa ---");
    await realizarTransferencia(1, 2, 100.00); // Juan le da 100 a María

    console.log("\n--- Caso 2: Error (Saldo Insuficiente) ---");
    // María solo tiene 600 ahora, si intenta enviar 1000, el CHECK(saldo >= 0) saltará
    await realizarTransferencia(2, 1, 1000.00); 
}

pruebas();