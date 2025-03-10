/*
 *
 * RUTAS
 *
 */

const rutasContainer = document.querySelector(".rutas-container");

fetch("/resources/json/rutas.json")
  .then((response) => response.json())
  .then((rutas) => {
    rutas.forEach((ruta) => {
      const rutaDiv = document.createElement("div");
      rutaDiv.classList.add("ruta");

      // Grupo de imágenes
      const imagenesDiv = document.createElement("div");
      imagenesDiv.classList.add("ruta-imagenes");
      ruta.foto.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `Imagen de ${ruta.nombre}`;
        imagenesDiv.appendChild(img);
      });

      // Nombre de la ruta como enlace
      const nombreRuta = document.createElement("h3");
      const enlace = document.createElement("a");
      enlace.href = ruta.enlace;
      enlace.textContent = ruta.nombre;
      enlace.target = "_blank"; // Abre en nueva pestaña
      nombreRuta.appendChild(enlace);

      // Descripción
      const descripcion = document.createElement("p");
      descripcion.textContent = ruta.descripcion;

      // Agregar elementos al div principal
      rutaDiv.appendChild(imagenesDiv);
      rutaDiv.appendChild(nombreRuta);
      rutaDiv.appendChild(descripcion);

      // Insertar en el contenedor
      rutasContainer.appendChild(rutaDiv);
    });
  })
  .catch((error) => console.error("Error al cargar las rutas:", error));
