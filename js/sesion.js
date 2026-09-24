/* =========================================================
   AthlexStore - sesion.js
   Manejo de la sesión: guardar, leer y cerrar.
   Demo: no restringe el acceso a las páginas; solo simula
   el flujo de inicio y cierre de sesión.
   ========================================================= */

/* Clave usada en sessionStorage para mantener la sesión del usuario */
var CLAVE_SESION = "athlex_sesion";

function guardarSesion(usuario) {
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
}

function obtenerSesion() {
    try {
        var dato = sessionStorage.getItem(CLAVE_SESION);
        return dato ? JSON.parse(dato) : null;
    } catch (e) {
        return null;
    }
}

function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
}

/* Muestra el nombre del usuario en la barra de navegación */
function pintarSesion() {
    var sesion = obtenerSesion();
    var campo = document.getElementById("usuarioNav");
    if (campo) {
        campo.textContent = sesion ? "Hola, " + sesion.nombre : "";
    }
}

/* Enlace "Cerrar sesión" de la barra del cliente */
function cerrarSesionCliente() {
    if (window.confirm("¿Deseas cerrar tu sesión?")) {
        cerrarSesion();
        window.location.href = "index.html";
    }
}

/* Enlace "Cerrar sesión" del menú del administrador */
function cerrarSesionAdmin() {
    if (window.confirm("¿Deseas cerrar tu sesión?")) {
        cerrarSesion();
        window.location.href = "../index.html";
    }
}