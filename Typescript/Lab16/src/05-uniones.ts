interface Encargo {
  titulo: string;
  precio: number;
  estado: 'pendiente' | 'entregado';
}

function aviso(encargo: Encargo): string {
  if (encargo.estado === 'pendiente') {
    return encargo.titulo + ' sigue en el taller';
  }
  //aqui el estado solo puede ser 'entregado'
  return encargo.titulo + ' ya se entregó';
}

const marco: Encargo = {
  titulo: 'Marco de ventana',
  precio: 45000,
  estado: 'pendiente',
};

const puerta: Encargo = {
  titulo: 'Puerta de closet',
  precio: 120000,
  estado: 'entregado',
};

console.log(aviso(marco));
console.log(aviso(puerta));