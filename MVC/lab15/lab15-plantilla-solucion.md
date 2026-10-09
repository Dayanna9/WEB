# Lab15 - solución

## Estudiante
### ID: _________
### Nombre completo: _________

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
| Modelo      |         |          |
| Vista       |         |          |
| Controlador |         |          |

## Solución

En cada bloque va el código fuente completo del archivo indicado, con la ruta real en el proyecto.

`index.html`, `css/styles.css`, `js/model.js`, `js/view.js` y `js/app.js` van en el `.zip`, en la carpeta desde la que Express los entrega. Si uno de esos archivos cambió respecto del Lab 12, pegarlo también abajo, en "Otro archivo".

`schema.sql`, `seed.sql` y `.env.example` van en el `.zip`. `.env` y `node_modules/` no van en la entrega.

### package.json

Ruta: `package.json`

```json
{}
```

### Punto de entrada

Proceso de `npm run api`. Entrega la interfaz gráfica y monta `/books`.

Ruta: _______________

```javascript
//IMPLEMENTACIÓN AQUÍ
```

### Modelo

Consultas SQL de `books`. Este archivo no lee `req` ni `res` y no arma HTML.

Ruta: _______________

```javascript
//IMPLEMENTACIÓN AQUÍ
```

### Controlador

Valida la petición, llama al modelo y elige el código HTTP y el JSON. Sin consultas SQL.

Ruta: _______________

```javascript
//IMPLEMENTACIÓN AQUÍ
```

### Archivo de rutas

Solo asocia el método y la ruta (`GET`, `POST`, `PATCH`, `DELETE`) con una función del controlador. No valida el cuerpo ni elige el status. Esta ruta no es la celda Controlador del mapa.

Ruta: _______________

```javascript
//IMPLEMENTACIÓN AQUÍ
```

### Otro archivo

Duplicar este bloque si hay más de un archivo. Incluir `db.js` cuando haya cambiado. Incluir aquí un archivo del cliente solo si cambió respecto del Lab 12.

Ruta: _______________

```javascript
//IMPLEMENTACIÓN AQUÍ
```

## Preguntas de síntesis

Responder en prosa breve. Una respuesta por pregunta.

### Parte 2

**Pregunta de síntesis:** ¿Por qué deja de hacer falta CORS para leer `GET /books` cuando el documento HTML y la API comparten el puerto 3000?



### Parte 3

**Pregunta de síntesis:** ¿Qué archivo del servidor debe conocer el texto exacto de la consulta `SELECT`?



**Pregunta de síntesis:** ¿Por qué `js/view.js` sigue siendo la vista del catálogo aunque Express entregue `index.html`?


