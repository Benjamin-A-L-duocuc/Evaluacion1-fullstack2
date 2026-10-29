import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Boton from "../components/Boton";
import EncabezadoPanel from "../components/EncabezadoPanel";
import HeroSeccion from "../components/HeroSeccion";
import ProductCard from "../components/ProductCard";

const IMAGENES_CATEGORIA = {
    Calzado: "https://picsum.photos/seed/calzado/600/400",
    Ropa: "https://picsum.photos/seed/ropa/600/400",
    Accesorios: "https://picsum.photos/seed/accesorios/600/400"
};

function Categories({ productos, onAgregar }) {
    const categorias = productos.reduce(function (lista, producto) {
        if (!lista.includes(producto.categoria)) lista.push(producto.categoria);
        return lista;
    }, []);

    return (
        <>
            <HeroSeccion
                titulo="Categorías"
                subtitulo="Encuentra más rápido el equipamiento que necesitas."
            />

            <main className="py-5">
                <Container>
                    <Row className="g-4 mb-5">
                        {categorias.map(function (categoria) {
                            const cantidad = productos.filter(function (producto) {
                                return producto.categoria === categoria;
                            }).length;

                            return (
                                <Col md={4} key={categoria}>
                                    <Link
                                        to={"/productos?categoria=" + categoria}
                                        className="categoria"
                                    >
                                        <img
                                            src={
                                                IMAGENES_CATEGORIA[categoria] ||
                                                "https://picsum.photos/seed/athlex/600/400"
                                            }
                                            alt={categoria}
                                        />
                                        <span className="categoria-nombre">
                                            {categoria} ({cantidad})
                                        </span>
                                    </Link>
                                </Col>
                            );
                        })}
                    </Row>

                    {categorias.map(function (categoria) {
                        const productosCategoria = productos.filter(function (producto) {
                            return producto.categoria === categoria;
                        });

                        return (
                            <section className="mb-5" key={categoria}>
                                <EncabezadoPanel
                                    className="mb-3"
                                    titulo={categoria}
                                    tituloAs="h2"
                                    tituloClassName="mb-1"
                                    subtitulo={
                                        productosCategoria.length + " productos disponibles."
                                    }
                                    accion={
                                        <Boton
                                            variante="outline"
                                            tamano="sm"
                                            to={"/productos?categoria=" + categoria}
                                        >
                                            Ver en catálogo
                                        </Boton>
                                    }
                                />

                                <Row className="g-4">
                                    {productosCategoria.map(function (producto) {
                                        return (
                                            <Col md={6} lg={4} key={producto.id}>
                                                <ProductCard
                                                    producto={producto}
                                                    onAgregar={onAgregar}
                                                    tituloEtiqueta="h3"
                                                />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </section>
                        );
                    })}
                </Container>
            </main>
        </>
    );
}

export default Categories;
