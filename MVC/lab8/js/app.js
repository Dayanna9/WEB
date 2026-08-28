import { getBooks, getBookById } from './model.js';

import {
  renderCatalog,
  showBookDetail,
  hideBookDetail
} from './view.js';

const catalogEl = document.getElementById('catalog');
const detailEl = document.getElementById('book-detail');
const closeBtn = document.getElementById('close-detail');
const statusEl = document.getElementById('status');

async function loadCatalog() {
  statusEl.textContent = 'Cargando catálogo...';

  try {
    const books = await getBooks();

    renderCatalog(books, catalogEl);

    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = 'No se pudo cargar el catálogo.';
  }
}

loadCatalog();

catalogEl.addEventListener('click', (event) => {
  const card = event.target.closest('.book-card');

  if (!card) {
    return;
  }

  const id = card.dataset.id;
  const book = getBookById(id);

  if (book) {
    showBookDetail(book, detailEl);
  }
});

closeBtn.addEventListener('click', () => {
  hideBookDetail(detailEl);
});