/* =========================================================
   AthlexStore - validaciones.js
   Utilidades de validación reutilizadas por los formularios
   de la tienda y del administrador.
   - Valida en tiempo real (evento input).
   - Muestra mensajes de error personalizados.
   ========================================================= */

/* ---- Validaciones básicas ---- */

function esVacio(valor) {
    return valor === undefined || valor === null || String(valor).trim() === "";
}

function validarRequerido(valor) {
    return !esVacio(valor);
}

function validarLargoMax(valor, max) {
    return !esVacio(valor) ? String(valor).length <= max : true;
}

function validarLargoMin(valor, min) {
    return !esVacio(valor) ? String(valor).length >= min : true;
}

function validarRangoLargo(valor, min, max) {
    if (esVacio(valor)) return true;
    const largo = String(valor).length;
    return largo >= min && largo <= max;
}

/* Correo con dominio permitido de la empresa */
const DOMINIOS_CORREO = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function esCorreo(valor) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(valor).trim());
}

function validarCorreoDominio(valor) {
    const correo = String(valor).trim();
    if (!esCorreo(correo)) return false;
    return DOMINIOS_CORREO.some(function (dominio) {
        return correo.toLowerCase().endsWith(dominio);
    });
}

/* Contraseña: solo números y letras, entre 4 y 10 caracteres */
function validarClave(valor) {
    return validarRangoLargo(valor, 4, 10);
}

/* Precio: número decimal mayor o igual a 0 */
function validarPrecio(valor) {
    if (esVacio(valor)) return false;
    const n = Number(String(valor).replace(",", "."));
    return !isNaN(n) && n >= 0;
}

/* Stock: número entero mayor o igual a 0 */
function validarEnteroNoNegativo(valor) {
    if (esVacio(valor)) return false;
    const n = Number(valor);
    return Number.isInteger(n) && n >= 0;
}

/* Validación de RUN chileno (módulo 11), sin puntos ni guion */
function validarRun(run) {
    const texto = String(run).trim();
    if (!/^[0-9kK]{7,9}$/.test(texto)) return false;

    let cuerpo = texto.slice(0, -1);
    let dv = texto.slice(-1).toLowerCase();

    if (cuerpo.length < 1 || cuerpo.length > 8) {
        // el RUN sin dígito verificador va entre 1 y 8 dígitos
        if (!(cuerpo.length >= 1 && cuerpo.length <= 8)) return false;
    }

    // módulo 11
    const reverse = cuerpo.split("").reverse().join("");
    let suma = 0;
    let multip = 2;
    for (let i = 0; i < reverse.length; i++) {
        suma += parseInt(reverse[i], 10) * multip;
        multip = multip === 7 ? 2 : multip + 1;
    }
    const resto = suma % 11;
    const dvEsperado = 11 - resto;
    let dvCalculado;
    if (dvEsperado === 11) {
        dvCalculado = "0";
    } else if (dvEsperado === 10) {
        dvCalculado = "k";
    } else {
        dvCalculado = String(dvEsperado);
    }
    return dvCalculado === dv;
}

/* ---- Vínculo entre el input y su mensaje de error en el DOM ---- */
/* Cada input valida con: <label> ... <input> <div class="error-msj" id="error-..."></div> */

function mostrarError(idMsj, mensaje) {
    const el = document.getElementById(idMsj);
    if (el) {
        el.textContent = mensaje;
        el.classList.add("visible");
    }
}

function limpiarError(idMsj) {
    const el = document.getElementById(idMsj);
    if (el) {
        el.textContent = "";
        el.classList.remove("visible");
    }
}

function marcarInputValido(input) {
    if (!input) return;
    input.classList.remove("input-error");
    input.classList.add("input-valido");
}

function marcarInputInvalido(input) {
    if (!input) return;
    input.classList.remove("input-valido");
    input.classList.add("input-error");
}

function limpiarEstadoInput(input) {
    if (!input) return;
    input.classList.remove("input-error", "input-valido");
}

/* Configura la validación en tiempo real para un campo.
   onInput: función que devuelve null si es válido o el mensaje de error.
   Permite que el usuario corrija al momento. */
function configurarValidacionEnVivo(inputId, msjId, fnValida) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("input", function () {
        const error = fnValida(input.value);
        if (error) {
            marcarInputInvalido(input);
            mostrarError(msjId, error);
        } else {
            marcarInputValido(input);
            limpiarError(msjId);
        }
    });
}

/* Validación de un campo al enviar el formulario.
   Devuelve true si es válido. */
function validarCampo(input, msjId, fnValida) {
    const error = fnValida(input.value);
    if (error) {
        marcarInputInvalido(input);
        mostrarError(msjId, error);
        return false;
    }
    marcarInputValido(input);
    limpiarError(msjId);
    return true;
}

/* Select requerido (no usar input-* styles, usa .input-error) */
function validarSelect(select, msjId, mensaje) {
    if (esVacio(select.value)) {
        marcarInputInvalido(select);
        mostrarError(msjId, mensaje);
        return false;
    }
    marcarInputValido(select);
    limpiarError(msjId);
    return true;
}

/* Valida el RUN y devuelve el mensaje de error o null */
function reglaRun(valor) {
    if (!validarRequerido(valor)) return "El RUN es requerido.";
    if (!validarRangoLargo(valor, 7, 9)) return "El RUN debe tener entre 7 y 9 caracteres.";
    if (!/^[0-9kK]+$/.test(String(valor).trim())) {
        return "El RUN debe ir sin puntos ni guión, solo números (Ej: 19011022K).";
    }
    if (!validarRun(valor)) return "El RUN ingresado no es válido.";
    return null;
}

function reglaCorreoDominio(valor) {
    if (esVacio(valor)) return null; // el requerido lo controla cada formulario
    if (String(valor).length > 100) return "Máximo 100 caracteres.";
    if (!validarCorreoDominio(valor)) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return null;
}