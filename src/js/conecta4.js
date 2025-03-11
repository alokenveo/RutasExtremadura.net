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

  seccionJuego.appendChild(tabla);

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

  // Actualizamos la matriz lógica
  matriz[filaLibre][col] = turno === "rojo" ? 1 : 2;

  // Actualizamos el tablero visual
  const celda = document.querySelector(
    `td[data-fila="${filaLibre}"][data-col="${col}"]`
  );
  const imagen = turno === "rojo" ? "rojo.png" : "verde.png";
  celda.style.backgroundImage = `url("/resources/images/conecta4/${imagen}")`;

  // Comprobamos si hay ganador
  if (comprobar(filaLibre, col)) {
    setTimeout(() => {
      alert(`¡Ganó ${turno.toUpperCase()}!`);
      reiniciar();
    }, 100);
    return;
  }

  // Cambiar turno
  cambiarTurno();
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
