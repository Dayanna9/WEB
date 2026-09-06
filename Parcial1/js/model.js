//js/model.js
let events = [];
let loaded = false;

//Solicita api/events.json una vez y guarda data.events en memoria.
//Lanza si response.ok es falso o falta el arreglo events.
//1. Si loaded es verdadero, devolver events (no volver a solicitar).
//2. fetch('api/events.json') y comprobar response.ok.
//3. response.json(): data.events debe ser un arreglo.
//4. Guardar en events, loaded = true, devolver events.
export async function loadEvents() {
  //TODO: cache, fetch, response.ok, data.events
}

//Devuelve el arreglo en memoria. No usa document.
//1. return events.
export function getEvents() {
  //TODO: devolver el arreglo events
}

//Busca un evento por id en el arreglo en memoria.
//1. Convertir id con Number.
//2. find en events por event.id.
export function getEventById(id) {
  //TODO: Number(id) y find en events
}

//Agrega { id, date, title, type } al arreglo. No dibuja ni usa fetch.
//1. trim del título. Si queda vacío, return (no insertar).
//2. Recorrer events y hallar el id máximo.
//3. push con id = máximo + 1, date, title y type del payload.
export function addEvent(payload) {
  //TODO: título vacío no inserta; id = máximo + 1; push
}

//Quita el evento con ese id.
//1. Convertir id con Number.
//2. filter: dejar los eventos cuyo id no coincida.
export function removeEvent(id) {
  //TODO: filter por id
}
