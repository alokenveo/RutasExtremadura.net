// Cargar rutas al select
document.addEventListener("DOMContentLoaded", () => {
    const selectRuta = document.getElementById("ruta");
    const mensajeForm = document.getElementById("mensaje-form");

    fetch("/resources/json/rutas.json")
        .then(response => response.json())
        .then(rutas => {
            selectRuta.innerHTML = '<option value="">Seleccione una ruta</option>';
            rutas.forEach(ruta => {
                const option = document.createElement("option");
                option.value = ruta.nombre;
                option.textContent = ruta.nombre;
                selectRuta.appendChild(option);
            });
        })
        .catch(error => {
            selectRuta.innerHTML = '<option value="">Error al cargar rutas</option>';
            console.error("Error cargando rutas:", error);
        });

    // Validación y envío del formulario
    const form = document.getElementById("form-reserva");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita envío real

        mensajeForm.textContent = ""; // Limpia mensajes anteriores

        // Obtén los valores
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const telefono = form.telefono.value.trim();
        const ruta = form.ruta.value;
        const fecha = form.fecha.value;
        const personas = parseInt(form.personas.value);

        // Validaciones básicas
        if (!nombre || !email || !telefono || !ruta || !fecha || !personas) {
            mensajeForm.textContent = "Por favor, rellena todos los campos obligatorios.";
            return;
        }

        if (!/^[0-9]{9}$/.test(telefono)) {
            mensajeForm.textContent = "El teléfono debe tener 9 dígitos numéricos.";
            return;
        }

        if (personas < 1 || personas > 50) {
            mensajeForm.textContent = "El número de personas debe estar entre 1 y 50.";
            return;
        }

        // Si pasa todas las validaciones
        mensajeForm.style.color = "green";
        mensajeForm.textContent = "¡Reserva realizada con éxito! (Simulada)";

        // Aquí iría el código para enviar a servidor si tuvieras backend
        console.log({
            nombre,
            email,
            telefono,
            ruta,
            fecha,
            personas,
            comentarios: form.comentarios.value.trim()
        });

        // Resetea el formulario tras 2 segundos
        setTimeout(() => {
            form.reset();
            mensajeForm.style.color = "red";
            mensajeForm.textContent = "";
        }, 2000);
    });
});
