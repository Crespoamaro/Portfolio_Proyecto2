const mysql = require('mysql2');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Usuario de MySQL
    password: '',  // Contraseña vacía si no tienes una
    database: 'portfolio_db'
});
  

// Verificar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
