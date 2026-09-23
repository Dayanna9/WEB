//server/bookRepository.js
/**
 * Capa: repositorio (acceso a datos).
 * Concentración de SQL parametrizado sobre la tabla `books`. Sin `fetch` ni DOM.
 */
const { pool } = require('./db');

/**
 * Convierte una fila de MySQL al objeto JSON que espera el cliente (`price` numérico).
 */
function mapBook(row) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    price: Number(row.price),
  };
}

/**
 * Parte 1 (referencia). Lista todos los libros ordenados por `id`.
 * Salida: arreglo de objetos `{ id, title, author, price }` para `GET /books` (200).
 */
async function findAll() {
  const [rows] = await pool.execute(
    'SELECT id, title, author, price FROM books ORDER BY id ASC',
  );
  return rows.map(mapBook);
}

/**
 * Parte 1 (referencia). Lee un libro por clave primaria.
 * Entrada: `id` numérico. Salida: objeto libro o `null` si no existe fila.
 */
async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, title, author, price FROM books WHERE id = ?',
    [id],
  );
  if (rows.length === 0) {
    return null;
  }
  return mapBook(rows[0]);
}

/**
 * Parte 2 (implementar). Inserta un libro sin `id` en el cuerpo (AUTO_INCREMENT).
 * Entrada: `{ title, author, price }`. Salida: libro creado con `id` asignado por MySQL.
 */
async function create({ title, author, price }) {
  const [result] = await pool.query(
    'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
    [title, author, price]);
    return this.findById(result.insertId);
}

/**
 * Parte 3 (implementar). Actualiza solo campos presentes en `partial` (PATCH parcial).
 * Entrada: `id` y objeto parcial (`title`, `author` y/o `price`). Salida: libro actualizado o `null` si no hay fila.
 */
async function update(id, partial) {
  const fields = [];
  const values = [];
  if (Object.hasOwn(partial, 'title')) {
    fields.push('title = ?');
    values.push(partial.title);
  }
  if (Object.hasOwn(partial, 'author')) {
    fields.push('author = ?');
    values.push(partial.author);
  }
  if (Object.hasOwn(partial, 'price')) {
    fields.push('price = ?');
    values.push(partial.price);
  }

  if (fields.length === 0) {
    throw new Error('No hay campos para actualizar');
  }
  values.push(id);
  const [result] = await pool.query(
    `UPDATE books SET ${fields.join(', ')} WHERE id = ?`, values);
  
  if (result.affectedRows === 0) {
  return null;}

return this.findById(id);
}

/**
 * Parte 4 (implementar). Elimina la fila con ese `id`.
 * Salida: `true` si se eliminó al menos una fila, `false` si el id no existía.
 */
async function remove(id) {
  //TODO: DELETE FROM books WHERE id = ?
  //TODO: devolver false si affectedRows === 0
  throw new Error('remove no implementado');
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
