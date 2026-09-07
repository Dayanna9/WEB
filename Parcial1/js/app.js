//js/app.js
import { loadEvents, getEvents, getEventById, addEvent, removeEvent } from './model.js';
import { renderCalendar, renderAgenda, showEventDetail, hideEventDetail } from './view.js';

const calendarEl = document.getElementById('calendar');
const agendaEl = document.getElementById('agenda');
const detailEl = document.getElementById('event-detail');
const closeBtn = document.getElementById('close-detail');
const btnCalendar = document.getElementById('btn-calendar');
const btnAgenda = document.getElementById('btn-agenda');
const statusEl = document.getElementById('status');
const dateInput = document.getElementById('event-date');
const titleInput = document.getElementById('event-title');
const typeInput = document.getElementById('event-type');
const addBtn = document.getElementById('add-event');
const removeBtn = document.getElementById('remove-event');

let currentView = 'calendar';

function refreshView() {
  if (currentView === 'agenda') {
    renderAgenda(getEvents(), agendaEl);
  } else {
    renderCalendar(getEvents(), calendarEl);
  }
}

function showCalendarView() {
  currentView = 'calendar';
  hideEventDetail(detailEl);
  calendarEl.classList.remove('hidden');
  agendaEl.classList.add('hidden');
  btnCalendar.classList.add('is-active');
  btnAgenda.classList.remove('is-active');
  refreshView();
}

function showAgendaView() {
  currentView = 'agenda';
  hideEventDetail(detailEl);
  calendarEl.classList.add('hidden');
  agendaEl.classList.remove('hidden');
  btnCalendar.classList.remove('is-active');
  btnAgenda.classList.add('is-active');
  refreshView();
}

btnCalendar.addEventListener('click', () => {
  showCalendarView();
});

btnAgenda.addEventListener('click', () => {
  showAgendaView();
});

calendarEl.addEventListener('click', (event) => {
  const chip = event.target.closest('.event-chip');

  if (!chip) {
    return;
  }

  const selectedEvent = getEventById(chip.dataset.id);

  if (selectedEvent) {
    showEventDetail(selectedEvent, detailEl);
  }
});

agendaEl.addEventListener('click', (event) => {
  const item = event.target.closest('.agenda-item');

  if (!item) {
    return;
  }

  const selectedEvent = getEventById(item.dataset.id);

  if (selectedEvent) {
    showEventDetail(selectedEvent, detailEl);
  }
});

addBtn.addEventListener('click', () => {
  const date = dateInput.value;
  const title = titleInput.value.trim();
  const type = typeInput.value;

  if (!date || !title) {
    return;
  }

  addEvent({ date, title, type });
  titleInput.value = '';
  refreshView();
});

removeBtn.addEventListener('click', () => {
  const id = detailEl.dataset.id;

  if (!id) {
    return;
  }

  removeEvent(id);
  hideEventDetail(detailEl);
  refreshView();
});

closeBtn.addEventListener('click', () => {
  hideEventDetail(detailEl);
});

async function start() {
  try {
    await loadEvents();
    showCalendarView();
  } catch (error) {
    statusEl.textContent = 'No se pudieron cargar los eventos.';
  }
}

start();