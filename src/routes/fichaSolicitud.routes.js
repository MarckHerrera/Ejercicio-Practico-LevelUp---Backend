const express = require('express');
const controladorFicha = require('../controllers/fichaSolicitud.controller');


/* Middlewares */
const api = express.Router();

/* Rutas */
api.post('/solicitudFicha', controladorFicha.agregarFicha);
api.get('/verFichas', controladorFicha.verFichas);

module.exports = api;
