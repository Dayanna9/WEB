// server/routes/books.js
// RUTAS HTTP: únicamente asocia método/ruta con el controlador.
const express = require('express');
const controller = require('../bookRepository');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
