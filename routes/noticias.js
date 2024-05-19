const express = require('express');
const multer = require('multer');
const Noticia = require('../models/noticia');
const router = express.Router();

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Ruta para obtener todas las noticias
router.get('/noticias', async (req, res) => {
  const noticias = await Noticia.find();
  res.json(noticias);
});

// Ruta para crear una nueva noticia
router.post('/noticias', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : '';
  const noticia = new Noticia({ title, content, image });
  await noticia.save();
  res.json(noticia);
});

module.exports = router;
