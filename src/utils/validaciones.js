/* =========================================================
   Athlex Store React - utils/validaciones.js
   Utilidades de validación reutilizadas por los formularios.
   Cada regla devuelve null si el valor es válido o un mensaje
   de error en español.
   ========================================================= */

export function esVacio(valor) {
    return valor === undefined || valor === null || String(valor).trim() === "";
}

export function validarRequerido(valor) {
    return !esVacio(valor);
}

export function validarLargoMax(valor, max) {
    return !esVacio(valor) ? String(valor).length <= max : true;
}

export function validarRangoLargo(valor, min, max) {
    if (esVacio(valor)) return true;
    const largo = String(valor).length;
    return largo >= min && largo <= max;
}

export const DOMINIOS_CORREO = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

export function esCorreo(valor) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(valor).trim());
}

export function validarCorreoDominio(valor) {
    const correo = String(valor).trim();
    if (!esCorreo(correo)) return false;
    const correoMin = correo.toLowerCase();
    return DOMINIOS_CORREO.some(function (dominio) {
        return correoMin.substring(correoMin.length - dominio.length) === dominio;
    });
}

export function reglaClave(valor) {
    if (!validarRequerido(valor)) return "La contraseña es requerida.";
    if (!validarRangoLargo(valor, 4, 10)) return "La contraseña debe tener entre 4 y 10 caracteres.";
    return null;
}

export function validarPrecio(valor) {
    if (esVacio(valor)) return false;
    const n = Number(String(valor).replace(",", "."));
    return !isNaN(n) && n >= 0;
}

export function validarEnteroNoNegativo(valor) {
    if (esVacio(valor)) return false;
    return /^[0-9]+$/.test(String(valor).trim());
}

export function normalizarRun(run) {
    return String(run).trim().replace(/\./g, "").replace(/-/g, "").toUpperCase();
}

export function validarRun(run) {
    const texto = normalizarRun(run);
    if (!/^[0-9]+[0-9K]$/.test(texto)) return false;

    const cuerpo = texto.substring(0, texto.length - 1);
    const dv = texto.charAt(texto.length - 1).toLowerCase();

    let suma = 0;
    let multip = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multip;
        multip = multip === 7 ? 2 : multip + 1;
    }

    let dvCalculado;
    const resto = suma % 11;
    const dvEsperado = 11 - resto;
    if (dvEsperado === 11) {
        dvCalculado = "0";
    } else if (dvEsperado === 10) {
        dvCalculado = "k";
    } else {
        dvCalculado = String(dvEsperado);
    }
    return dvCalculado === dv;
}

export function reglaRun(valor) {
    if (!validarRequerido(valor)) return "El RUT es requerido.";
    if (String(valor).length > 12) return "El RUT ingresado es demasiado largo.";
    const texto = normalizarRun(valor);
    if (!/^[0-9]+[0-9K]$/.test(texto)) {
        return "Ingresa el RUT con o sin puntos y guión, terminando en dígito o K (Ej: 12.345.678-5).";
    }
    if (!validarRun(valor)) return "El RUT ingresado no es válido.";
    return null;
}

export function reglaCorreoDominio(valor) {
    if (esVacio(valor)) return null;
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    if (!validarCorreoDominio(valor)) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return null;
}

export function reglaNombre(valor, etiqueta) {
    const nombreCampo = etiqueta || "El nombre";
    if (!validarRequerido(valor)) return nombreCampo + " es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    return null;
}

export function reglaCorreoRequerido(valor) {
    if (!validarRequerido(valor)) return "El correo es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    if (!validarCorreoDominio(valor)) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return null;
}
