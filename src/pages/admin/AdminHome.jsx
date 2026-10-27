import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import SummaryCard from "../../components/SummaryCard";
import { formatoCL } from "../../utils/formato";

function AdminHome({ productos, ventas }) {
    const categorias = productos.reduce(function (lista, producto) {
        if (!lista.includes(producto.categoria)) lista.push(producto.categoria);
        return lista;
    }, []);

    const criticos = productos.filter(function (producto) {
        return Number(producto.stock) <= Number(producto.stockCritico || 0);
    });

    const totalRecaudado = ventas.reduce(function (total, venta) {
        return total + Number(venta.total);
    }, 0);

    const enTransito = ventas.filter(function (venta) {
        return venta.estado === "En tránsito";
    }).length;

    return (
        <>
            <h1 className="h3 mb-1">Panel de administración</h1>
            <p className="text-secondary mb-4">
                Gestiona el contenido de la tienda Athlex desde este panel.
            </p>

            <Row className="g-3 mb-4">
                <Col md={6} lg={4}>
                    <SummaryCard
                        numero={productos.length}
                        etiqueta="Productos en catálogo"
                        to="/admin/productos"
                    />
                </Col>
                <Col md={6} lg={4}>
                    <SummaryCard
                        numero={categorias.length}
                        etiqueta="Categorías activas"
                        to="/categorias"
                    />
                </Col>
                <Col md={6} lg={4}>
                    <SummaryCard
                        numero={criticos.length}
                        etiqueta="Alertas de stock crítico"
                        to="/admin/productos"
                    />
                </Col>
            </Row>

            <Card className="p-4 mb-4">
                <div className="encabezado-panel">
                    <div>
                        <h2 className="h5 mb-1">Gestión de productos</h2>
                        <p className="text-secondary small mb-0">
                            Administra los productos disponibles en tu sitio: agrega, edita o
                            elimina artículos del catálogo.
                        </p>
                    </div>
                    <Link className="btn btn-acento" to="/admin/productos">
                        Ir a gestión
                    </Link>
                </div>
            </Card>

            <Card className="p-4 mb-4">
                <div className="encabezado-panel">
                    <div>
                        <h2 className="h5 mb-1">Compras realizadas</h2>
                        <p className="text-secondary small mb-0">
                            Consulta el historial de ventas y los pedidos de los clientes.
                        </p>
                        <p className="text-secondary small mb-0 mt-2">
                            {ventas.length} ventas registradas · {formatoCL(totalRecaudado)}{" "}
                            recaudados · {enTransito} pedidos en tránsito.
                        </p>
                    </div>
                    <Link className="btn btn-outline-acento" to="/admin/ventas">
                        Ver ventas
                    </Link>
                </div>
            </Card>

            {criticos.length > 0 ? (
                <Card className="p-4 mb-4">
                    <h2 className="h5 mb-2">Productos con stock crítico</h2>
                    <ul className="mb-0">
                        {criticos.map(function (producto) {
                            return (
                                <li key={producto.id}>
                                    {producto.nombre} · {producto.stock} unidades disponibles
                                    (mínimo {producto.stockCritico})
                                </li>
                            );
                        })}
                    </ul>
                </Card>
            ) : null}

            <p className="text-secondary small mt-4 mb-0">
                Panel protegido con sesión local: solo el perfil{" "}
                <strong>Administrador</strong> puede ingresar desde el inicio de sesión.
            </p>
        </>
    );
}

export default AdminHome;
