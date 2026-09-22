/* =========================================================
   AthlexStore - cantidades.js
   Selectores +/− de cantidad con precio en vivo.
   Solo demostración visual: no persiste datos entre páginas.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    var entradas = document.querySelectorAll("input[data-precio-unit]");
    if (!entradas.length) return;

    function formatoCL(numero) {
        return "$" + Number(numero).toLocaleString("es-CL");
    }

    function pintarTotal(entrada) {
        var cantidad = Number(entrada.value) || 1;
        var unitario = Number(entrada.getAttribute("data-precio-unit"));
        var destino = document.querySelector(entrada.getAttribute("data-total-destino"));
        if (destino) {
            var prefijo = entrada.getAttribute("data-total-prefijo") || "";
            destino.textContent = prefijo + formatoCL(unitario * cantidad);
        }
        calcularTotalCarrito();
    }

    function calcularTotalCarrito() {
        var total = document.getElementById("totalCarrito");
        if (!total) return;
        var suma = 0;
        entradas.forEach(function (entrada) {
            suma += (Number(entrada.value) || 1) * Number(entrada.getAttribute("data-precio-unit"));
        });
        total.textContent = formatoCL(suma);
    }

    entradas.forEach(function (entrada) {
        var menos = document.querySelector('[data-cantidad-menos="#' + entrada.id + '"]');
        var mas = document.querySelector('[data-cantidad-mas="#' + entrada.id + '"]');

        function cambiar(step) {
            var limite = Number(entrada.getAttribute("data-max")) || 20;
            var cantidad = Math.min(limite, Math.max(1, (Number(entrada.value) || 1) + step));
            entrada.value = cantidad;
            pintarTotal(entrada);
        }

        if (menos) menos.addEventListener("click", function () { cambiar(-1); });
        if (mas) mas.addEventListener("click", function () { cambiar(1); });

        pintarTotal(entrada);
    });

    calcularTotalCarrito();
});