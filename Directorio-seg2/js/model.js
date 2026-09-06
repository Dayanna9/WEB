//js/model.js

//Colección: pide api/authors.json y devuelve data.authors.
//Lanza si response.ok es falso o falta el arreglo authors.
export async function getAuthors() {
  const response = await fetch('api/authors.json');

  if (!response.ok) {
    throw new Error('No se pudo cargar la colección de autores.');
  }

  const data = await response.json();

  if (!Array.isArray(data.authors)) {
    throw new Error('La respuesta no contiene el arreglo de autores.');
  }

  return data.authors;
}

//Recurso: pide api/authors/{id}.json y devuelve el objeto autor (bio, books).
//Lanza si el recurso falla. No busca en el arreglo de getAuthors.
export async function getAuthorById(id) {
  const response = await fetch(`api/authors/${id}.json`);

  if (!response.ok) {
    throw new Error('No se pudo cargar el autor.');
  }

  return await response.json();
}
