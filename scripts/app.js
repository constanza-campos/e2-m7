require('dotenv').config();
const express = require('express');
const db = require('../config/db');

const app = express();
app.use(express.json())

app.get('/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios ORDER BY fecha DESC');
    res.json(result.rows) //rows y fields son propiedades del objeto result que devuelve el método query de pg, rows contiene los datos y fields la información de las columnas
  } catch (error) {
    res.status(500).json(error);
  }
})

app.get('/usuarios/:fecha', async (req, res) => {
  const { fecha } = req.params
  console.log(fecha);
  try {
    const result = await db.query(
  `SELECT * 
   FROM usuarios 
   WHERE fecha @> ARRAY[$1::timestamp]
   ORDER BY fecha DESC`,
  [fecha] // El parámetro puede ser solo la fecha, PG le pondrá 00:00:00
);
    console.log(result);
    res.json(result.rows)
  } catch (error) {
    res.status(500).json(error);
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor en puerto http://localhost:${PORT}/usuarios`));