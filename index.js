const express = require('express');
const connection = require('./db'); // Conexión a la base de datos
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;
app.use(express.static('public'));
// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views'); // Carpeta donde están las vistas

// Servir archivos estáticos (CSS)
app.use(express.static('public'));

// Ruta raíz ("/") para la página principal
app.get('/', (req, res) => {
  res.render('home', { title: 'Página Principal' }); // Renderiza la vista home.handlebars
});

// Ruta para mostrar los miembros en HTML
app.get('/miembros', (req, res) => {
  const sql = 'SELECT * FROM miembros';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar los datos:', err);
      res.status(500).send('Error al obtener los datos');
    } else {
      res.render('miembros', { miembros: results, title: 'Miembros del Equipo' }); // Renderiza la vista con los datos
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
