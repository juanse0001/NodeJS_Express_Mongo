const express = require('express');
const Usuario = require('../models/curso_model');
const Joi = requiere('@hapi/joi');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de USUARIOS funcionando correctamente....');
});

module.exports = ruta;