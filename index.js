const express = require('express');
const seedDatabase = require('./seed/seeds')
const connectDB = require('./cofigdb/db'); // Asegúrate de que la ruta sea correcta
const cursosRoutes = require('./routes/cursos_routes');
const usuariosRoutes = require('./routes/usuarios_routes');
//los siguientes tres son para los archovos de la  carpeta de ssl
const https = require ('https');
const fs = require ('fs');
const path = require ('path');

const cors = require('cors');// Importa el meddleware para cors 
const SwaggerUI = require('swagger-ui');
require('dotenv').config(); // Para cargar variables de entorno
const { swaggerUi, swaggerSpec} = require ('./swagger/swagger');//Importa swagger

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

//Carga el certificado ssl y la clave privada 
const options = {
  key: fs.readFileSync(path.join(__dirname,'ssl', 'privatekey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl','certificate.pem'))
};


// Configurar CORS
//app.use(cors()); // Habilita CORS con configuración predeterminada
// O puedes configurar CORS con opciones específicas
const corsOptions = {
  origin: '*', // Reemplaza con el dominio permitido, aqui pones el dominio del frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};
app.use(cors(corsOptions)); // Habilita CORS con las opciones específicas
app.options('*',cors(corsOptions));


// Rutas de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conectar a la base de datos
connectDB();

// Integrar las rutas de cursos
app.use('/api/cursos', cursosRoutes);

// Integrar las rutas de usuarios
app.use('/api/usuarios', usuariosRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;

https.createServer(options, app).listen(port, () => {
  console.log('Servidor HTTPS corriendo en https://localhost:3000');
  console.log('Api REST Ok, y ejecutándose...');
});

