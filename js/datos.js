/* =========================================================
   AthlexStore - datos.js
   Datos locales de demostración: cuentas y clave de sesión.
   Solo se utilizan para la simulación del ingreso (login).
   Los productos y sus imágenes viven directamente en las
   páginas HTML (contenido estático), por lo que no
   necesitan un arreglo en JavaScript.
   ========================================================= */

/* Cuentas de acceso (desarrollo)
   La tienda distingue dos perfiles: Cliente y Administrador. */
const cuentas = [
    {
        correo: "admin@duoc.cl",
        clave: "admin123",
        tipo: "Administrador",
        nombre: "Admin Athlex"
    },
    {
        correo: "cliente@duoc.cl",
        clave: "client1",
        tipo: "Cliente",
        nombre: "Jonathan"
    }
];

/* Clave usada en sessionStorage para mantener la sesión del usuario */
const CLAVE_SESION = "athlex_sesion";