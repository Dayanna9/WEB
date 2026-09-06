//js/view.js

//Dibuja las tarjetas en listEl (foto, nombre, topics, data-id).
//Vacía la lista antes. No hace fetch.
export function renderAuthorList(authors, listEl) {
  listEl.replaceChildren();

  authors.forEach((author) => {
    const card = document.createElement('article');
    card.className = 'author-card';
    card.dataset.id = author.id;

    const photo = document.createElement('img');
    photo.className = 'author-photo';
    photo.src = author.photo;
    photo.alt = author.photoAlt;

    const name = document.createElement('h3');
    name.textContent = author.name;

    const topics = document.createElement('p');
    topics.className = 'author-topics';
    topics.textContent = author.topics;

    card.append(photo, name, topics);
    listEl.append(card);
  });
}

//Rellena el panel de detalle (foto, nombre, bio, topics, libros con portada y sinopsis) y lo muestra.
export function showAuthorDetail(author, detailEl) {
  const photo = detailEl.querySelector('#detail-photo');
  const name = detailEl.querySelector('#detail-name');
  const bio = detailEl.querySelector('#detail-bio');
  const topics = detailEl.querySelector('#detail-topics');
  const booksEl = detailEl.querySelector('#detail-books');

  photo.src = author.photo;
  photo.alt = author.photoAlt;
  name.textContent = author.name;
  bio.textContent = author.bio;
  topics.textContent = author.topics;

  booksEl.replaceChildren();

  author.books.forEach((book) => {
    const bookItem = document.createElement('article');
    bookItem.className = 'book-item';

    const cover = document.createElement('img');
    cover.className = 'book-cover';
    cover.src = book.cover;
    cover.alt = book.coverAlt;

    const bookContent = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = book.title;

    const synopsis = document.createElement('p');
    synopsis.textContent = book.synopsis;

    bookContent.append(title, synopsis);
    bookItem.append(cover, bookContent);
    booksEl.append(bookItem);
  });

  detailEl.classList.remove('hidden');
}

//Oculta el panel de detalle. No toca la lista de tarjetas.
export function hideAuthorDetail(detailEl) {
  detailEl.classList.add('hidden');
}
