const bookModel = require('../models/bookModel');

function validId(rawId) {
  return /^\d+$/.test(rawId) && Number(rawId) > 0;
}
function validBook(body) {
  return body && typeof body.title === 'string' && body.title.trim() &&
    typeof body.author === 'string' && body.author.trim() &&
    body.price !== '' && body.price !== null && body.price !== undefined &&
    Number.isFinite(Number(body.price)) && Number(body.price) >= 0;
}
function validPartial(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false;
  const keys = Object.keys(body);
  if (!keys.length || keys.some(k => !['title', 'author', 'price'].includes(k))) return false;
  if ('title' in body && (typeof body.title !== 'string' || !body.title.trim())) return false;
  if ('author' in body && (typeof body.author !== 'string' || !body.author.trim())) return false;
  if ('price' in body && (body.price === '' || body.price === null ||
      !Number.isFinite(Number(body.price)) || Number(body.price) < 0)) return false;
  return true;
}

async function list(req, res) {
  try {
    res.status(200).json(await bookModel.findAll());
  } catch (error) {
    console.error('No se pudo leer el catálogo:', error.message);
    res.status(500).json({ error: 'No se pudo leer el catálogo' });
  }
}
async function create(req, res) {
  if (!validBook(req.body)) {
    return res.status(400).json({ error: 'Título, autor y precio válido son obligatorios' });
  }
  try {
    const book = await bookModel.create({
      title: req.body.title.trim(), author: req.body.author.trim(), price: Number(req.body.price)
    });
    res.status(201).json(book);
  } catch (error) {
    console.error('No se pudo crear el libro:', error.message);
    res.status(500).json({ error: 'No se pudo guardar el libro' });
  }
}
async function update(req, res) {
  if (!validId(req.params.id)) return res.status(400).json({ error: 'Id inválido' });
  if (!validPartial(req.body)) return res.status(400).json({ error: 'Campos de actualización inválidos' });
  try {
    const partial = { ...req.body };
    if (partial.title !== undefined) partial.title = partial.title.trim();
    if (partial.author !== undefined) partial.author = partial.author.trim();
    if (partial.price !== undefined) partial.price = Number(partial.price);
    const book = await bookModel.update(Number(req.params.id), partial);
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (error) {
    console.error('No se pudo actualizar el libro:', error.message);
    res.status(500).json({ error: 'No se pudo guardar el libro' });
  }
}
async function remove(req, res) {
  if (!validId(req.params.id)) return res.status(400).json({ error: 'Id inválido' });
  try {
    const removed = await bookModel.remove(Number(req.params.id));
    if (!removed) return res.status(404).json({ error: 'Libro no encontrado' });
    res.sendStatus(200);
  } catch (error) {
    console.error('No se pudo eliminar el libro:', error.message);
    res.status(500).json({ error: 'No se pudo eliminar el libro' });
  }
}

module.exports = { list, create, update, remove };
