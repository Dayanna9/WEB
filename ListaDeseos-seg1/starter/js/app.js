//js/app.js
const catalogEl = document.getElementById('catalog');
const wishlistEl = document.getElementById('wishlist');
const countEl = document.getElementById('wishlist-count');

//Dibuja #wishlist (un li por elemento, título y Quitar) y actualiza #wishlist-count.
function renderWishlist() {
  wishlistEl.innerHTML = '';
  const wishlist = getWishlist();
  wishlist.forEach(item => { const li = document.createElement('li');
  li.textContent = item.title + ' ';

  const button = document.createElement('button');
  button.textContent = 'Quitar';
  button.classList.add('remove-wish');
  button.dataset.id = item.id;
  
  li.appendChild(button)
  
  wishlistEl.appendChild(li); });
  
  countEl.textContent = getWishlistCount();
}

//Clic en boton [+ Añadir a mi lista de deseos]: closest .add-wish y .book-card, addToWishlist, dibujar.
catalogEl.addEventListener('click', (event) => {
  const addButton = event.target.closest('.add-wish');
  const bookCard = addButton.closest('.book-card');
  const id = bookCard.dataset.id;
  const title = bookCard.querySelector('h3').textContent;
  
  addToWishlist(id, title);
  
  renderWishlist();
});

//Clic en boton [- Quitar de mi lista]: closest .remove-wish, removeFromWishlist, dibujar.
wishlistEl.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.remove-wish');
  const id = removeButton.dataset.id;

  removeFromWishlist(id);
  renderWishlist();
});

renderWishlist();
