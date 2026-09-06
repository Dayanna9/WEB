import { getAuthors, getAuthorById } from './model.js';
import { renderAuthorList, showAuthorDetail, hideAuthorDetail } from './view.js';

const authorsEl = document.getElementById('authors');
const detailEl = document.getElementById('author-detail');
const closeBtn = document.getElementById('close-detail');
const statusEl = document.getElementById('status');

async function loadDirectory() {
  statusEl.textContent = 'Cargando autores...';

  try {
    const authors = await getAuthors();
    renderAuthorList(authors, authorsEl);
    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = 'No se pudo cargar el directorio de autores.';
  }
}

loadDirectory();

authorsEl.addEventListener('click', async (event) => {
  const card = event.target.closest('.author-card');

  if (!card || !authorsEl.contains(card)) {
    return;
  }

  const id = card.dataset.id;
  hideAuthorDetail(detailEl);
  statusEl.textContent = 'Cargando detalle del autor...';

  try {
    const author = await getAuthorById(id);
    showAuthorDetail(author, detailEl);
    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = 'El autor no se pudo cargar.';
  }
});

closeBtn.addEventListener('click', () => {
  hideAuthorDetail(detailEl);
});