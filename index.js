const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const app = express();
const PUERTO = 3000;

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', { titulo: 'Portafolio' }); // Reemplaza 'home' por la vista que corresponda
});

// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
