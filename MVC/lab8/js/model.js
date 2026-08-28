let books = [];

export async function getBooks() {
  const response = await fetch('api/books.json');

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  const data = await response.json();

  books = data.books;

  return books;
}

export function getBookById(id) {
  return books.find(book => book.id === Number(id));
}