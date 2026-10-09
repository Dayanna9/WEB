
const titulo = 'Marco de ventana';
let precio: number = 45000;
const listo: boolean = false;
const precios: number[] = [45000, 12000, 8000];

console.log(titulo);
console.log(precio);
console.log(listo);
console.log(precios.length);
console.log('Taller de encargos');
//¿Por qué el programa se ejecuta con node dist/01-variables.js y no abriendo el archivo .ts?
//porque el navegador y node no entienden ts, por eso se debe transformar a un lenguaje que sí entiendan como ts

//¿Qué tipo implícito queda para titulo y qué tipo explícito queda para precio?
//para titulo queda definido implicitamente un string y para precio un number
