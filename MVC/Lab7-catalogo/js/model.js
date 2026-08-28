//js/model.js
//Modelo: libros en memoria.
//Este archivo no usa document ni getElementById.

const books = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 34.99,
  },
  {
    id: 2,
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    price: 0,
  },
  {
    id: 3,
    title: 'Refactoring',
    author: 'Martin Fowler',
    price: 47.99,
  },
];

//Devuelve el arreglo de libros.
export function getBooks() {
  return books;
}

//Devuelve el libro con ese id, o undefined.
export function getBookById(id) {
  return getBooks().find(book => book.id === Number(id));
}