/* =========================================================
   Athlex Store React - data/usuarios.js
   Cuentas de demostración usadas por el inicio de sesión.
   ========================================================= */

export const cuentasDemo = [
    {
        correo: "admin@duoc.cl",
        clave: "admin123",
        tipo: "Administrador",
        nombre: "Admin Athlex",
        direccion: ""
    },
    {
        correo: "cliente@duoc.cl",
        clave: "client1",
        tipo: "Cliente",
        nombre: "Jonathan",
        direccion: "Av. Siempre Viva 742, Santiago"
    }
];

export function buscarCuenta(correo, clave) {
    const correoNormalizado = String(correo).trim().toLowerCase();
    return cuentasDemo.find(function (cuenta) {
        return cuenta.correo.toLowerCase() === correoNormalizado && cuenta.clave === clave;
    }) || null;
}
