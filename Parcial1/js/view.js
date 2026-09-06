//js/view.js

//Extrae el día de event.date para buscar [data-day].
//1. Tomar los dos últimos caracteres (2026-09-05 -> 05).
//2. Number quita el cero a la izquierda. String lo deja como "5".
function dayFromDate(date) {
  return String(Number(date.slice(-2)));
}

//Coloca un .event-chip en la celda [data-day] de event.date.
//No crea celdas. El mes ya está en el HTML.
//1. Quitar los .event-chip que ya hay en calendarEl.
//2. Para cada evento, leer el día de event.date (dayFromDate: 2026-09-05 -> 5).
//3. Buscar [data-day="..."]. Si no hay celda, continue.
//4. Crear button.event-chip con data-id, título y event-{type}.
//5. append en esa celda.
export function renderCalendar(events, calendarEl) {
  //TODO: chips en las celdas existentes, según event.date
}

//Dibuja #agenda: lista ordenada por date (fecha, título, type).
//1. Vaciar agendaEl.
//2. Copiar el arreglo (slice) y ordenar la copia por date.
//3. Un li.agenda-item por evento: date, título, type y data-id.
export function renderAgenda(events, agendaEl) {
  //TODO: vaciar, ordenar copia por date, un li.agenda-item por evento
}

//Rellena el panel de detalle y lo muestra.
//1. Escribir título, date y type en #detail-title, #detail-date y #detail-type.
//2. Guardar event.id en data-id del panel (para Quitar evento).
//3. Quitar .hidden.
export function showEventDetail(event, detailEl) {
  //TODO: título, date, type, data-id, quitar .hidden
}

//Oculta el panel de detalle. No toca calendario ni agenda.
//1. Agregar .hidden a detailEl.
export function hideEventDetail(detailEl) {
  //TODO: agregar .hidden
}
