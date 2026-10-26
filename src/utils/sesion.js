/* =========================================================
   Athlex Store React - utils/sesion.js
   Manejo de la sesión del usuario con sessionStorage.
   ========================================================= */

const CLAVE_SESION = "athlex_sesion_react";

export function guardarSesion(usuario) {
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
}

export function obtenerSesion() {
    try {
        const dato = sessionStorage.getItem(CLAVE_SESION);
        return dato ? JSON.parse(dato) : null;
    } catch (error) {
        return null;
    }
}

export function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
}
