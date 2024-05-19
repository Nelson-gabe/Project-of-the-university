const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const noticiasRoutes = require('./routes/noticias');
const path = require('path');

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/noticiasDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('../Pagina-Universidad', express.static(path.join(__dirname, 'public')));

// Rutas
app.use('./models/noticia.js', noticiasRoutes);

// usar archivos estaticos
app.use(express.static('public'));

// iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server corre en el puerto ${PORT}`);
});
