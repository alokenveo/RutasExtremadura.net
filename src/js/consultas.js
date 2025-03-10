/*
 *
 * CONSULTAS BIBLIOGRAFÍA
 *
 */

const consultasContainer = document.querySelector(".consultas-container");

fetch("/resources/json/consultas.json")
  .then((response) => response.json())
  .then((consultas) => {
    consultas.forEach((consulta) => {
      const consultaDiv = document.createElement("div");
      consultaDiv.classList.add("consulta");

      //Titulo de la consulta
      const titulo = document.createElement("h3");
    titulo.textContent = `Consulta ${consultas.indexOf(consulta) + 1}`;
    consultaDiv.appendChild(titulo);

      // Pregunta de la consulta
      const pregunta = document.createElement("p");
      pregunta.textContent = consulta.pregunta;

      // Respuestas de la consulta
      const imagenesDiv = document.createElement("div");
      imagenesDiv.classList.add("consulta-imagenes");
      consulta.respuestas.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `Imagen de la respuesta`;
        imagenesDiv.appendChild(img);
      });

      // Agregar elementos al div principal
      consultaDiv.appendChild(pregunta);
      consultaDiv.appendChild(imagenesDiv);

      // Insertar en el contenedor
      consultasContainer.appendChild(consultaDiv);
    });
  })
  .catch((error) => console.error("Error al cargar las consultas:", error));
