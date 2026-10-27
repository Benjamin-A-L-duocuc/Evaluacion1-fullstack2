import React, { useState } from "react";
import { Card, Table } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";
import { formatoCL } from "../../utils/formato";
import {
    actualizarVenta,
    eliminarVenta,
    reiniciarVentas
} from "../../data/ventas";

const ESTADOS = ["Pendiente", "En tránsito", "Entregado", "Cancelado"];

function AdminSales({ ventas, recargarVentas }) {
    const [aviso, setAviso] = useState("");

    const totalRecaudado = ventas.reduce(function (total, venta) {
        return total + Number(venta.total);
    }, 0);

    const enTransito = ventas.filter(function (venta) {
        return venta.estado === "En tránsito";
    }).length;

    const pendientes = ventas.filter(function (venta) {
        return venta.estado === "Pendiente";
    }).length;

    function cambiarEstado(id, estado) {
        actualizarVenta(id, { estado: estado });
        recargarVentas();
        setAviso("Estado del pedido actualizado.");
    }

    function eliminar(id) {
        if (!window.confirm("¿Eliminar este registro de venta?")) return;
        eliminarVenta(id);
        recargarVentas();
        setAviso("Registro de venta eliminado.");
    }

    function restaurar() {
        if (!window.confirm("¿Restaurar el historial de ventas de demostración?")) return;
        reiniciarVentas();
        recargarVentas();
        setAviso("Historial de ventas restaurado.");
    }

    return (
        <>
            <div className="encabezado-panel mb-4">
                <div>
                    <h1 className="h3 mb-1">Compras realizadas</h1>
                    <p className="text-secondary mb-0">
                        Consulta el historial de ventas de la tienda.
                    </p>
                </div>
                <button type="button" className="btn btn-outline-acento" onClick={restaurar}>
                    Restaurar historial
                </button>
            </div>

            <AlertMessage show={Boolean(aviso)}>{aviso}</AlertMessage>

            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="tabla-resumen">
                        <p className="numero mb-1">{ventas.length}</p>
                        <p className="etiqueta mb-0">Ventas registradas</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="tabla-resumen">
                        <p className="numero mb-1">{formatoCL(totalRecaudado)}</p>
                        <p className="etiqueta mb-0">Total recaudado</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="tabla-resumen">
                        <p className="numero mb-1">{enTransito}</p>
                        <p className="etiqueta mb-0">Pedidos en tránsito</p>
                    </div>
                </div>
            </div>

            <Card className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="h5 mb-0">Historial de compras</h2>
                    <span className="text-secondary small">
                        {ventas.length} registros · {pendientes} pendientes
                    </span>
                </div>

                <div className="table-responsive">
                    <Table className="tabla-admin align-middle">
                        <thead>
                            <tr>
                                <th>N° Pedido</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Producto</th>
                                <th>Cant.</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map(function (venta) {
                                return (
                                    <tr key={venta.id}>
                                        <td>#{venta.id}</td>
                                        <td>{venta.fecha}</td>
                                        <td>{venta.cliente}</td>
                                        <td>{venta.producto}</td>
                                        <td>{venta.cantidad}</td>
                                        <td className="clave-precio">
                                            {formatoCL(venta.total)}
                                        </td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={venta.estado}
                                                onChange={function (e) {
                                                    cambiarEstado(venta.id, e.target.value);
                                                }}
                                            >
                                                {ESTADOS.map(function (estado) {
                                                    return (
                                                        <option key={estado} value={estado}>
                                                            {estado}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-acento"
                                                title="Eliminar registro"
                                                onClick={function () { eliminar(venta.id); }}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                {ventas.length === 0 ? (
                    <p className="text-secondary small mb-0">
                        No hay ventas registradas. Puedes restaurar el historial de
                        demostración.
                    </p>
                ) : null}
            </Card>
        </>
    );
}

export default AdminSales;
