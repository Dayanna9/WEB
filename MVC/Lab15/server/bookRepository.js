// server/bookRepository.js
// CONTROLADOR DEL SERVIDOR (se conserva el nombre original del archivo).
// Valida peticiones, invoca el modelo y elige el estado HTTP y la respuesta JSON.
const model = require('./database/db');

function validId(value) {
  return /^\d+$/.test(String(value)) && Number(value) > 0;
}
function validText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
function validPrice(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}
function serverError(res, error) {
  console.error(error);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

async function getAll(req, res) {
  try { return res.status(200).json(await model.findAll()); }
  catch (error) { return serverError(res, error); }
}

async function create(req, res) {
  const { title, author, price } = req.body || {};
  if (!validText(title) || !validText(author) || !validPrice(price)) {
    return res.status(400).json({ error: 'title, author y price válidos son obligatorios' });
  }
  try {
    const book = await model.create({ title: title.trim(), author: author.trim(), price });
    return res.status(201).json(book);
  } catch (error) { return serverError(res, error); }
}

async function update(req, res) {
  if (!validId(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
  const body = req.body || {};
  const partial = {};
  if (Object.prototype.hasOwnProperty.call(body, 'title')) {
    if (!validText(body.title)) return res.status(400).json({ error: 'title inválido' });
    partial.title = body.title.trim();
  }
  if (Object.prototype.hasOwnProperty.call(body, 'author')) {
    if (!validText(body.author)) return res.status(400).json({ error: 'author inválido' });
    partial.author = body.author.trim();
  }
  if (Object.prototype.hasOwnProperty.call(body, 'price')) {
    if (!validPrice(body.price)) return res.status(400).json({ error: 'price inválido' });
    partial.price = body.price;
  }
  if (Object.keys(partial).length === 0) {
    return res.status(400).json({ error: 'Envía al menos un campo válido para actualizar' });
  }
  try {
    const book = await model.update(Number(req.params.id), partial);
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    return res.status(200).json(book);
  } catch (error) { return serverError(res, error); }
}

async function remove(req, res) {
  if (!validId(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const deleted = await model.remove(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Libro no encontrado' });
    return res.status(200).end();
  } catch (error) { return serverError(res, error); }
}

module.exports = { getAll, create, update, remove };
