// Cada menú es un objeto con tres propiedades, una para cada plato, con el array con la lista de opciones.
let desayuno = {
  platos: [
    { nombre: "Yogurt con frutos rojos y granola", precio: 7.5 },
    { nombre: "Tostadas con jamón serrano y aguacate", precio: 8.5 },
    { nombre: "Tortitas con chocolate", precio: 7 }
  ],
  bebidasCalientes: [
    { nombre: "Café con leche", precio: 3 },
    { nombre: "Café americano", precio: 2 },
    { nombre: "Té negro", precio: 2.5 }
  ],
  bebidasFrias: [
    { nombre: "Smoothie de espinaca, limón y jengibre", precio: 5.5 },
    { nombre: "Smoothie de melón, limón y pepino", precio: 5 },
    { nombre: "Zumo de naranja natural", precio: 4.5 }
  ]
};

let comida = {
  primerosPlatos: [
    { nombre: "Ensaladilla Rusa", precio: 6.5 },
    { nombre: "Sopa de pescado", precio: 8.5 },
    { nombre: "Guisantes con huevo poche", precio: 7 }
  ],
  platosprincipales: [
    { nombre: "Chuletillas de cordero", precio: 9 },
    { nombre: "Merluza a la plancha", precio: 10 },
    { nombre: "Carrilleras de ternera", precio: 9.5 }
  ],
  postres: [
    { nombre: "Flan", precio: 6.5 },
    { nombre: "Tarta de queso", precio: 6.5 },
    { nombre: "Tarta de manzana", precio: 6.5 }
  ]
};

let cena = {
  primerosPlatos: [
    { nombre: "Ensalada de tomate con ventresca", precio: 7.5 },
    { nombre: "Esparragos con mayonesa", precio: 8.5 },
    { nombre: "Crema de calabacín", precio: 7.5 }
  ],
  platosprincipales: [
    { nombre: "Alitas de pollo asadas", precio: 7 },
    { nombre: "Dorada a la plancha", precio: 9.5 },
    { nombre: "Filete de ternera", precio: 9.5 }
  ],
  postres: [
    { nombre: "Helado", precio: 4.5 },
    { nombre: "Culan de chocolate", precio: 6.5 },
    { nombre: "Macedonia de frutas", precio: 5.5 }
  ]
};
//Objeto extras con la propiedad extrasopcionales y una lista de opciones.
let extras = {
  extrasopcionales: [
    { nombre: "Patatas fritas", precio: 3.5 },
    { nombre: "Lechuga", precio: 3 },
    { nombre: "Arroz blanco", precio: 3.5 }
  ]
};
// Objeto con lista de mensajes para que aparezcan aleatoriamente cuando lo requiere el programa. 
let mensajesRandom = [
  "¡Excelente elección!",
  "Muy buena decisión",
  "¡Ese plato siempre triunfa!",
  "¡Genial, te va a encantar!"
];

//  Declaración de varible nombre. El prompt para abrir ventanilla en el navegardor y pedir el nombre.
let nombre = prompt("Por favor, introduce tu nombre:");

// Antes del bucle while la horaValida empieza en false entrando por primera vez en el bucle while.

let horaValida = false;
let horas;
let minutos;
//Cuando consigamos hora correcta horaValida = true y se rompe el bucle. 
while (!horaValida) {
  let hora = prompt("Hora en formato 24h HH:MM (Ejemplo: 15:30):");//Pedimos hora en la ventanilla del navegador con prompt. 
  let partes = hora.split(":");//Divide la hora en dos "hh","mm" 

  if (partes.length === 2) {
    horas = parseInt(partes[0]);//Convierte horas en número
    minutos = parseInt(partes[1]);//Convierte minutos en número
    
//Condicional para dar hora por falsa o por válida
    if (Number.isInteger(horas) && Number.isInteger(minutos) &&
        horas >= 0 && horas < 24 &&
        minutos >= 0 && minutos < 60) {
          
          //  Validación extra: no aceptar 23:01–05:59
      if ((horas === 23 && minutos > 0) || (horas >= 0 && horas < 6)) {
        alert("Lo sentimos, la cocina está cerrada entre las 23:00 y las 06:00.");
      
    } else {
        horaValida = true; // Hora aceptada
      }
    } else {
      alert("Formato incorrecto. Usa HH:MM con valores válidos (Ejemplo: 09:45).");
    }
  }
}

//  Función que crea la vista de los menús por bloques (desayuno, comida o cena)
function crearMenuPorBloques(menuObj, bloques) {
  let texto = "";
  for (let b of bloques) {
    texto += b.titulo + ":\n";
    let lista = menuObj[b.key];
    for (let i = 0; i < lista.length; i++) {
      texto += `${lista[i].nombre} - ${lista[i].precio}€\n`;
    }
    texto += "\n";
  }
  return texto;
}

