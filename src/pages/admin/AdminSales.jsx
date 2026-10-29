import React, { useState } from "react";
import { Card, Table } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";
import Boton from "../../components/Boton";
import EncabezadoPanel from "../../components/EncabezadoPanel";
import EstadoVacio from "../../components/EstadoVacio";
import Precio from "../../components/Precio";
import SummaryCard from "../../components/SummaryCard";
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
            <EncabezadoPanel
                className="mb-4"
                titulo="Compras realizadas"
                tituloAs="h1"
                tituloClassName="h3 mb-1"
                subtitulo="Consulta el historial de ventas de la tienda."
                accion={
                    <Boton type="button" variante="outline" onClick={restaurar}>
                        Restaurar historial
                    </Boton>
                }
            />

            <AlertMessage show={Boolean(aviso)}>{aviso}</AlertMessage>

            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <SummaryCard numero={ventas.length} etiqueta="Ventas registradas" />
                </div>
                <div className="col-md-4">
                    <SummaryCard
                        numero={<Precio valor={totalRecaudado} />}
                        etiqueta="Total recaudado"
                    />
                </div>
                <div className="col-md-4">
                    <SummaryCard numero={enTransito} etiqueta="Pedidos en tránsito" />
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
                                        <Precio
                                            as="td"
                                            className="clave-precio"
                                            valor={venta.total}
                                        />
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
                                            <Boton
                                                type="button"
                                                variante="outline"
                                                tamano="sm"
                                                title="Eliminar registro"
                                                onClick={function () {
                                                    eliminar(venta.id);
                                                }}
                                            >
                                                🗑️
                                            </Boton>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                {ventas.length === 0 ? (
                    <EstadoVacio
                        variante="texto"
                        mensaje="No hay ventas registradas. Puedes restaurar el historial de demostración."
                    />
                ) : null}
            </Card>
        </>
    );
}

export default AdminSales;
