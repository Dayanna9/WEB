//js/model.js
let events = [];
let loaded = false;

//Solicita api/events.json una vez y guarda data.events en memoria.
export async function loadEvents() {
  if (loaded) {
    return events;
  }

  const response = await fetch('api/events.json');

  if (!response.ok) {
    throw new Error('No se pudieron cargar los eventos.');
  }

  const data = await response.json();

  if (!Array.isArray(data.events)) {
    throw new Error('El arreglo de eventos no es válido.');
  }

  events = data.events;
  loaded = true;

  return events;
}

//Devuelve el arreglo en memoria. No usa document.
export function getEvents() {
  return events;
}

//Busca un evento por id en el arreglo en memoria.
export function getEventById(id) {
  const numericId = Number(id);
  return events.find(event => event.id === numericId);
}

//Agrega { id, date, title, type } al arreglo. No dibuja ni usa fetch.
export function addEvent(payload) {
  const title = payload.title.trim();

  if (title === '') {
    return;
  }

  let maxId = 0;

  for (const event of events) {
    if (event.id > maxId) {
      maxId = event.id;
    }
  }

  events.push({
    id: maxId + 1,
    date: payload.date,
    title: title,
    type: payload.type
  });
}

//Quita el evento con ese id.
export function removeEvent(id) {
  const numericId = Number(id);
  events = events.filter(event => event.id !== numericId);
}