//  Función que pide una opción con validación (texto parcial, may/min) ---
function pedirOpcionConValidacion(lista, titulo) {
  while (true) {
    let opcionesTexto = lista.map(p => `${p.nombre} - ${p.precio}€`).join("\n");
    let respuesta = prompt(`${titulo}\n\n${opcionesTexto}\n\nEscribe el nombre del plato (o parte de él) o 'salir':`);

    if (respuesta === null) return null;

    let limpio = respuesta.trim().toLowerCase();//Pasa todo el texto a mínusculas para validar entras  may/min.
    if (limpio === 'salir') return null;

    let coincidencias = lista.filter(p => p.nombre.toLowerCase().includes(limpio));//Para que no sea necesario escribir todo el texto .includes(limpio)

    if (coincidencias.length === 1) { //Condiciones para que no haya coincidencias en selección de texto parcial escrito por el cliente. 
      return coincidencias[0];
    } else if (coincidencias.length > 1) {
      alert("Hay varias coincidencias, escribe un nombre más específico:\n" +
            coincidencias.map(p => `- ${p.nombre}`).join("\n"));
    } else {
      alert("Opción no válida. Intenta de nuevo.");
    }
  }
}

// Elegir qué menú, usar según la hora (asumiendo 'horas' ya validado) ---
let menuObj, bloques, saludo;

// Si el horario es de 6:00 a 12:00 nos muestra saludo y menú desayuno completo. 
if (horas >= 6 && horas < 11.59) {
  menuObj = desayuno;
  bloques = [
    { key: 'platos', titulo: 'Platos principales' },
    { key: 'bebidasCalientes', titulo: 'Bebidas calientes' },
    { key: 'bebidasFrias', titulo: 'Bebidas frías' }
  ];
  saludo = "¡Buenos días! Menú desayuno";
  // Si el horario es de 12:00 a 18:00 nos muestra saludo y menú comida completo. 
} else if (horas >= 12 && horas < 17.59) {
  menuObj = comida;
  bloques = [
    { key: 'primerosPlatos', titulo: 'Primeros' },
    { key: 'platosprincipales', titulo: 'Platos principales' },
    { key: 'postres', titulo: 'Postres' }
  ];
  saludo = "¡Buenas tardes! Menú comida";
  // Si el horario es de 18:00 a 23:00 nos muestra saludo y menú cena completo. 
} else  {
  menuObj = cena;
  bloques = [
    { key: 'primerosPlatos', titulo: 'Primeros' },
    { key: 'platosprincipales', titulo: 'Platos principales' },
    { key: 'postres', titulo: 'Postres' }
  ];
  saludo = "¡Buenas noches! Menú cena";
}

// Mostrar menú completo en tres bloques 
alert(saludo + ":\n\n" + crearMenuPorBloques(menuObj, bloques));

//  Pedir selección  para factura. Es un array vacio que almacena lo que el cliente elija. 
let factura = [];

for (let b of bloques) { //Boque contiene las categorias platos, bebidas, postres...
  let lista = menuObj[b.key];
  if (!Array.isArray(lista) || lista.length === 0) continue;

  let elegido = pedirOpcionConValidacion(lista, b.titulo);//Por ejemplo desayuno.plato
  if (elegido === null) { // Si está vacía continuamos
    alert("Has terminado el pedido.");
    break;
  } else {
    factura.push(elegido);
    alert(mensajesRandom[Math.floor(Math.random() * mensajesRandom.length)]);
  }
}

// Extras (opcional) Da opción de elegir extra o seguir adelante. 
let elegirExtras = confirm("¿Te gustaría agregar extras a tu pedido?");
if (elegirExtras) {
  let extraElegido = pedirOpcionConValidacion(extras.extrasopcionales, "Extras opcionales");
  if (extraElegido !== null) {//Si no se elige extra, es null y no se añade a la factura. 
    factura.push(extraElegido);
    alert(mensajesRandom[Math.floor(Math.random() * mensajesRandom.length)]);
  } else {
    alert("No se agregó ningún extra.");
  }
}

// Generar factura 
if (factura.length === 0) { // Si el array factura no tiene elementos, no se genera factura. 
  alert("No hay artículos en la factura.");
} else {
  let total = factura.reduce((acc, item) => acc + item.precio, 0);//acc es el acumulador (empieza en 0 porque se lo pasamos como segundo argumento). Cada objeto en la factura es un item. El precio es el item.precio
  let detalle = factura.map(it => `${it.nombre} - ${it.precio}€`).join("\n"); //map transforma cada artículo en un string para que aparezca el plato elegido por el cliente y su precio en la factura.
                                                                              //join une los textos y \n es para que haya salto de línea entre cada plato
  alert(`Factura de ${nombre}:\n\n${detalle}\n\nTOTAL: ${total.toFixed(2)}€`);//Genera el total con el nombre del cliente. 
}
