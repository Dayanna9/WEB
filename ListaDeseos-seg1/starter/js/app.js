//js/app.js
const catalogEl = document.getElementById('catalog');
const wishlistEl = document.getElementById('wishlist');
const countEl = document.getElementById('wishlist-count');

//Dibuja #wishlist (un li por elemento, título y Quitar) y actualiza #wishlist-count.
function renderWishlist() {
  //TODO: vaciar #wishlist, createElement un li por elemento (título y botón Quitar), actualizar el conteo
}

//Clic en boton [+ Añadir a mi lista de deseos]: closest .add-wish y .book-card, addToWishlist, dibujar.
catalogEl.addEventListener('click', (event) => {
  //TODO: closest .add-wish y .book-card, addToWishlist, dibujar
});

//Clic en boton [- Quitar de mi lista]: closest .remove-wish, removeFromWishlist, dibujar.
wishlistEl.addEventListener('click', (event) => {
  //TODO: closest .remove-wish, removeFromWishlist, dibujar
});

renderWishlist();
