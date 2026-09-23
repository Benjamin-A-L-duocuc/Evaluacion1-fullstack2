/* =========================================================
   AthlexStore - admin-productos.js
   Gestión de productos del administrador (página de demostración).
   - Valida el formulario de producto en tiempo real.
   - Al guardar con datos válidos muestra un mensaje de éxito.
   (No persiste datos: el proceso de venta queda fuera de alcance.)
   ========================================================= */

function reglaCodigoProducto(valor) {
    if (!validarRequerido(valor)) return "El código es requerido.";
    if (!validarRangoLargo(valor, 3, 20)) return "El código debe tener entre 3 y 20 caracteres.";
    return null;
}

function reglaNombreProducto(valor) {
    if (!validarRequerido(valor)) return "El nombre es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    return null;
}

function reglaPrecioProducto(valor) {
    if (!validarRequerido(valor)) return "El precio es requerido.";
    if (!validarPrecio(valor)) return "El precio debe ser un número mayor o igual a 0.";
    return null;
}

function reglaStockProducto(valor) {
    if (!validarRequerido(valor)) return "El stock es requerido.";
    if (!validarEnteroNoNegativo(valor)) return "El stock debe ser un número entero mayor o igual a 0.";
    return null;
}

function reglaStockCriticoProducto(valor) {
    if (String(valor).trim() === "") return null; // opcional
    if (!validarEnteroNoNegativo(valor)) return "El stock crítico debe ser un número entero mayor o igual a 0.";
    return null;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formProducto");
    if (!form) return;

    configurarValidacionEnVivo("codigoProducto", "errorCodigoProducto", reglaCodigoProducto);
    configurarValidacionEnVivo("nombreProducto", "errorNombreProducto", reglaNombreProducto);
    configurarValidacionEnVivo("precioProducto", "errorPrecioProducto", reglaPrecioProducto);
    configurarValidacionEnVivo("stockProducto", "errorStockProducto", reglaStockProducto);
    configurarValidacionEnVivo("stockCriticoProducto", "errorStockCriticoProducto", reglaStockCriticoProducto);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const aviso = document.getElementById("avisoProducto");

        const codigoOk = validarCampo(document.getElementById("codigoProducto"), "errorCodigoProducto", reglaCodigoProducto);
        const nombreOk = validarCampo(document.getElementById("nombreProducto"), "errorNombreProducto", reglaNombreProducto);
        const categoriaOk = validarSelect(document.getElementById("categoriaProducto"), "errorCategoriaProducto", "Selecciona una categoría.");
        const precioOk = validarCampo(document.getElementById("precioProducto"), "errorPrecioProducto", reglaPrecioProducto);
        const stockOk = validarCampo(document.getElementById("stockProducto"), "errorStockProducto", reglaStockProducto);
        const stockCriticoOk = validarCampo(document.getElementById("stockCriticoProducto"), "errorStockCriticoProducto", reglaStockCriticoProducto);

        if (!codigoOk || !nombreOk || !categoriaOk || !precioOk || !stockOk || !stockCriticoOk) return;

        aviso.textContent = "Producto guardado correctamente (gestión de demostración).";
        aviso.classList.remove("d-none");
        aviso.classList.add("aviso-ok");

        form.reset();
        limpiarFormProducto();
    });

    /* El botón "Limpiar" (reset) restablece el formulario y su estado de validación */
    const botonLimpiar = form.querySelector('button[type="reset"]');
    if (botonLimpiar) {
        botonLimpiar.addEventListener("click", function () {
            setTimeout(limpiarFormProducto, 0);
        });
    }
});

function limpiarFormProducto() {
    ["codigoProducto", "nombreProducto", "categoriaProducto", "precioProducto", "stockProducto", "stockCriticoProducto"].forEach(function (id) {
        limpiarEstadoInput(document.getElementById(id));
        const msj = document.getElementById("error" + id.charAt(0).toUpperCase() + id.slice(1));
        if (msj) limpiarError(msj.id);
    });
    const aviso = document.getElementById("avisoProducto");
    if (aviso) aviso.classList.add("d-none");
}