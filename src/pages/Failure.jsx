import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { formatoCL } from "../utils/formato";

function Failure() {
    const ubicacion = useLocation();
    const datos = ubicacion.state;

    return (
        <main className="py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={7}>
                        <Card className="p-4 p-md-5 text-center">
                            <div className="display-4 mb-2">❌</div>
                            <Badge bg="danger" className="mx-auto mb-3">
                                Pago no realizado
                            </Badge>
                            <h1 className="h3 mb-2">No pudimos completar tu compra</h1>
                            <p className="text-secondary mb-4">
                                {datos && datos.motivo
                                    ? datos.motivo
                                    : "Ocurrió un problema al procesar el pago. Tus productos siguen en el carrito para que puedas intentarlo nuevamente."}
                            </p>

                            {datos ? (
                                <div className="tabla-resumen text-start mb-4">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-secondary">N° de intento</span>
                                        <strong>{datos.numeroPedido}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-secondary">Total del pedido</span>
                                        <span className="clave-precio">
                                            {formatoCL(datos.total)}
                                        </span>
                                    </div>
                                </div>
                            ) : null}

                            <p className="text-secondary small">
                                Puedes intentar con otro medio de pago o revisar los datos de tu
                                tarjeta. Si el problema continúa, escríbenos desde la página de
                                contacto.
                            </p>

                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                                <Link className="btn btn-acento" to="/checkout">
                                    Reintentar pago
                                </Link>
                                <Link className="btn btn-outline-acento" to="/carrito">
                                    Revisar carrito
                                </Link>
                                <Link className="btn btn-outline-acento" to="/contacto">
                                    Contactarnos
                                </Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Failure;
