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

function validarRangoLargo(valor, min, max) {
    if (esVacio(valor)) return true;
    var largo = String(valor).length;
    return largo >= min && largo <= max;
}

/* Correo con dominio permitido de la empresa */
var DOMINIOS_CORREO = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function esCorreo(valor) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(valor).trim());
}

function validarCorreoDominio(valor) {
    var correo = String(valor).trim();
    if (!esCorreo(correo)) return false;
    var correoMin = correo.toLowerCase();
    for (var i = 0; i < DOMINIOS_CORREO.length; i++) {
        var dominio = DOMINIOS_CORREO[i];
        if (correoMin.substring(correoMin.length - dominio.length) === dominio) return true;
    }
    return false;
}

/* Contraseña: solo números y letras, entre 4 y 10 caracteres */
function reglaClave(valor) {
    if (!validarRequerido(valor)) return "La contraseña es requerida.";
    if (!validarRangoLargo(valor, 4, 10)) return "La contraseña debe tener entre 4 y 10 caracteres.";
    return null;
}

/* Precio: número decimal mayor o igual a 0 */
function validarPrecio(valor) {
    if (esVacio(valor)) return false;
    var n = Number(String(valor).replace(",", "."));
    return !isNaN(n) && n >= 0;
}

/* Stock: número entero mayor o igual a 0 */
function validarEnteroNoNegativo(valor) {
    if (esVacio(valor)) return false;
    return /^[0-9]+$/.test(String(valor).trim());
}

/* ---- Validación de RUT chileno (módulo 11) ----
   Acepta el RUT con o sin puntos y guión:
   12.345.678-9, 12345678-9 o 12345678K. */

function normalizarRun(run) {
    return String(run).trim().replace(/\./g, "").replace(/-/g, "").toUpperCase();
}

function validarRun(run) {
    var texto = normalizarRun(run);
    if (!/^[0-9]+[0-9K]$/.test(texto)) return false;

    var cuerpo = texto.substring(0, texto.length - 1);
    var dv = texto.charAt(texto.length - 1).toLowerCase();

    var suma = 0;
    var multip = 2;
    for (var i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multip;
        multip = multip === 7 ? 2 : multip + 1;
    }

    var dvCalculado;
    var resto = suma % 11;
    var dvEsperado = 11 - resto;
    if (dvEsperado === 11) {
        dvCalculado = "0";
    } else if (dvEsperado === 10) {
        dvCalculado = "k";
    } else {
        dvCalculado = String(dvEsperado);
    }
    return dvCalculado === dv;
}

/* ===== Vínculo entre el input y su mensaje de error en el DOM ===== */

function mostrarError(idMsj, mensaje) {
    var el = document.getElementById(idMsj);
    if (el) {
        el.textContent = mensaje;
        el.classList.add("visible");
    }
}

function limpiarError(idMsj) {
    var el = document.getElementById(idMsj);
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
   onInput: función que devuelve null si es válido o el mensaje de error. */
function configurarValidacionEnVivo(inputId, msjId, fnValida) {
    var input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("input", function () {
        var error = fnValida(input.value);
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
    var error = fnValida(input.value);
    if (error) {
        marcarInputInvalido(input);
        mostrarError(msjId, error);
        return false;
    }
    marcarInputValido(input);
    limpiarError(msjId);
    return true;
}

/* Select requerido */
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

/* ---- Reglas devueltas por los formularios (null = válido) ---- */

function reglaRun(valor) {
    if (!validarRequerido(valor)) return "El RUT es requerido.";
    if (String(valor).length > 12) return "El RUT ingresado es demasiado largo.";
    var texto = normalizarRun(valor);
    if (!/^[0-9]+[0-9K]$/.test(texto)) {
        return "Ingresa el RUT con o sin puntos y guión, terminando en dígito o K (Ej: 12.345.678-5).";
    }
    if (!validarRun(valor)) return "El RUT ingresado no es válido.";
    return null;
}

function reglaCorreoDominio(valor) {
    if (esVacio(valor)) return null; // el requerido lo controla cada formulario
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    if (!validarCorreoDominio(valor)) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return null;
}