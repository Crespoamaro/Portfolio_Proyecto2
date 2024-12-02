const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const app = express();
<<<<<<< HEAD
const PORT = 3001;

// Servir archivos estáticos (CSS, imágenes, JS) desde la carpeta 'public'
app.use(express.static('public'));
=======
const PUERTO = 3000;
>>>>>>> 7c368386971fb73737f50ed4a7af2a041d85cfb7

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', { titulo: 'Portafolio' }); // Reemplaza 'home' por la vista que corresponda
});

<<<<<<< HEAD
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
  const nombre = req.params.nombre;

  const sql = 'SELECT * FROM miembros WHERE nombre = ?';
  connection.query(sql, [nombre], (err, results) => {
    if (err) {
      console.error('Error al consultar los datos del miembro:', err);
      res.status(500).send('Error al obtener los datos del miembro');
    } else {
      if (results.length > 0) {
        // Renderiza la vista genérica 'miembro.handlebars'
        res.render('miembro', { miembro: results[0], title: `Perfil de ${results[0].nombre}` });
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
=======
// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
>>>>>>> 7c368386971fb73737f50ed4a7af2a041d85cfb7
});
