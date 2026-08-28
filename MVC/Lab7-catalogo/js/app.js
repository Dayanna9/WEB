//js/app.js
//Controlador y punto de entrada.
//Une modelo y vista. Los listeners viven aquí.

import { getBooks, getBookById } from './model.js';
import { renderCatalog, showBookDetail, hideBookDetail } from './view.js';

const catalogEl = document.getElementById('catalog');
const detailEl = document.getElementById('book-detail');
const closeBtn = document.getElementById('close-detail');

renderCatalog(getBooks(), catalogEl);

//Clic en una tarjeta (delegación en #catalog).
catalogEl.addEventListener('click', (event) => {
  //TODO
});

//Botón Cerrar: oculta el detalle.
closeBtn.addEventListener('click', () => {
  //TODO
});