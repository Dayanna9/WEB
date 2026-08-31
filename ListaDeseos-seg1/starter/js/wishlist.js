//js/wishlist.js

//Arreglo de deseos. Unique por id. No usa document.
let items = [
];

//Agrega { id, title } si ese id no está. No duplica.
function addToWishlist(id, title) {

  if (items.find(item => item.id === id)){
    return false;
  } else {
    items.push({id: id, title: title})
    return true;
  }
}

//Quita el elemento con ese id.
function removeFromWishlist(id) {
  items = items.filter(item => item.id !==id)
}

//Devuelve los elementos actuales (id, title).
function getWishlist() {
  return items;
}

//Devuelve cuántos elementos hay.
function getWishlistCount() {
  return items.length;
}
