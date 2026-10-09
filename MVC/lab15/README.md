# UPB Bookstore — Lab 15: MVC en el servidor

## Estructura y responsabilidades
- `public/index.html`: documento HTML entregado por Express.
- `public/css/styles.css`: estilos del cliente.
- `public/js/model.js`: modelo HTTP del cliente; consume `/books` con URLs relativas.
- `public/js/view.js`: vista del catálogo; dibuja las tarjetas manipulando el DOM.
- `public/js/app.js`: controlador del cliente; conecta eventos, modelo y vista.
- `server/models/bookModel.js`: modelo del servidor; concentra todo el SQL.
- `server/controllers/booksController.js`: valida peticiones y define respuestas HTTP/JSON.
- `server/routes/books.js`: asocia las rutas HTTP con funciones del controlador.
- `server/db.js`: pool de conexiones MySQL.
- `server/server.js`: punto de entrada; sirve `public/` y monta `/books`.
- `server/schema.sql` y `server/seed.sql`: crean la base/tabla y cargan ocho libros.

## Configuración
1. Crear la base de datos ejecutando `server/schema.sql` y luego `server/seed.sql` en MySQL.
2. Copiar `.env.example` a `.env` y completar `DB_USER` y `DB_PASSWORD`.
3. En la raíz ejecutar `npm install`.
4. Ejecutar `npm run api`.
5. Abrir `http://localhost:3000/`. No se necesita Live Server.

No se incluye `.env` ni `node_modules/`.
