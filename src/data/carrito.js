/* =========================================================
   Athlex Store React - data/carrito.js
   Persistencia del carrito en localStorage.
   El carrito guarda el precio unitario al momento de agregar.
   ========================================================= */

const CLAVE_CARRITO = "athlex_carrito_react";

export const carritoInicial = [
    { productoId: 1, cantidad: 1, precioUnitario: 49990 },
    { productoId: 2, cantidad: 2, precioUnitario: 24990 }
];

export function guardarCarrito(items) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
}

export function leerCarrito() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    if (!datos) {
        guardarCarrito(carritoInicial);
        return carritoInicial.map(function (item) { return { ...item }; });
    }
    try {
        return JSON.parse(datos);
    } catch (error) {
        guardarCarrito(carritoInicial);
        return carritoInicial.map(function (item) { return { ...item }; });
    }
}

export function agregarItem(carrito, productoId, cantidad, precioUnitario) {
    const existente = carrito.find(function (item) {
        return item.productoId === Number(productoId) && item.precioUnitario === Number(precioUnitario);
    });

    if (existente) {
        return carrito.map(function (item) {
            if (item === existente) {
                return { ...item, cantidad: item.cantidad + cantidad };
            }
            return item;
        });
    }

    return carrito.concat([
        {
            productoId: Number(productoId),
            cantidad: Number(cantidad),
            precioUnitario: Number(precioUnitario)
        }
    ]);
}

export function cambiarCantidad(carrito, indice, cantidad) {
    return carrito.map(function (item, i) {
        if (i !== indice) return item;
        return { ...item, cantidad: Math.max(1, Number(cantidad)) };
    });
}

export function quitarItem(carrito, indice) {
    return carrito.filter(function (item, i) {
        return i !== indice;
    });
}

export function vaciarCarrito() {
    guardarCarrito([]);
    return [];
}

export function calcularTotal(carrito) {
    return carrito.reduce(function (total, item) {
        return total + item.cantidad * item.precioUnitario;
    }, 0);
}

export function contarUnidades(carrito) {
    return carrito.reduce(function (total, item) {
        return total + item.cantidad;
    }, 0);
}
