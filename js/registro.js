/* =========================================================
   AthlexStore - registro.js
   Validación del formulario de creación de cuenta (cliente):
   nombre, RUT (módulo 11), correo, contraseña (2 veces)
   y dirección.
   ========================================================= */

function reglaNombreRegistro(valor) {
    if (!validarRequerido(valor)) return "El nombre es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    return null;
}

function reglaCorreoRegistro(valor) {
    if (!validarRequerido(valor)) return "El correo es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    if (!validarCorreoDominio(valor)) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return null;
}

function reglaClaveConfirmar(valor) {
    if (!validarRequerido(valor)) return "Confirma tu contraseña.";
    var clave = document.getElementById("claveRegistro");
    if (clave && valor !== clave.value) return "Las contraseñas no coinciden.";
    return null;
}

function reglaDireccionRegistro(valor) {
    if (!validarRequerido(valor)) return "La dirección es requerida.";
    if (!validarLargoMax(valor, 200)) return "Máximo 200 caracteres.";
    return null;
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("formRegistro");
    if (!form) return;

    configurarValidacionEnVivo("nombreRegistro", "errorNombreRegistro", reglaNombreRegistro);
    configurarValidacionEnVivo("rutRegistro", "errorRutRegistro", reglaRun);
    configurarValidacionEnVivo("correoRegistro", "errorCorreoRegistro", reglaCorreoRegistro);
    configurarValidacionEnVivo("claveRegistro", "errorClaveRegistro", reglaClave);
    configurarValidacionEnVivo("claveConfirmarRegistro", "errorClaveConfirmarRegistro", reglaClaveConfirmar);
    configurarValidacionEnVivo("direccionRegistro", "errorDireccionRegistro", reglaDireccionRegistro);

    var aviso = document.getElementById("avisoRegistro");

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var nombreOk = validarCampo(document.getElementById("nombreRegistro"), "errorNombreRegistro", reglaNombreRegistro);
        var rutOk = validarCampo(document.getElementById("rutRegistro"), "errorRutRegistro", reglaRun);
        var correoOk = validarCampo(document.getElementById("correoRegistro"), "errorCorreoRegistro", reglaCorreoRegistro);
        var claveOk = validarCampo(document.getElementById("claveRegistro"), "errorClaveRegistro", reglaClave);
        var confirmarOk = validarCampo(document.getElementById("claveConfirmarRegistro"), "errorClaveConfirmarRegistro", reglaClaveConfirmar);
        var direccionOk = validarCampo(document.getElementById("direccionRegistro"), "errorDireccionRegistro", reglaDireccionRegistro);

        if (!nombreOk || !rutOk || !correoOk || !claveOk || !confirmarOk || !direccionOk) return;

        aviso.textContent = "Solicitud de cuenta validada correctamente. (Demostración: los datos no se guardan.)";
        aviso.classList.remove("d-none");

        form.reset();
        limpiarEstadoInput(document.getElementById("nombreRegistro"));
        limpiarEstadoInput(document.getElementById("rutRegistro"));
        limpiarEstadoInput(document.getElementById("correoRegistro"));
        limpiarEstadoInput(document.getElementById("claveRegistro"));
        limpiarEstadoInput(document.getElementById("claveConfirmarRegistro"));
        limpiarEstadoInput(document.getElementById("direccionRegistro"));
    });
});