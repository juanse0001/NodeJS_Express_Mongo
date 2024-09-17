const express = require('express');
const cursoController = require('../controllers/cursos'); // Importa el controlador
const router = express.Router(); // Define el enrutador

// Listar todos los cursos activos
/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos los cursos activos
 *     tags: ["Cursos"]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "66d05dddb025aa6e3201654b"
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
 *               - id: "66d05dddb025aabc32c16540"
 *                 titulo: "Introducción a React.js"
 *                 descripcion: "Curso básico sobre React.js"
 *                 estado: true
 *                 imagen: "https://example.com/react.png"
 *                 alumnos: 20
 *                 calificacion: 4.7
 *               - id: "66d05dddb025aa6c32c1654c"
 *                 titulo: "Desarrollo web con HTML y CSS"
 *                 descripcion: "Curso completo sobre desarrollo web"
 *                 estado: true
 *                 imagen: "https://example.com/html_css.png"
 *                 alumnos: 15
 *                 calificacion: 4.8
 */


router.get('/', cursoController.listarCursosActivos);

// Obtener curso por Id
/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtener curso por Id
 *     tags: ["Cursos"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del curso.
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66d05dddb025aa6e3201654b"
 *                 titulo:
 *                   type: string
 *                   example: "Introducción a React.js"
 *                 descripcion:
 *                   type: string
 *                   example: "Curso básico sobre React.js"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/react.png"
 *                 alumnos:
 *                   type: number
 *                   example: 20
 *                 calificacion:
 *                   type: number
 *                   example: 4.7
 *       404:
 *         description: Curso no encontrado
 */

router.get('/:id', cursoController.obtenerCursoPorId);

// Obtener los usuarios para un curso
/**
 * @swagger
 * /cursos/{id}/usuarios:
 *   get:
 *     summary: Obtener los usuarios para un curso
 *     tags: ["Cursos"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del curso.
 *     responses:
 *       200:
 *         description: Lista de usuarios para el curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d21bb67c1b2c001f647b4e"
 *                   nombre:
 *                     type: string
 *                     example: "Ana Gómez"
 *                   email:
 *                     type: string
 *                     example: "ana@example.com"
 *       404:
 *         description: Curso no encontrado
 */

router.get('/:id/usuarios', cursoController.obtenerUsuariosPorCurso);

// Crear un curso
/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Crear un curso
 *     tags: ["Cursos"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Introducción a React.js"
 *               descripcion:
 *                 type: string
 *                 example: "Curso básico sobre React.js"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/react.png"
 *               alumnos:
 *                 type: number
 *                 example: 20
 *               calificacion:
 *                 type: number
 *                 example: 4.7
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66d05dddb025aa6e3201654b"
 *                 titulo:
 *                   type: string
 *                   example: "Introducción a React.js"
 *                 descripcion:
 *                   type: string
 *                   example: "Curso básico sobre React.js"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/react.png"
 *                 alumnos:
 *                   type: number
 *                   example: 20
 *                 calificacion:
 *                   type: number
 *                   example: 4.7
 */

router.post('/', cursoController.crearCurso);

// Crear Colección de Cursos
/**
 * @swagger
 * /cursos/coleccion:
 *   post:
 *     summary: Crear una colección de cursos
 *     tags: ["Cursos"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                   example: "Curso Avanzado de JavaScript"
 *                 descripcion:
 *                   type: string
 *                   example: "Curso completo sobre JavaScript avanzado"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/js.png"
 *                 alumnos:
 *                   type: number
 *                   example: 25
 *                 calificacion:
 *                   type: number
 *                   example: 4.9
 *     responses:
 *       201:
 *         description: Colección de cursos creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "66d05dddb025aa6e3201654b"
 *                   titulo:
 *                     type: string
 *                     example: "Curso Avanzado de JavaScript"
 *                   descripcion:
 *                     type: string
 *                     example: "Curso completo sobre JavaScript avanzado"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *                   imagen:
 *                     type: string
 *                     example: "https://example.com/js.png"
 *                   alumnos:
 *                     type: number
 *                     example: 25
 *                   calificacion:
 *                     type: number
 *                     example: 4.9
 */

router.post('/coleccion', cursoController.guardarColeccionCursos);

// Actualizar curso
/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Actualizar curso
 *     tags: ["Cursos"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del curso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Curso Avanzado de JavaScript"
 *               descripcion:
 *                 type: string
 *                 example: "Curso completo sobre JavaScript avanzado"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/js.png"
 *               alumnos:
 *                 type: number
 *                 example: 25
 *               calificacion:
 *                 type: number
 *                 example: 4.9
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66d05dddb025aa6e3201654b"
 *                 titulo:
 *                   type: string
 *                   example: "Curso Avanzado de JavaScript"
 *                 descripcion:
 *                   type: string
 *                   example: "Curso completo sobre JavaScript avanzado"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/js.png"
 *                 alumnos:
 *                   type: number
 *                   example: 25
 *                 calificacion:
 *                   type: number
 *                   example: 4.9
 *       404:
 *         description: Curso no encontrado
 */

router.put('/:id', cursoController.actualizarCurso);

// Eliminar Curso
/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Eliminar curso
 *     tags: ["Cursos"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del curso.
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *       404:
 *         description: Curso no encontrado
 */

router.delete('/:id', cursoController.desactivarCurso);

module.exports = router;
