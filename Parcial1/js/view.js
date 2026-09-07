//js/view.js

function dayFromDate(date) {
  return String(Number(date.slice(-2)));
}

export function renderCalendar(events, calendarEl) {
  calendarEl.querySelectorAll('.event-chip').forEach(chip => chip.remove());

  for (const event of events) {
    const day = dayFromDate(event.date);
    const dayCell = calendarEl.querySelector(`[data-day="${day}"]`);

    if (!dayCell) {
      continue;
    }

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `event-chip event-${event.type}`;
    chip.dataset.id = event.id;
    chip.textContent = event.title;

    dayCell.append(chip);
  }
}

export function renderAgenda(events, agendaEl) {
  agendaEl.innerHTML = '';

  const sortedEvents = events.slice().sort((a, b) => a.date.localeCompare(b.date));

  for (const event of sortedEvents) {
    const item = document.createElement('li');
    item.className = 'agenda-item';
    item.dataset.id = event.id;

    const date = document.createElement('span');
    date.textContent = event.date;

    const title = document.createElement('span');
    title.textContent = event.title;

    const type = document.createElement('span');
    type.textContent = event.type;

    item.append(date, title, type);
    agendaEl.append(item);
  }
}

export function showEventDetail(event, detailEl) {
  detailEl.querySelector('#detail-title').textContent = event.title;
  detailEl.querySelector('#detail-date').textContent = event.date;
  detailEl.querySelector('#detail-type').textContent = event.type;
  detailEl.dataset.id = event.id;
  detailEl.classList.remove('hidden');
}

export function hideEventDetail(detailEl) {
  detailEl.classList.add('hidden');
}