require('dotenv').config();
const express = require('express');
const path = require('path');
const booksRouter = require('./routes/books');

const app = express();
const port = Number(process.env.PORT || 3000);
const publicDirectory = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(express.static(publicDirectory));
app.use('/books', booksRouter);

// Respuesta JSON breve para errores inesperados.
app.use((error, req, res, next) => {
  console.error('Error no controlado en la API:', error.message);
  if (res.headersSent) return next(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`UPB Bookstore disponible en http://localhost:${port}`);
});
