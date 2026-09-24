/* =========================================================
   AthlexStore - contacto.js
   Validación del formulario de contacto:
   nombre (requerido, máx 100), correo (máx 100, dominio
   permitido), comentario (requerido, máx 500).
   ========================================================= */

function reglaNombreContacto(valor) {
    if (!validarRequerido(valor)) return "El nombre es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    return null;
}

function reglaCorreoContacto(valor) {
    if (esVacio(valor)) return null; // opcional
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    if (!validarCorreoDominio(valor)) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return null;
}

function reglaComentarioContacto(valor) {
    if (!validarRequerido(valor)) return "El comentario es requerido.";
    if (!validarLargoMax(valor, 500)) return "Máximo 500 caracteres.";
    return null;
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("formContacto");
    if (!form) return;

    configurarValidacionEnVivo("nombreContacto", "errorNombreContacto", reglaNombreContacto);
    configurarValidacionEnVivo("correoContacto", "errorCorreoContacto", reglaCorreoContacto);
    configurarValidacionEnVivo("comentarioContacto", "errorComentarioContacto", reglaComentarioContacto);

    var contador = document.getElementById("contadorComentario");
    var comentario = document.getElementById("comentarioContacto");
    if (contador && comentario) {
        comentario.addEventListener("input", function () {
            contador.textContent = comentario.value.length + " / 500";
        });
    }

    var aviso = document.getElementById("avisoContacto");

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var nombreOk = validarCampo(document.getElementById("nombreContacto"), "errorNombreContacto", reglaNombreContacto);
        var correoOk = validarCampo(document.getElementById("correoContacto"), "errorCorreoContacto", reglaCorreoContacto);
        var comentarioOk = validarCampo(document.getElementById("comentarioContacto"), "errorComentarioContacto", reglaComentarioContacto);

        if (!nombreOk || !correoOk || !comentarioOk) return;

        aviso.textContent = "¡Mensaje enviado! Te contactaremos pronto al correo indicado.";
        aviso.classList.remove("d-none");
        aviso.classList.add("aviso-ok");

        form.reset();
        if (contador) contador.textContent = "0 / 500";
        limpiarEstadoInput(document.getElementById("nombreContacto"));
        limpiarEstadoInput(document.getElementById("correoContacto"));
        limpiarEstadoInput(document.getElementById("comentarioContacto"));
    });
});