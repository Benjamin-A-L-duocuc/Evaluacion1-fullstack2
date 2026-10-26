/* =========================================================
   Athlex Store React - data/ventas.js
   Fuente de datos simulada para las compras realizadas.
   Incluye CRUD básico y persistencia con localStorage.
   ========================================================= */

const CLAVE_VENTAS = "athlex_ventas_react";

export const ventasIniciales = [
    {
        id: 1024,
        fecha: "18/09/2026",
        cliente: "cliente@duoc.cl",
        producto: "Zapatilla Runner Pro",
        cantidad: 1,
        total: 49990,
        estado: "Entregado"
    },
    {
        id: 1023,
        fecha: "15/09/2026",
        cliente: "cliente@duoc.cl",
        producto: "Polera Deportiva Air",
        cantidad: 2,
        total: 49980,
        estado: "En tránsito"
    },
    {
        id: 1022,
        fecha: "12/09/2026",
        cliente: "cliente@duoc.cl",
        producto: "Anillas de Gimnasia",
        cantidad: 1,
        total: 19990,
        estado: "Entregado"
    },
    {
        id: 1021,
        fecha: "10/09/2026",
        cliente: "cliente@duoc.cl",
        producto: "Mancuernas Ajustables",
        cantidad: 1,
        total: 29990,
        estado: "En tránsito"
    },
    {
        id: 1020,
        fecha: "05/09/2026",
        cliente: "cliente@duoc.cl",
        producto: "Short Deportivo Flex",
        cantidad: 1,
        total: 14990,
        estado: "Pendiente"
    }
];

function guardarVentas(ventas) {
    localStorage.setItem(CLAVE_VENTAS, JSON.stringify(ventas));
}

export function listarVentas() {
    const datos = localStorage.getItem(CLAVE_VENTAS);
    if (!datos) {
        guardarVentas(ventasIniciales);
        return ventasIniciales.map(function (v) { return { ...v }; });
    }
    try {
        return JSON.parse(datos);
    } catch (error) {
        guardarVentas(ventasIniciales);
        return ventasIniciales.map(function (v) { return { ...v }; });
    }
}

export function crearVenta(venta) {
    const ventas = listarVentas();
    const nuevoId = ventas.reduce(function (maximo, v) {
        return Math.max(maximo, v.id);
    }, 1000) + 1;

    const nuevaVenta = {
        id: nuevoId,
        fecha: venta.fecha,
        cliente: venta.cliente,
        producto: venta.producto,
        cantidad: venta.cantidad,
        total: venta.total,
        estado: venta.estado
    };

    guardarVentas([nuevaVenta].concat(ventas));
    return nuevaVenta;
}

export function actualizarVenta(id, cambios) {
    const ventas = listarVentas();
    const actualizadas = ventas.map(function (v) {
        if (v.id !== Number(id)) return v;
        return { ...v, ...cambios };
    });
    guardarVentas(actualizadas);
    return actualizadas.find(function (v) { return v.id === Number(id); }) || null;
}

export function eliminarVenta(id) {
    const ventas = listarVentas();
    const filtradas = ventas.filter(function (v) { return v.id !== Number(id); });
    guardarVentas(filtradas);
    return filtradas;
}

export function reiniciarVentas() {
    localStorage.removeItem(CLAVE_VENTAS);
    return listarVentas();
}
