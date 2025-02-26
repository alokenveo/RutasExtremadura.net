document.addEventListener("DOMContentLoaded", () => {
    cargarComponente("encabezado", "/src/componentes/header.html");
    cargarComponente("pie", "/src/componentes/footer.html");
});

function cargarComponente(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error(`Error cargando ${url}:`, error));
}
