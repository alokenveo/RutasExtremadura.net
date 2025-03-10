const imagenes = [
  "/resources/images/rutas/castillos1.jpg",
  "/resources/images/rutas/castillos2.jpg",
  "/resources/images/rutas/castillos3.jpg",
  "/resources/images/rutas/conquistadores1.jpg",
  "/resources/images/rutas/conquistadores2.jpg",
  "/resources/images/rutas/conquistadores3.jpg",
  "/resources/images/rutas/dehesas1.jpg",
  "/resources/images/rutas/dehesas2.jpg",
  "/resources/images/rutas/dehesas3.jpg",
  "/resources/images/rutas/plata1.jpg",
  "/resources/images/rutas/plata2.jpg",
  "/resources/images/rutas/plata3.jpg",
  "/resources/images/rutas/jamon2.jpg",
  "/resources/images/rutas/jamon1.jpg",
  "/resources/images/rutas/jamon3.jpg",
  "/resources/images/rutas/monasterios1.jpg",
  "/resources/images/rutas/monasterios2.jpg",
];

let indice = 0;
const img = document.getElementById("imagen-carrusel");

function cambiarImagen() {
  img.src = imagenes[indice];
  indice = (indice + 1) % imagenes.length;
}

setInterval(cambiarImagen, 4500);

cambiarImagen();
