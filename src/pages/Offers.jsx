import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function Offers({ productos, onAgregar }) {
    const ofertas = productos.filter(function (producto) {
        return producto.precioOferta !== null && producto.precioOferta !== undefined;
    });

    return (
        <>
            <header className="hero py-5">
                <Container>
                    <span className="badge badge-marca mb-3">Precios especiales</span>
                    <h1 className="display-5 fw-bold mb-2">Ofertas de la temporada</h1>
                    <p className="lead mb-0">
                        Aprovecha descuentos en productos seleccionados mientras dure el stock.
                    </p>
                </Container>
            </header>

            <main className="py-5">
                <Container>
                    <div className="encabezado-panel mb-4">
                        <div>
                            <h2 className="mb-1">Productos en oferta</h2>
                            <p className="text-secondary mb-0">
                                {ofertas.length} productos con descuento.
                            </p>
                        </div>
                        <Link className="btn btn-outline-acento" to="/productos">
                            Ver catálogo completo
                        </Link>
                    </div>

                    {ofertas.length === 0 ? (
                        <div className="card p-4 text-center">
                            <p className="mb-1">No hay ofertas disponibles por el momento.</p>
                            <p className="text-secondary small mb-0">
                                Vuelve pronto para revisar nuevas promociones.
                            </p>
                        </div>
                    ) : (
                        <Row className="justify-content-center g-4">
                            {ofertas.map(function (producto) {
                                return (
                                    <Col md={6} lg={4} key={producto.id}>
                                        <ProductCard
                                            producto={producto}
                                            onAgregar={onAgregar}
                                            usarOferta={true}
                                            tituloEtiqueta="h2"
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    )}
                </Container>
            </main>
        </>
    );
}

export default Offers;
