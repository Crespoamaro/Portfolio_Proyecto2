const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const connection = require('./db'); // Importa la conexión a la base de datos
const fs = require('fs'); // Módulo para verificar la existencia de archivos

const app = express();
const PORT = 3001;

// Servir archivos estáticos desde la carpeta 'public' con una ruta base específica
app.use('/Portfolio_Proyecto2/public', express.static('public'));

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', { titulo: 'Portafolio' }); // Reemplaza 'home' por la vista que corresponda
});

// Ruta para mostrar los miembros en HTML
app.get('/miembros', (req, res) => {
  const sql = 'SELECT * FROM miembros';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar los datos:', err);
      res.status(500).send('Error al obtener los datos');
    } else {
      res.render('miembros', { miembros: results, title: 'Miembros del Equipo' });
    }
  });
});

// Ruta para mostrar una página individual de un miembro específico
app.get('/miembros/:nombre', (req, res) => {
  const nombre = req.params.nombre; // Obtén el nombre de la URL
  const nombreArchivoVista = `${nombre}.handlebars`; // Crea el nombre del archivo de vista

  const sql = 'SELECT * FROM miembros WHERE nombre = ?';
  connection.query(sql, [nombre], (err, results) => {
    if (err) {
      console.error('Error al consultar los datos del miembro:', err);
      res.status(500).send('Error al obtener los datos del miembro');
    } else {
      if (results.length > 0) {
        // Verifica si el archivo de vista existe y renderiza
        const archivoRuta = path.join(__dirname, 'views', nombreArchivoVista);
        if (fs.existsSync(archivoRuta)) {
          res.render(nombreArchivoVista, { miembro: results[0], title: `Perfil de ${results[0].nombre}` });
        } else {
          res.status(404).send('Vista del miembro no encontrada');
        }
      } else {
        res.status(404).send('Miembro no encontrado');
      }
    }
  });
});

// Ruta para mostrar los trabajos en HTML
app.get('/trabajos', (req, res) => {
  const sql = 'SELECT * FROM trabajos';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar los trabajos:', err);
      res.status(500).send('Error al obtener los datos');
    } else {
      res.render('trabajos', { trabajos: results, title: 'Nuestros Trabajos' });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
