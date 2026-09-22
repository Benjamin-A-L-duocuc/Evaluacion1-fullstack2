/* =========================================================
   AthlexStore - login.js
   Inicio de sesión: valida el formulario, revisa las cuentas
   y redirige según el perfil (Cliente o Administrador).
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formLogin");
    const campoCorreo = document.getElementById("correoLogin");
    const campoClave = document.getElementById("claveLogin");
    const aviso = document.getElementById("avisoLogin");

    if (!form) return;

    /* Validación en tiempo real (material: form-validaciones) */
    configurarValidacionEnVivo("correoLogin", "errorCorreoLogin", function (valor) {
        if (!validarRequerido(valor)) return "El correo es requerido.";
        if (String(valor).length > 100) return "Máximo 100 caracteres.";
        if (!validarCorreoDominio(valor)) {
            return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        }
        return null;
    });

    configurarValidacionEnVivo("claveLogin", "errorClaveLogin", function (valor) {
        if (!validarRequerido(valor)) return "La contraseña es requerida.";
        if (!validarRangoLargo(valor, 4, 10)) return "La contraseña debe tener entre 4 y 10 caracteres.";
        return null;
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let correcto = true;

        if (!validarCampo(campoCorreo, "errorCorreoLogin", function (valor) {
            if (!validarRequerido(valor)) return "El correo es requerido.";
            if (String(valor).length > 100) return "Máximo 100 caracteres.";
            if (!validarCorreoDominio(valor)) {
                return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            }
            return null;
        })) {
            correcto = false;
        }

        if (!validarCampo(campoClave, "errorClaveLogin", function (valor) {
            if (!validarRequerido(valor)) return "La contraseña es requerida.";
            if (!validarRangoLargo(valor, 4, 10)) return "La contraseña debe tener entre 4 y 10 caracteres.";
            return null;
        })) {
            correcto = false;
        }

        if (!correcto) return;

        /* Verificar credenciales contra las cuentas locales */
        const correo = String(campoCorreo.value).trim().toLowerCase();
        const usuario = cuentas.find(function (c) {
            return c.correo.toLowerCase() === correo && c.clave === campoClave.value;
        });

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