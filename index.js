const express = require('express');
const bodyParser = require('body-parser');
const conexion = require('./conexion');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

const PUERTO = 3000;

// Definir las opciones de Swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation Healine',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
    servers: [
      {
        url: `http://localhost:${PUERTO}`,
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./Adminstrador/*.js', './Medico/*.js'], // Rutas a los archivos que contienen las definiciones de los endpoints
};

// Configurar swagger-jsdoc
const specs = swaggerJsdoc(options);

// Configurar swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Definir los endpoints
require('./Adminstrador/roles')(app, conexion);
require('./Adminstrador/pqrs')(app, conexion);
require('./Adminstrador/registro-login')(app, conexion);
require('./Adminstrador/agenda')(app, conexion);
require('./Adminstrador/sedes')(app, conexion);
require('./Adminstrador/especialidades')(app, conexion);
require('./Adminstrador/citas')(app, conexion);
require('./Adminstrador/formulas')(app, conexion);
require('./Adminstrador/ordenes')(app, conexion);
require('./Adminstrador/examenes')(app, conexion);
require('./Adminstrador/incapacidad')(app, conexion);
require('./Adminstrador/users')(app, conexion);
require('./Adminstrador/encuestas')(app, conexion);



// Iniciar el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});

app.get('/', (req, res) => {
    res.send('API');
});
