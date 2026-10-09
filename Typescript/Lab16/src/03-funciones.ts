interface Encargo {
  titulo: string;
  precio: number;
  listo: boolean;
  nota?: string;
}

function total(precios: number[]): number {
  let suma = 0;
  for (const precio of precios) {
    suma = suma + precio;
  }
  return suma;
}

function describir(encargo: Encargo): string {
  const estado = (encargo.listo ? 'listo' : 'pendiente');
  return encargo.titulo + ': ' + encargo.precio + ' (' + estado + ')';
}

const precios: number[] = [45000, 12000, 8000];
const marco: Encargo = {
  titulo: 'Marco de ventana',
  precio: 45000,
  listo: false,
};

const puerta: Encargo = {
  titulo: 'puerta',
  precio: 45000,
  listo: true,
};

console.log(total(precios));
console.log(describir(puerta));
console.log(describir(marco));

//¿Qué impide que total devuelva un texto si el tipo de retorno declarado es number?
//Total no puede retornar un texto ya que el tipo de retorno declarado inicialmente es un number