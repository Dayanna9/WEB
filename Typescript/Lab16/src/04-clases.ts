interface Encargo {
  titulo: string;
  precio: number;
  listo: boolean;
  nota?: string;
}

class EncargoRegistrado implements Encargo {
  public titulo: string;
  precio: number; //sin modificador: public
  listo: boolean;
  nota?: string;
  protected codigo: string;
  private notaInterna: string;

  constructor(titulo: string, precio: number) {
    this.titulo = titulo;
    this.precio = precio;
    this.listo = false;
    this.codigo = 'T-1';
    this.notaInterna = 'taller';
  }

  marcarListo(): void {
    this.listo = true;
  }
}

class EncargoUrgente extends EncargoRegistrado {
  constructor(titulo: string, precio: number) {
    super(titulo, precio);
    this.codigo = 'URG-1';
  }

  leerCodigo(): string {
    return this.codigo;
  }
}

const marco = new EncargoRegistrado('Marco de ventana', 45000);
const puerta = new EncargoRegistrado('Puerta de closet', 120000);
const urgente = new EncargoUrgente('Marco de ventana', 45000);
marco.marcarListo();

console.log(marco.titulo + ' listo=' + marco.listo);
console.log(puerta.titulo + ' listo=' + puerta.listo);
console.log(urgente.leerCodigo());

//¿Cuál es el modificador de un campo que no escribe ninguno, y por qué leerCodigo puede usar codigo pero no notaInterna?
//leer codigo puede usar codigo ya que este es una variable protected, lo que permite que sea usado por la clase y las subclases, pero codigo al ser una variable privada solo puede ser usada por la misma claes