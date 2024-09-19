const Usuario = require('../models/usuario_model');
const Curso = require('../models/curso_model');

// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    const usuarioExistente = await Usuario.findOne({ email: body.email });
    if (usuarioExistente) {
        throw new Error('El correo electrónico ya está registrado');
    }
    const usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password,
        imagen: body.imagen,
        cursos: body.cursos || [] // Si se envían cursos, los añadimos
    });
    return await usuario.save();
}

// Función asíncrona para actualizar un usuario y agregar cursos
async function actualizarUsuario(email, body) {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    if (body.cursos && body.cursos.length > 0) {
        const nuevosCursos = body.cursos.filter(cursoId => !usuario.cursos.includes(cursoId));
        usuario.cursos.push(...nuevosCursos); // Agregar cursos no duplicados
    }

    usuario.nombre = body.nombre || usuario.nombre;
    usuario.password = body.password || usuario.password;
    usuario.estado = body.estado !== undefined ? body.estado : usuario.estado;
    usuario.imagen = body.imagen || usuario.imagen;

    return await usuario.save();
}

// Función asíncrona para inactivar un usuario
async function desactivarUsuario(email) {
    const usuario = await Usuario.findOneAndUpdate(
        { email },
        { $set: { estado: false } },
        { new: true }
    );
    return usuario;
}

// Función asíncrona para listar todos los usuarios activos
async function listarUsuarioActivos() {
    const usuarios = await Usuario.find({ estado: true }).populate('cursos', 'titulo');
    return usuarios.map(usuario => ({
        _id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
        estado: usuario.estado,
        imagen: usuario.imagen,
        cursos: usuario.cursos.map(curso => curso.titulo) // Solo títulos
    }));
}

// Función asíncrona para agregar cursos a un usuario
async function agregarCursosAUsuario(email, cursosIds) {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    const nuevosCursos = cursosIds.filter(cursoId => !usuario.cursos.includes(cursoId));
    usuario.cursos.push(...nuevosCursos);
    return await usuario.save();
}

// Función asíncrona para guardar una colección de usuarios
async function guardarColeccionUsuarios(usuarios) {
    const resultados = [];
    for (const usuarioData of usuarios) {
        const usuarioExistente = await Usuario.findOne({ email: usuarioData.email });
        if (!usuarioExistente) {
            const nuevoUsuario = new Usuario({
                email: usuarioData.email,
                nombre: usuarioData.nombre,
                password: usuarioData.password,
                estado: usuarioData.estado !== undefined ? usuarioData.estado : true,
                imagen: usuarioData.imagen || null,
                cursos: usuarioData.cursos || []
            });
            resultados.push(await nuevoUsuario.save());
        } else {
            console.log(`El correo electrónico "${usuarioData.email}" ya está registrado.`);
        }
    }
    return resultados;
}

// Función para listar los cursos de un usuario
async function listarCursosDeUsuario(usuarioId) {
    const usuario = await Usuario.findById(usuarioId).populate('cursos');
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    return usuario.cursos;
}

module.exports = {
    agregarCursosAUsuario,
    listarCursosDeUsuario,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuarioActivos,
    guardarColeccionUsuarios
};
