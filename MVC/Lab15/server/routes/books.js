// RUTAS: solo asocian método + URL con la función del controlador.
const express = require('express');
const controller = require('../controllers/booksController');
const router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
