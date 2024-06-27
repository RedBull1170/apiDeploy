// conexion.js
const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'healine',
    user: 'root',
    password: '',
    port: '3306' // Cambien el puerto segun el mysql de xampp
});

conexion.connect(error => {
    if (error) throw error;
    console.log('Conexión exitosa a la base de datos');
});

module.exports = conexion;
