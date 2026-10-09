# Lab15 - solución

## Estudiante
### ID: ____472655_____
### Nombre completo: ______karen nicol dayanna lizarazo ortiz___

## Mapa de roles

La vista es el archivo que dibuja las tarjetas. `index.html` no sustituye a ese archivo.

En **Cliente**, la ruta real de cada archivo dentro del `.zip`.

En **Servidor**:

- **Modelo:** ruta del archivo con el SQL de `books`. `db.js` crea el pool y no ocupa esta celda.
- **Vista:** no hay archivo de servidor que arme las tarjetas. Nombrar el mismo archivo que dibuja, con su ruta real. No basta `index.html`.
- **Controlador:** ruta del módulo que valida la petición, llama al modelo y elige el código HTTP y el JSON. El archivo de rutas no ocupa esta celda.

Cada ruta del mapa debe existir en el `.zip`.

| Rol         | Cliente | Servidor |
|-------------|---------|----------|
| Modelo      | `public/js/model.js` | `server/models/bookModel.js` |
| Vista       | `public/js/view.js` | `public/js/view.js` (el servidor no genera tarjetas) |
| Controlador | `public/js/app.js` | `server/controllers/booksController.js` |

## Solución

En cada bloque va el código fuente completo del archivo indicado, con la ruta real en el proyecto.

`index.html`, `css/styles.css`, `js/model.js`, `js/view.js` y `js/app.js` van en el `.zip`, en la carpeta desde la que Express los entrega. Si uno de esos archivos cambió respecto del Lab 12, pegarlo también abajo, en "Otro archivo".

`schema.sql`, `seed.sql` y `.env.example` van en el `.zip`. `.env` y `node_modules/` no van en la entrega.

### package.json

Ruta: `package.json`

```json
{
  "name": "upb-bookstore-lab12",
  "private": true,
  "scripts": {
    "api": "node server/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.2",
    "mysql2": "^3.11.5"
  }
}
```

### Punto de entrada

Proceso de `npm run api`. Entrega la interfaz gráfica y monta `/books`.

Ruta: `server/server.js`

```javascript
// Punto de entrada: entrega la vista del cliente y monta las rutas HTTP.
require('dotenv').config();
const express = require('express');
const path = require('path');
const booksRouter = require('./routes/books');

const app = express();
const port = Number(process.env.PORT || 3000);
const publicDirectory = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(express.static(publicDirectory));
app.use('/books', booksRouter);

// Respuesta JSON breve para errores inesperados.
app.use((error, req, res, next) => {
  console.error('Error no controlado en la API:', error.message);
  if (res.headersSent) return next(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`UPB Bookstore disponible en http://localhost:${port}`);
});
```

### Modelo

Consultas SQL de `books`. Este archivo no lee `req` ni `res` y no arma HTML.

Ruta: `server/models/bookModel.js`

```javascript
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
```

### Controlador

Valida la petición, llama al modelo y elige el código HTTP y el JSON. Sin consultas SQL.

Ruta: `server/controllers/booksController.js`

```javascript
// CONTROLADOR: valida entradas, coordina el modelo y define status/JSON.
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
```

### Archivo de rutas

Solo asocia el método y la ruta (`GET`, `POST`, `PATCH`, `DELETE`) con una función del controlador. No valida el cuerpo ni elige el status. Esta ruta no es la celda Controlador del mapa.

Ruta: `server/routes/books.js`

```javascript
// RUTAS: solo asocian método + URL con la función del controlador.
const express = require('express');
const controller = require('../controllers/booksController');
const router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
```

### Otro archivo

Duplicar este bloque si hay más de un archivo. Incluir `db.js` cuando haya cambiado. Incluir aquí un archivo del cliente solo si cambió respecto del Lab 12.

Ruta: `server/db.js`

```javascript
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
```



### Otro archivo: modelo HTTP del cliente

Ruta: `public/js/model.js`

Este archivo usa rutas relativas (`/books`) para que la interfaz y la API compartan origen en el puerto 3000.

```javascript
//js/model.js
/**
 * Capa MVC: Modelo (DAO HTTP).
 * Único módulo del cliente que llama a `fetch` contra `/books`.
 * Lab 12: no suele modificarse si la API Express cumple el mismo contrato que json-server.
 */
let books = [];

/**
 * GET /books. Carga la colección, actualiza el arreglo en memoria `books` y lo devuelve.
 * Lanza error si la respuesta no es OK o no es un arreglo JSON.
 */
export async function getBooks() {
  //fetch(url) sin segundo argumento usa GET por omisión
  const response = await fetch('/books');
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('La respuesta no es un arreglo');
  }

  books = data;
  return books;
}

/**
 * Lectura síncrona en memoria (sin `fetch`). Usado al abrir detalle tras `getBooks()`.
 * Entrada: `id` del dataset de tarjeta. Salida: libro o `undefined`.
 */
export function getBookById(id) {
  const numericId = Number(id);
  return books.find((book) => book.id === numericId);
}

/**
 * POST /books. Crea un recurso, cuerpo sin `id`. Depende de la Parte 2 del servidor (201).
 */
export async function createBook({ title, author, price }) {
  const response = await fetch('/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author, price }),
  });
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
  return response.json();
}

/**
 * PATCH /books/:id. Envía solo campos parciales (ej: `{ price }`). Depende de la Parte 3 del servidor.
 */
export async function updateBook(id, partial) {
  const response = await fetch('/books/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(partial),
  });
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
  return response.json();
}

/**
 * DELETE /books/:id. Sin cuerpo. Depende de la Parte 4 del servidor (`response.ok`).
 */
export async function deleteBook(id) {
  const response = await fetch('/books/' + id, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
}
```

### Archivos SQL incluidos en el ZIP

- `server/schema.sql`: crea la base de datos `upb_bookstore` y la tabla `books`.
- `server/seed.sql`: inserta los ocho libros iniciales.

## Preguntas de síntesis

Responder en prosa breve. Una respuesta por pregunta.

### Parte 2

**Pregunta de síntesis:** ¿Por qué deja de hacer falta CORS para leer `GET /books` cuando el documento HTML y la API comparten el puerto 3000?

Porque el documento HTML y la petición a `/books` usan el mismo origen: el mismo esquema, host y puerto (`http://localhost:3000`). CORS se aplica a peticiones entre orígenes distintos, así que el navegador no necesita autorización CORS para esta petición del mismo origen.

### Parte 3

**Pregunta de síntesis:** ¿Qué archivo del servidor debe conocer el texto exacto de la consulta `SELECT`?

`server/models/bookModel.js`, porque el modelo concentra las consultas SQL para leer, crear, actualizar y eliminar libros. El controlador no debe contener SQL.

**Pregunta de síntesis:** ¿Por qué `js/view.js` sigue siendo la vista del catálogo aunque Express entregue `index.html`?

Porque `index.html` define la estructura inicial del documento, mientras que `public/js/view.js` dibuja las tarjetas de los libros y actualiza el panel de detalle manipulando el DOM. Express solo entrega los archivos estáticos; no construye las tarjetas en el servidor.

