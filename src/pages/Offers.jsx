import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Boton from "../components/Boton";
import EncabezadoPanel from "../components/EncabezadoPanel";
import EstadoVacio from "../components/EstadoVacio";
import HeroSeccion from "../components/HeroSeccion";
import ProductCard from "../components/ProductCard";

function Offers({ productos, onAgregar }) {
    const ofertas = productos.filter(function (producto) {
        return producto.precioOferta !== null && producto.precioOferta !== undefined;
    });

    return (
        <>
            <HeroSeccion
                badge="Precios especiales"
                titulo="Ofertas de la temporada"
                subtitulo="Aprovecha descuentos en productos seleccionados mientras dure el stock."
            />

            <main className="py-5">
                <Container>
                    <EncabezadoPanel
                        className="mb-4"
                        titulo="Productos en oferta"
                        tituloAs="h2"
                        tituloClassName="mb-1"
                        subtitulo={ofertas.length + " productos con descuento."}
                        accion={
                            <Boton variante="outline" to="/productos">
                                Ver catálogo completo
                            </Boton>
                        }
                    />

                    {ofertas.length === 0 ? (
                        <EstadoVacio
                            titulo="No hay ofertas disponibles por el momento."
                            tituloClassName="mb-1"
                            mensaje="Vuelve pronto para revisar nuevas promociones."
                        />
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
