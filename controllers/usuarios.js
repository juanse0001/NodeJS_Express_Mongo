const express = require('express');
<<<<<<< HEAD
const Usuario = require('../models/curso_model');
const Joi = require('@hapi/joi');
=======
const Usuario = require('../logic/usuario_logic');
const Joi = requiere('@hapi/joi');
>>>>>>> apirest
const ruta = express.Router();

// Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóú ]{3,30}$/),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
});

// Endpoint de tipo GET para el recurso usuarios. Lista todos los usuarios
ruta.get('/', (req, res) => {
    let resultado = logic.listarUsuarioActivos();
    resultado.then(usuarios => {
        res.json(usuarios);
    })
    .catch(err => {
        res.status(400).json({
            err
        });
    });
});
module.exports = ruta;

// Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;

    const { error, value } = logic.schema.validate({nombre: body.nombre, email: body.email});
    if (!error) {
        let resultado = crearUsuario(body);

        resultado.then(user => {
            res.json({
                valor: user
            });
        })
        .catch(err => {
            res.status(400).json({
                err
            });
        });
    } else {
        res.status(400).json({
            error
        });
    }
});
 

// Endpoint de tipo PUT para actualizar los datos del usuario
ruta.put('/:email', (req, res) => {
    const { error, value } = logic.schema.validate({nombre: req.body.nombre});
    if (!error) {
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor => {
            res.json({
                valor
            });
        })
        .catch(err => {
            res.status(400).json({
                err
            });
        });
    } else {
        res.status(400).json({
            error
        });
    }
});

// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    let usuario = new Usuario({
        email    : body.email,
        nombre   : body.nombre,
        password : body.password
    });
    return await usuario.save();
}

async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOneAndUpdate(
        { "email": email },
        {
            $set: {
                nombre: body.nombre,
                password: body.password
            }
        },
        { new: true }
    );
    return usuario;
}

// Función asíncrona para inactivar un usuario
async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate(
        { "email": email },
        {
            $set: {
                estado: false
            }
        },
        { new: true }
    );
    return usuario;
}

// Endpoint de tipo DELETE para el recurso USUARIOS
ruta.delete('/:email', (req, res) => {
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        });
    })
    .catch(err => {
        res.status(400).json({
            err
        });
    });
});

// Función asíncrona para listar todos los usuarios activos
async function listarUsuarioActivos() {
    let usuarios = await Usuario.find({ "estado": true });
    return usuarios;
}






