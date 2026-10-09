interface Encargo {
  titulo: string;
  precio: number;
  listo: boolean;
  nota?: string;
}

const marco: Encargo = {
  titulo: 'Marco de ventana',
  precio: 45000,
  listo: false,
  nota: 'Medidas en cm',
};

const puerta: Encargo = {
  titulo: 'Puerta de closet',
  precio: 120000,
  listo: true,
};

console.log(marco.titulo);
console.log(marco.nota);
console.log(puerta.titulo);
console.log(puerta.nota);

//¿Por qué puede omitirse nota y no puede omitirse precio?
//porque nota tiene ? para indicar que la propiedad es opcional y precio no lo tiene. 
