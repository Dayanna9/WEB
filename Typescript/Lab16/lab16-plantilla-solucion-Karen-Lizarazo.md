# Lab16 - solución

## Estudiante
### ID: ____Karen Nicol Dayanna Lizarazo Ortiz_____
### Nombre completo: ____472655_____

## Solución

En cada bloque va el código fuente completo del archivo indicado, con la ruta real en el proyecto.

`node_modules/` y `dist/` no van en la entrega. Esos directorios se regeneran con `npm install` y `npm run build`.

### package.json

Ruta: `package.json`

```json
{{
  "name": "lab16",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
  "build": "tsc"
},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "devDependencies": {
    "typescript": "^7.0.2"
  }
}
}
```

### tsconfig.json

Ruta: `tsconfig.json`

```json
{{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleDetection": "force",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist",
    "noEmitOnError": true
  },
  "include": ["src"]
}}
```

### .gitignore

Ruta: `.gitignore`

```text
node_modules/
dist/
```

### src/01-variables.ts

Ruta: `src/01-variables.ts`

```typescript

const titulo = 'Marco de ventana';
let precio: number = 45000;
const listo: boolean = false;
const precios: number[] = [45000, 12000, 8000];

console.log(titulo);
console.log(precio);
console.log(listo);
console.log(precios.length);
console.log('Taller de encargos');

```

### src/02-objetos.ts

Ruta: `src/02-objetos.ts`

```typescript
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


```

### src/03-funciones.ts

Ruta: `src/03-funciones.ts`

```typescript
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

```

### src/04-clases.ts

Ruta: `src/04-clases.ts`

```typescript
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
```

### src/05-uniones.ts

Ruta: `src/05-uniones.ts`

```typescript
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
```

## Preguntas de síntesis

Responder en prosa breve. Una respuesta por pregunta.

### Parte 1

**Pregunta de síntesis:** ¿Por qué el programa se ejecuta con `node dist/01-variables.js` y no abriendo el archivo `.ts`?

porque el navegador y node no entienden ts, por eso se debe transformar a un lenguaje que sí entiendan como ts

### Parte 2

**Pregunta de síntesis:** ¿Qué tipo implícito queda para `titulo` y qué tipo explícito queda para `precio`?

para titulo queda definido implicitamente un string y para precio un number

### Parte 3

**Pregunta de síntesis:** ¿Por qué puede omitirse `nota` y no puede omitirse `precio`?

porque nota tiene ? para indicar que la propiedad es opcional y precio no lo tiene. 

### Parte 4

**Pregunta de síntesis:** ¿Qué impide que `total` devuelva un texto si el tipo de retorno declarado es `number`?

Total no puede retornar un texto ya que el tipo de retorno declarado inicialmente es un number

### Parte 5

**Pregunta de síntesis:** ¿Cuál es el modificador de un campo que no escribe ninguno, y por qué `leerCodigo` puede usar `codigo` pero no `notaInterna`?

leer codigo puede usar codigo ya que este es una variable protected, lo que permite que sea usado por la clase y las subclases, pero codigo al ser una variable privada solo puede ser usada por la misma claes

### Parte 6

**Pregunta de síntesis:** ¿Por qué, después de comprobar `encargo.estado === 'pendiente'`, el resto de `aviso` trata el estado como `'entregado'`?


