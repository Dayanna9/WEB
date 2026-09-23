//server/routes/books.js
/**
 * Capa: HTTP (rutas Express montadas en `/books`).
 * Traduce peticiones REST a llamadas del repositorio y elige códigos de estado.
 */
const express = require('express');
const repo = require('../bookRepository');

const router = express.Router();

/**
 * Parte 1. GET /books - contrato Lab 11: 200 y arreglo JSON de libros.
 */
router.get('/', async (req, res) => {
  try {
    const books = await repo.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo leer el catálogo' });
  }
});

/**
 * Parte 2. POST /books - validar body, llamar `repo.create`, responder 201 con el libro.
 * Hasta implementar: responde 501. Contrato final: 201, 400 (body inválido), 500 (error DB).
 */
router.post('/', async (req, res) => {
  const { title, author, price } = req.body;
  if (typeof title !== 'string' ||
    title.trim() === '' ||
    typeof author !== 'string' ||
    author.trim() === ''
  ) {
    return res.status(400).json({ error: 'Title y author deben ser valores no vacíos' });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({
      error: 'price debe ser un número mayor a cero'
    });
  }
  try{
  const book = await bookRepository.create({
    title: title.trim(),
    author: author.trim(),
    price });
  res.status(201).json(book);
} catch (error){
  console.error('Error al crear libro:', error);
  res.status(500).json({ error: 'Error del server' });
}
});


/**
 * Parte 3. PATCH /books/:id - actualización parcial desde `req.body`.
 * Hasta implementar: responde 501. Contrato final: 200 con JSON, 404 si no existe, 400 si id inválido.
 */
router.patch('/:id', async (req, res) => {
  //TODO: id numérico; repo.update; 404 si null; 200 con JSON
  res.status(501).json({ error: 'PATCH /books/:id no implementado' });
});

/**
 * Parte 4. DELETE /books/:id - eliminar recurso.
 * Hasta implementar: responde 501. Contrato final: 200 sin cuerpo, 404 si no existe.
 */
router.delete('/:id', async (req, res) => {
  //TODO: repo.remove; 404 si false; 200 sin cuerpo
  res.status(501).json({ error: 'DELETE /books/:id no implementado' });
});

module.exports = router;
