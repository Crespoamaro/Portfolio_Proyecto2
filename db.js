const mysql = require('mysql2');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Usuario de MySQL
  password: '',  // Contraseña vacía si no tienes una
  database: 'portfolio_db'  // Nombre de la base de datos
});

// Verificar conexión
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
