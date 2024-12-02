const mysql = require('mysql2');

<<<<<<< HEAD
// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Usuario de MySQL
  password: '',  // Contraseña vacía si no tienes una
  database: 'portfolio_db'  // Nombre de la base de datos
=======
// Conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  usuario: 'root',
  contrasena: '',
  base_de_datos: 'portfolio_db',
>>>>>>> 7c368386971fb73737f50ed4a7af2a041d85cfb7
});

// Verificar conexión
conexion.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = conexion;
