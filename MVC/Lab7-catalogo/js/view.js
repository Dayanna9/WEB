//js/view.js
//Vista: dibuja el catálogo y el detalle en el DOM.

//Convierte el precio numérico a texto con dos decimales.
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

//Vacía catalogEl y dibuja una tarjeta por libro.
export function renderCatalog(books, catalogEl) {
  catalogEl.textContent = '';

  books.forEach(book => {
    const article = document.createElement('article');

    article.className = 'book-card';

    article.dataset.id = book.id;

    article.innerHTML = `
      <h3>${book.title}</h3>
      <p class="author">${book.author}</p>
      <p class="price">${formatPrice(book.price)}</p>
    `;

    catalogEl.appendChild(article);
  });
}

//Rellena título, autor y precio. Quita la clase hidden.
export function showBookDetail(book, detailEl) {
  detailEl.querySelector('#detail-title').textContent = book.title;
  detailEl.querySelector('#detail-author').textContent = book.author;
  detailEl.querySelector('#detail-price').textContent = formatPrice(book.price);

  detailEl.classList.remove('hidden');
}

//Añade la clase hidden al panel de detalle.
export function hideBookDetail(detailEl) {
  detailEl.classList.add('hidden');
}