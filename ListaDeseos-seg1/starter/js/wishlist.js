//js/wishlist.js

//Arreglo de deseos. Unique por id. No usa document.
let items = [];

//Agrega { id, title } si ese id no está. No duplica.
function addToWishlist(id, title) {
  if (id, title){
    items.push(id, title)
    return items;
  }
}

//Quita el elemento con ese id.
function removeFromWishlist(id) {
  //TODO: quitar el elemento con ese id
}

//Devuelve los elementos actuales (id, title).
function getWishlist() {
  return items;
}

//Devuelve cuántos elementos hay.
function getWishlistCount(items) {
  return items.length;
}
