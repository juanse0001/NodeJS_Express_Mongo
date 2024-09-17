const express = require('express');
const usuarioController = require('../controllers/usuarios'); // Importa los controladores
const router = express.Router();

// Listar usuarios activos
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Listar usuarios activos
 *     tags: ["Usuarios"]
 *     responses:
 *       200:
 *         description: Lista de usuarios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d21bb67c1b2c001f647b4e"
 *                   email:
 *                     type: string
 *                     example: "ana@example.com"
 *                   nombre:
 *                     type: string
 *                     example: "Ana Gómez"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *                   imagen:
 *                     type: string
 *                     example: "https://example.com/imagen.jpg"
 *                   cursos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d21bb67c1b2c001f647b4e"
 *             example:
 *               - _id: "60d21bb67c1b2c001f647b4e"
 *                 email: "ana@example.com"
 *                 nombre: "Ana Gómez"
 *                 estado: true
 *                 imagen: "https://example.com/imagen.jpg"
 *                 cursos:
 *                   - "60d21bb67c1b2c001f647b4e"
 *               - _id: "60d21bb67c1b2c001f647b4f"
 *                 email: "luis@example.com"
 *                 nombre: "Luis Pérez"
 *                 estado: true
 *                 imagen: "https://example.com/imagen2.jpg"
 *                 cursos:
 *                   - "60d21bb67c1b2c001f647b4f"
 */
router.get('/', usuarioController.listarUsuarioActivos);

// Listar cursos del usuario
/**
 * @swagger
 * /usuarios/{usuarioId}/cursos:
 *   get:
 *     summary: Listar cursos del usuario
 *     tags: ["Usuarios"]
 *     parameters:
 *       - name: usuarioId
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21bb67c1b2c001f647b4e"
 *     responses:
 *       200:
 *         description: Lista de cursos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d21bb67c1b2c001f647b4e"
 *                   titulo:
 *                     type: string
 *                     example: "Introducción a React.js"
 *                   descripcion:
 *                     type: string
 *                     example: "Curso básico sobre React.js"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *                   imagen:
 *                     type: string
 *                     example: "https://example.com/react.png"
 *                   alumnos:
 *                     type: number
 *                     example: 20
 *                   calificacion:
 *                     type: number
 *                     example: 4.7
 *             example:
 *               - _id: "60d21bb67c1b2c001f647b4e"
 *                 titulo: "Introducción a React.js"
 *                 descripcion: "Curso básico sobre React.js"
 *                 estado: true
 *                 imagen: "https://example.com/react.png"
 *                 alumnos: 20
 *                 calificacion: 4.7
 *               - _id: "60d21bb67c1b2c001f647b4f"
 *                 titulo: "Desarrollo web con HTML y CSS"
 *                 descripcion: "Curso completo sobre desarrollo web"
 *                 estado: true
 *                 imagen: "https://example.com/html_css.png"
 *                 alumnos: 15
 *                 calificacion: 4.8
 */
router.get('/:usuarioId/cursos', usuarioController.listarCursosDeUsuario);

