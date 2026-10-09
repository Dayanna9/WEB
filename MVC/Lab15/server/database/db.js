// server/database/db.js
// MODELO DEL SERVIDOR: conexión y consultas SQL de books.
// No conoce req/res ni construye HTML.
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'upb_bookstore',
  waitForConnections: true,
  connectionLimit: 10,
});

function mapBook(row) {
  return {
    id: Number(row.id),
    title: row.title,
    author: row.author,
    price: Number(row.price),
  };
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

  for (const field of allowed) {
    if (Object.prototype.hasOwnProperty.call(partial, field)) {
      fields.push(`${field} = ?`);
      values.push(partial[field]);
    }
  }
  if (fields.length === 0) return findById(id);

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

module.exports = { pool, findAll, findById, create, update, remove };
