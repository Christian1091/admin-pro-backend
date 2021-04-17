require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } =  require('./database/config');

// Crear servidor de express
const app = express();

// Configurar CORS
app.use(cors());

//Base de Datos
dbConnection();

// Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
} );

//levantar el servidor
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
})