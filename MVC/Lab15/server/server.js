// server/server.js
// Punto de entrada: entrega la interfaz pública y monta la API.
require('dotenv').config();
const express = require('express');
const path = require('path');
const booksRouter = require('./routes/books');

const app = express();
const port = Number(process.env.PORT || 3000);
const projectRoot = path.join(__dirname, '..');

app.use(express.json());
// Publicar solo los recursos estáticos del cliente; no exponer .env ni SQL.
app.use('/css', express.static(path.join(projectRoot, 'css')));
app.use('/js', express.static(path.join(projectRoot, 'js')));
app.get('/', (req, res) => res.sendFile(path.join(projectRoot, 'index.html')));
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`UPB Bookstore disponible en http://localhost:${port}`);
});
