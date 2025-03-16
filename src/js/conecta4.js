// Variables globales
const nfilas = 6;
const ncol = 7;
let turno = "rojo"; // rojo o verde
let matriz = [];

// Elementos
const seccionInicio = document.getElementById("inicio");
const seccionJuego = document.getElementById("juego");
const botonInicio = document.getElementById("boton-inicio");

// Eventos
botonInicio.addEventListener("click", () => {
  iniciarJuego();
});

function iniciarJuego() {
  seccionInicio.style.display = "none";
  seccionJuego.style.display = "flex";
  seccionJuego.style.flexDirection = "column";
  seccionJuego.style.alignItems = "center";
  seccionJuego.style.justifyContent = "center";
  seccionJuego.innerHTML = "";

  // Crear contenedor para el botón cancelar y el indicador de turno
  const contenedor = document.createElement("div");
  contenedor.style.display = "flex";
  contenedor.style.alignItems = "center";
  contenedor.style.marginBottom = "20px";
  contenedor.style.width = "400px";
  contenedor.style.justifyContent = "space-between";

  const indicadorTurno = document.createElement("div");
  indicadorTurno.textContent = "Turno: ";
  const circuloTurno = document.createElement("span");
  circuloTurno.style.display = "inline-block";
  circuloTurno.style.width = "20px";
  circuloTurno.style.height = "20px";
  circuloTurno.style.borderRadius = "50%";
  circuloTurno.style.backgroundColor = turno === "rojo" ? "#B60B1D" : "#047948";
  circuloTurno.style.marginLeft = "10px";
  indicadorTurno.appendChild(circuloTurno);
  contenedor.appendChild(indicadorTurno);

  // Agregar el contenedor al juego
  seccionJuego.appendChild(contenedor);

  // Crear botón cancelar
  const botonCancelar = document.createElement("button");
  botonCancelar.textContent = "Cancelar Juego";
  botonCancelar.id = "boton-cancelar";
  botonCancelar.addEventListener("click", () => {
    reiniciar();
  });
  contenedor.appendChild(botonCancelar);

  // Contenedor del tablero y las fichas animadas
  const tableroContainer = document.createElement("div");
  tableroContainer.classList.add("tablero-container");
  tableroContainer.style.position = "relative";
  tableroContainer.style.width = `${ncol * 60}px`;
  tableroContainer.style.height = `${nfilas * 60}px`;
  tableroContainer.style.marginBottom = "20px";

  // Crear tablero
  const tabla = document.createElement("table");
  tabla.id = "tablero";
  tabla.style.borderCollapse = "collapse";
  tabla.style.backgroundColor = "#eee";

  for (let fila = 0; fila < nfilas; fila++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < ncol; col++) {
      const td = document.createElement("td");
      td.dataset.fila = fila;
      td.dataset.col = col;
      td.style.width = "60px";
      td.style.height = "60px";
      td.style.border = "2px solid #333";
      td.addEventListener("mouseover", () => {
        td.style.backgroundColor = "#DDDDDD";
      });
      td.addEventListener("mouseout", () => {
        td.style.backgroundColor = "";
      });
      td.style.backgroundSize = "cover";
      td.style.cursor = "pointer";
      td.addEventListener("click", mover);
      tr.appendChild(td);
    }
    tabla.appendChild(tr);
  }

  tableroContainer.appendChild(tabla);
  seccionJuego.appendChild(tableroContainer);

  // Inicializar matriz lógica
  iniciarMatriz();
}

function iniciarMatriz() {
  matriz = [];
  for (let i = 0; i < nfilas; i++) {
    matriz.push(new Array(ncol).fill(0));
  }
}

function mover(event) {
  const col = parseInt(event.target.dataset.col);

  // Buscar la fila disponible en esa columna
  let filaLibre = -1;
  for (let fila = nfilas - 1; fila >= 0; fila--) {
    if (matriz[fila][col] === 0) {
      filaLibre = fila;
      break;
    }
  }

  if (filaLibre === -1) {
    alert("Columna llena");
    return;
  }

  matriz[filaLibre][col] = turno === "rojo" ? 1 : 2;

  // Creamos la imagen de la ficha
  const ficha = document.createElement("img");
  ficha.src = `/resources/images/conecta4/${
    turno === "rojo" ? "rojo.png" : "verde.png"
  }`;
  ficha.style.position = "absolute";
  ficha.style.width = "60px";
  ficha.style.height = "60px";
  ficha.style.left = `${col * 60}px`; // columna * ancho de celda
  ficha.style.top = `-60px`; // empieza fuera del tablero

  // Contenedor del tablero
  const tableroContainer = document.querySelector(".tablero-container");
  tableroContainer.appendChild(ficha);

  // Animación de caída
  const destinoY = filaLibre * 60;
  ficha.animate([{ top: "-60px" }, { top: `${destinoY}px` }], {
    duration: 1000, // velocidad de la caída
    easing: "ease-out",
  });

  // Al terminar la animación, posicionamos la ficha fija
  setTimeout(() => {
    const celda = document.querySelector(
      `td[data-fila="${filaLibre}"][data-col="${col}"]`
    );
    celda.style.backgroundImage = `url("/resources/images/conecta4/${
      turno === "rojo" ? "rojo.png" : "verde.png"
    }")`;

    // Quitamos la ficha animada
    ficha.remove();

    // Comprobamos ganador
    if (comprobar(filaLibre, col)) {
      setTimeout(() => {
        alert(`¡Ganó ${turno.toUpperCase()}!`);
        reiniciar();
      }, 100);
      return;
    }

    cambiarTurno();
  }, 900);
}

function cambiarTurno() {
  turno = turno === "rojo" ? "verde" : "rojo";
  // Actualizar el color del circulo indicador
  const circuloTurno = document.querySelector("#juego div span");
  circuloTurno.style.backgroundColor = turno === "rojo" ? "#B60B1D" : "#047948";
}

function comprobar(fila, col) {
  return (
    comprobarDireccion(fila, col, 0, 1) || // Horizontal
    comprobarDireccion(fila, col, 1, 0) || // Vertical
    comprobarDireccion(fila, col, 1, 1) || // Diagonal \
    comprobarDireccion(fila, col, 1, -1)
  ); // Diagonal /
}

function comprobarDireccion(fila, col, df, dc) {
  const jugador = matriz[fila][col];
  let contador = 1;

  // Hacia adelante
  let f = fila + df;
  let c = col + dc;
  while (
    f >= 0 &&
    f < nfilas &&
    c >= 0 &&
    c < ncol &&
    matriz[f][c] === jugador
  ) {
    contador++;
    f += df;
    c += dc;
  }

  // Hacia atrás
  f = fila - df;
  c = col - dc;
  while (
    f >= 0 &&
    f < nfilas &&
    c >= 0 &&
    c < ncol &&
    matriz[f][c] === jugador
  ) {
    contador++;
    f -= df;
    c -= dc;
  }

  return contador >= 4;
}

function reiniciar() {
  turno = "rojo";
  seccionJuego.style.display = "none";
  seccionInicio.style.display = "flex";
}
