//js/view.js
//Vista: dibuja el catálogo y el detalle en el DOM.

//Convierte el precio numérico a texto con dos decimales.
function formatPrice(price) {
  return `$${price.toFixed(2)};`
}

//Vacía catalogEl y dibuja una tarjeta por libro.
export function renderCatalog(books, catalogEl) {
  catalogEl.textContent = "";
  books.forEach(book => {
    
  })
}

//Rellena título, autor y precio. Quita la clase hidden.
export function showBookDetail(book, detailEl) {
  //TODO
}

//Añade la clase hidden al panel de detalle.
export function hideBookDetail(detailEl) {
  //TODO
}