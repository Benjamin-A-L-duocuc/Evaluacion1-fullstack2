/* =========================================================
   Athlex Store React - utils/formato.js
   Utilidades de formato de precios y fechas.
   ========================================================= */

export function formatoCL(numero) {
    return "$" + Number(numero).toLocaleString("es-CL");
}

export function parsePrecio(texto) {
    const limpio = String(texto).replace(/[^0-9]/g, "");
    return limpio === "" ? 0 : Number(limpio);
}

export function fechaHoy() {
    return new Date().toLocaleDateString("es-CL").replace(/-/g, "/");
}

export function formatoRating(producto) {
    return producto.estrellas + " " + producto.rating + " · " + producto.resenas + " reseñas";
}
