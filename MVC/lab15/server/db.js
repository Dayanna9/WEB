// Conexión a MySQL. Las credenciales se leen del archivo .env local.
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'upb_bookstore',
  waitForConnections: true,
  connectionLimit: 10,
  decimalNumbers: true,
});

module.exports = { pool };
