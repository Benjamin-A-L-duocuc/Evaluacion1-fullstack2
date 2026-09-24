/* =========================================================
   AthlexStore - login.js
   Inicio de sesión: valida el formulario, revisa las cuentas
   de demostración y redirige según el perfil.
   ========================================================= */

/* Cuentas de acceso (desarrollo)
   La tienda distingue dos perfiles: Cliente y Administrador. */
var cuentas = [
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

function reglaCorreoLogin(valor) {
    if (!validarRequerido(valor)) return "El correo es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    if (!validarCorreoDominio(valor)) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("formLogin");
    var campoCorreo = document.getElementById("correoLogin");
    var campoClave = document.getElementById("claveLogin");
    var aviso = document.getElementById("avisoLogin");

    if (!form) return;

    /* Validación en tiempo real */
    configurarValidacionEnVivo("correoLogin", "errorCorreoLogin", reglaCorreoLogin);
    configurarValidacionEnVivo("claveLogin", "errorClaveLogin", reglaClave);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var correcto = true;
        if (!validarCampo(campoCorreo, "errorCorreoLogin", reglaCorreoLogin)) correcto = false;
        if (!validarCampo(campoClave, "errorClaveLogin", reglaClave)) correcto = false;
        if (!correcto) return;

        /* Verificar credenciales contra las cuentas locales */
        var correo = String(campoCorreo.value).trim().toLowerCase();
        var usuario = null;
        for (var i = 0; i < cuentas.length; i++) {
            if (cuentas[i].correo.toLowerCase() === correo && cuentas[i].clave === campoClave.value) {
                usuario = cuentas[i];
                break;
            }
        }

        if (!usuario) {
            aviso.classList.remove("d-none");
            aviso.textContent = "Correo o contraseña incorrectos. Revisa tus datos.";
            return;
        }

        guardarSesion({
            correo: usuario.correo,
            nombre: usuario.nombre,
            tipo: usuario.tipo
        });

        alert("Bienvenido, " + usuario.nombre + ".");

        if (usuario.tipo === "Administrador") {
            window.location.href = "admin/index.html";
        } else {
            window.location.href = "home.html";
        }
    });

    /* Quitar el aviso al escribir de nuevo */
    campoCorreo.addEventListener("input", function () {
        if (aviso) aviso.classList.add("d-none");
    });
    campoClave.addEventListener("input", function () {
        if (aviso) aviso.classList.add("d-none");
    });
});