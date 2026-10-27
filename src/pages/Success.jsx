import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { formatoCL } from "../utils/formato";

function Success() {
    const ubicacion = useLocation();
    const resumen = ubicacion.state;

    return (
        <main className="py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="p-4 p-md-5 text-center">
                            <div className="display-4 mb-2">✅</div>
                            <Badge bg="success" className="mx-auto mb-3">Compra exitosa</Badge>
                            <h1 className="h3 mb-2">¡Gracias por tu compra!</h1>
                            <p className="text-secondary mb-4">
                                Tu pedido fue registrado correctamente. Enviaremos las
                                actualizaciones al correo indicado.
                            </p>

                            {resumen ? (
                                <>
                                    <div className="tabla-resumen text-start mb-4">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary">N° de pedido</span>
                                            <strong>{resumen.numeroPedido}</strong>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary">Fecha</span>
                                            <span>{resumen.fecha}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary">Cliente</span>
                                            <span>{resumen.cliente}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary">Entrega</span>
                                            <span className="text-end">
                                                {resumen.entrega === "retiro"
                                                    ? "Retiro en tienda"
                                                    : "Envío a domicilio"}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="text-secondary">Dirección</span>
                                            <span className="text-end">{resumen.direccion}</span>
                                        </div>
                                    </div>

                                    <div className="table-responsive mb-3">
                                        <table className="table tabla-admin align-middle text-start">
                                            <thead>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Cant.</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {resumen.items.map(function (item) {
                                                    return (
                                                        <tr key={item.productoId + "-" + item.precioUnitario}>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.cantidad}</td>
                                                            <td className="clave-precio">
                                                                {formatoCL(item.subtotal)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-secondary">Subtotal</span>
                                        <span>{formatoCL(resumen.subtotal)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-secondary">Envío</span>
                                        <span>
                                            {resumen.envio === 0
                                                ? "Gratis"
                                                : formatoCL(resumen.envio)}
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <span className="fs-5">Total pagado</span>
                                        <span className="precio">{formatoCL(resumen.total)}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-secondary">
                                    No encontramos el detalle de esta compra. Revisa tu historial
                                    de pedidos o contáctanos.
                                </p>
                            )}

                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                                <Link className="btn btn-acento" to="/productos">
                                    Seguir comprando
                                </Link>
                                <Link className="btn btn-outline-acento" to="/home">
                                    Volver al inicio
                                </Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Success;
