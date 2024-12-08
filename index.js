const express = require('express'); 
const exphbs = require('express-handlebars'); 
const path = require('path'); 
const fs = require('fs'); 
const connection = require('./db'); 

const app = express(); 
const PORT = 3001; 

// Esto permite acceder a archivos como CSS, JS e imágenes desde /Portfolio_Proyecto2/public
app.use('/Portfolio_Proyecto2/public', express.static('public'));

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', exphbs.engine()); 
app.set('view engine', 'handlebars'); 
app.set('views', path.join(__dirname, 'views')); // Establece la carpeta donde se almacenan las vistas

// Ruta principal
// Renderiza la página principal usando la plantilla 'home.handlebars' y pasa un título dinámico
app.get('/', (req, res) => {
  res.render('home', { titulo: 'Portfolio' }); 
});

// Ruta para mostrar los miembros en una página HTML
app.get('/miembros', (req, res) => {
  const sql = 'SELECT * FROM miembros'; // Consulta SQL para obtener todos los miembros
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar los datos:', err); 
      res.status(500).send('Error al obtener los datos'); 
    } else {
      res.render('miembros', { miembros: results, title: 'Miembros del Equipo' }); // Renderiza la vista 'miembros' con los datos obtenidos
    }
  });
});

// Ruta para mostrar la página individual de un miembro específico
app.get('/miembros/:nombre', (req, res) => {
  const nombre = req.params.nombre; 
  const nombreArchivoVista = `${nombre}.handlebars`; 

  const sql = 'SELECT * FROM miembros WHERE nombre = ?'; // Consulta SQL para obtener un miembro por nombre
  connection.query(sql, [nombre], (err, results) => {
    if (err) {
      console.error('Error al consultar los datos del miembro:', err); 
      res.status(500).send('Error al obtener los datos del miembro');
    } else {
      if (results.length > 0) {
        // Verifica si el archivo de vista específico existe
        const archivoRuta = path.join(__dirname, 'views', nombreArchivoVista);
        if (fs.existsSync(archivoRuta)) {
          // Renderiza la vista personalizada del miembro
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

// Ruta para mostrar los trabajos
app.get('/trabajos', (req, res) => {
  const sql = 'SELECT * FROM trabajos'; // Consulta SQL para obtener todos los trabajos
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar los trabajos:', err); // Manejo de errores en la consulta
      res.status(500).send('Error al obtener los datos'); // Respuesta de error al cliente
    } else {
      res.render('trabajos', { trabajos: results, title: 'Nuestros Trabajos' }); // Renderiza la vista 'trabajos' con los datos obtenidos
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
