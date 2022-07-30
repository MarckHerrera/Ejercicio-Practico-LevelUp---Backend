const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
const fichaRutas = require('./src/routes/fichaSolicitud.routes')

// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/

app.use('/api' , fichaRutas); 

module.exports = app;