// MODELO: contiene exclusivamente el acceso SQL a la tabla books.
const { pool } = require('../db');

function mapBook(row) {
  return { id: row.id, title: row.title, author: row.author, price: Number(row.price) };
}

async function findAll() {
  const [rows] = await pool.execute(
    'SELECT id, title, author, price FROM books ORDER BY id ASC'
  );
  return rows.map(mapBook);
}

async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, title, author, price FROM books WHERE id = ?', [id]
  );
  return rows.length ? mapBook(rows[0]) : null;
}

async function create({ title, author, price }) {
  const [result] = await pool.execute(
    'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
    [title, author, price]
  );
  return findById(result.insertId);
}

async function update(id, partial) {
  const allowed = ['title', 'author', 'price'];
  const fields = [];
  const values = [];
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(partial, key)) {
      fields.push(`${key} = ?`);
      values.push(partial[key]);
    }
  }
  if (!fields.length) return findById(id);
  values.push(id);
  const [result] = await pool.execute(
    `UPDATE books SET ${fields.join(', ')} WHERE id = ?`, values
  );
  if (result.affectedRows === 0) return null;
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.execute('DELETE FROM books WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
