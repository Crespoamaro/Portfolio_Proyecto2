const mysql = require('mysql2');

// Conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  usuario: 'root',
  contrasena: '',
  base_de_datos: 'portfolio_db',
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
