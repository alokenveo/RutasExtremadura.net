const historial = document.getElementById('historial');
const historialContainer = document.createElement('div');
historialContainer.classList.add('historial-container');
historial.appendChild(historialContainer);

fetch('https://programacion-cum.unex.es/Ranking.php')
  .then(response => response.json())
  .then(data => {
    const posiciones = data.posiciones;

    // Convertir las posiciones en un array
    const ranking = Object.keys(posiciones).map(key => ({
      nombre: posiciones[key].nombre,
      valor: parseInt(posiciones[key].valor),
      fecha: new Date(posiciones[key].fecha)
    }));

    // Ordenar el ranking por la puntuación (valor)
    ranking.sort((a, b) => b.valor - a.valor);

    // Crear la tabla
    const tabla = document.createElement('table');
    tabla.classList.add('tabla-historial');
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>Posición</th>
          <th>Jugador</th>
          <th>Puntuación</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        ${ranking.map((jugador, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.valor}</td>
            <td>${jugador.fecha.toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    historialContainer.appendChild(tabla);
  })
  .catch(error => console.error('Error al cargar el ranking:', error));
