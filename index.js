const express = require('express');
const mongoose = require('mongoose');
const seedDatabase = require('./seeds/seeds'); // Importar la función seedDatabase
const connectDB = require('./configdb/db'); 
const cursosRoutes = require('./routes/cursos_routes');
const usuariosRoutes = require('./routes/usuarios_routes');
const https = require ('https');
const fs = require ('fs');
const path = require ('path');
const cors = require('cors');
const SwaggerUI = require('swagger-ui');
require('dotenv').config(); 
const { swaggerUi, swaggerSpec} = require ('./swagger/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const options = {
  key: fs.readFileSync(path.join(__dirname,'ssl', 'privatekey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl','certificate.pem'))
};

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*',cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conectar a la base de datos
connectDB().then(async () => {
  console.log('Conexión a la base de datos establecida');

  // Cargar los datos semilla
  try {
    await seedDatabase(); // Ejecutar la función que carga los datos semilla
    console.log('Datos semilla cargados correctamente');
  } catch (error) {
    console.error('Error al cargar los datos semilla:', error);
  }

  // Iniciar el servidor solo después de la conexión a la base de datos y la carga de datos semilla
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
    console.log('Api REST Ok, y ejecutándose...');
  });
}).catch(error => {
  console.error('Error al conectar a la base de datos:', error);
});

// Integrar las rutas de cursos
app.use('/api/cursos', cursosRoutes);

// Integrar las rutas de usuarios
app.use('/api/usuarios', usuariosRoutes);

// Servir archivos estáticos
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