// Crear un usuario sin cursos (para el frontend)
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un usuario sin cursos (para el frontend)
 *     tags: ["Usuarios"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "ana@example.com"
 *               nombre:
 *                 type: string
 *                 example: "Ana Gómez"
 *               password:
 *                 type: string
 *                 example: "Contraseña123!"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/imagen.jpg"
 *             required:
 *               - email
 *               - nombre
 *               - password
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d21bb67c1b2c001f647b4e"
 *                 email:
 *                   type: string
 *                   example: "ana@example.com"
 *                 nombre:
 *                   type: string
 *                   example: "Ana Gómez"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/imagen.jpg"
 *                 cursos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "60d21bb67c1b2c001f647b4e"
 *             example:
 *               _id: "60d21bb67c1b2c001f647b4e"
 *               email: "ana@example.com"
 *               nombre: "Ana Gómez"
 *               estado: true
 *               imagen: "https://example.com/imagen.jpg"
 *               cursos: []
 */

router.post('/', usuarioController.crearUsuario);

// Crear un usuario con cursos (para el frontend en la sección Home)
/**
 * @swagger
 * /usuarios/{email}/cursos:
 *   post:
 *     summary: Crear un usuario con cursos (para el frontend en la sección Home)
 *     tags: ["Usuarios"]
 *     parameters:
 *       - name: email
 *         in: path
 *         description: Email del usuario
 *         required: true
 *         schema:
 *           type: string
 *           example: "ana@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d21bb67c1b2c001f647b4e"
 *             required:
 *               - cursos
 *     responses:
 *       200:
 *         description: Usuario actualizado con los cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d21bb67c1b2c001f647b4e"
 *                 email:
 *                   type: string
 *                   example: "ana@example.com"
 *                 nombre:
 *                   type: string
 *                   example: "Ana Gómez"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/imagen.jpg"
 *                 cursos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "60d21bb67c1b2c001f647b4e"
 *             example:
 *               _id: "60d21bb67c1b2c001f647b4e"
 *               email: "ana@example.com"
 *               nombre: "Ana Gómez"
 *               estado: true
 *               imagen: "https://example.com/imagen.jpg"
 *               cursos:
 *                 - "60d21bb67c1b2c001f647b4e"
 *                 - "60d21bb67c1b2c001f647b4f"
 */
router.post('/:email/cursos', usuarioController.agregarCursosAUsuario);

// Guardar una colección de usuarios
/**
 * @swagger
 * /usuarios/coleccion:
 *   post:
 *     summary: Guardar una colección de usuarios
 *     tags: ["Usuarios"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "ana@example.com"
 *                 nombre:
 *                   type: string
 *                   example: "Ana Gómez"
 *                 password:
 *                   type: string
 *                   example: "Contraseña123!"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/imagen.jpg"
 *             required:
 *               - email
 *               - nombre
 *               - password
 *     responses:
 *       201:
 *         description: Colección de usuarios guardada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d21bb67c1b2c001f647b4e"
 *                   email:
 *                     type: string
 *                     example: "ana@example.com"
 *                   nombre:
 *                     type: string
 *                     example: "Ana Gómez"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *                   imagen:
 *                     type: string
 *                     example: "https://example.com/imagen.jpg"
 *                   cursos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d21bb67c1b2c001f647b4e"
 *             example:
 *               - _id: "60d21bb67c1b2c001f647b4e"
 *                 email: "ana@example.com"
 *                 nombre: "Ana Gómez"
 *                 estado: true
 *                 imagen: "https://example.com/imagen.jpg"
 *                 cursos: []
 *               - _id: "60d21bb67c1b2c001f647b4f"
 *                 email: "luis@example.com"
 *                 nombre: "Luis Pérez"
 *                 estado: true
 *                 imagen: "https://example.com/imagen2.jpg"
 *                 cursos: []
 */

router.post('/coleccion', usuarioController.guardarColeccionUsuarios);

// Actualizar un usuario
/**
 * @swagger
 * /usuarios/{email}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: ["Usuarios"]
 *     parameters:
 *       - name: email
 *         in: path
 *         description: Email del usuario
 *         required: true
 *         schema:
 *           type: string
 *           example: "ana@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ana@example.com"
 *               nombre:
 *                 type: string
 *                 example: "Ana Gómez"
 *               password:
 *                 type: string
 *                 example: "NuevaContraseña123!"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/nueva-imagen.jpg"
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d21bb67c1b2c001f647b4e"
 *             required:
 *               - email
 *               - nombre
 *               - password
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d21bb67c1b2c001f647b4e"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "ana@example.com"
 *                 nombre:
 *                   type: string
 *                   example: "Ana Gómez"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/nueva-imagen.jpg"
 *                 cursos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "60d21bb67c1b2c001f647b4e"
 *             example:
 *               _id: "60d21bb67c1b2c001f647b4e"
 *               email: "ana@example.com"
 *               nombre: "Ana Gómez"
 *               estado: true
 *               imagen: "https://example.com/nueva-imagen.jpg"
 *               cursos:
 *                 - "60d21bb67c1b2c001f647b4e"
 *                 - "60d21bb67c1b2c001f647b4f"
 */


router.put('/:email', usuarioController.actualizarUsuario);

// Eliminar usuario
/**
 * @swagger
 * /usuarios/{email}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: ["Usuarios"]
 *     parameters:
 *       - name: email
 *         in: path
 *         description: Email del usuario a eliminar
 *         required: true
 *         schema:
 *           type: string
 *           example: "ana@example.com"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado exitosamente"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuario no encontrado"
 */
router.delete('/:email', usuarioController.desactivarUsuario);


// Ruta para actualizar los cursos de un usuario
/**
 * @swagger
 * /usuarios/{email}/cursos:
 *   put:
 *     summary: Actualiza los cursos de un usuario
 *     tags:
 *       - Usuarios
 *     description: Permite actualizar los cursos asociados a un usuario existente.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: "juan.perez@example.com"
 *         description: Correo electrónico del usuario cuyo listado de cursos será actualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d6d7e4f52e4d73d8f86077"
 *                 description: IDs de los cursos que serán asignados al usuario
 *     responses:
 *       200:
 *         description: Cursos actualizados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cursos actualizados correctamente"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     nombre:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     cursos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60d6d7e4f52e4d73d8f86077"
 *                           titulo:
 *                             type: string
 *                             example: "Curso de Node.js"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El array de cursos es requerido"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar los cursos del usuario"
 */

router.put('/:email/cursos', usuarioController.actualizarCursosDelUsuario);
module.exports = router;
