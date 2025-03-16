# Rutas Extremadura.net

**Portal Web** de rutas turísticas en Extremadura, con funcionalidades de reserva de rutas y un minijuego de Conecta 4.

---

## Índice
- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Cómo usar el proyecto](#cómo-usar-el-proyecto)
- [Créditos](#créditos)

---

## Descripción

Rutas Extremadura.net es un sitio web informativo y funcional donde los usuarios pueden:
- Consultar rutas de senderismo y turismo en Extremadura.
- Realizar reservas de rutas mediante un formulario.
- Jugar al minijuego **Conecta 4** para entretenimiento.
  
---

## Características
✅ **Diseño adaptable y organizado**  
✅ **Formulario de reservas con validación**  
✅ **Minijuego Conecta 4 con tablero interactivo**  
✅ **Uso de iconos de Font Awesome y/o Bootstrap Icons**  
✅ **Secciones reutilizables (header, footer)**

---

## Tecnologías

- **HTML5**  
- **CSS3**  
- **JavaScript (puro)**  
- **Font Awesome** y **Bootstrap Icons** (opcional)  

---

## Estructura de Carpetas
```
/index.html
/src/
    /html/
        novedades.html
        reserva.html
        conecta4.html
        historial.html
        bibliografia.html
    /css/
        estilos.css
        conecta4.css
    /js/
        conecta4.js
/resources/
    /images/
        logo.png
        conecta4/
            rojo.png
            verde.png
```

---

## Cómo usar el proyecto

1. **Clona el repositorio o descarga los archivos**  
2. Abre `index.html` en tu navegador preferido.  
3. Para probar el minijuego, entra en `src/html/conecta4.html`.  
4. El formulario de reservas se encuentra en `src/html/reserva.html`.

### Uso de Font Awesome o Bootstrap Icons
Si quieres incluir iconos:
```html
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
``` 
**Los iconos funcionan aunque el footer o el header estén cargados desde otros archivos.**

---

## Validaciones en el formulario
- El campo de **DNI/NIE** acepta **una letra inicial seguida de 8 números**.
```javascript
InputNumDocumento.addEventListener("input", () => {
    let valor = InputNumDocumento.value.toUpperCase();
    let primeraLetra = valor.charAt(0).replace(/[^A-Z]/g, "");
    let numeros = valor.slice(1).replace(/\D/g, "").slice(0, 7);
    InputNumDocumento.value = primeraLetra + numeros;
});
```

---

## Créditos
Desarrollado por **Alfredo Mituy Okenve Obiang**  
Todos los recursos e imágenes son de uso educativo.

---
