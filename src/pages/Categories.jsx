import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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
            <header className="hero py-5">
                <Container>
                    <h1 className="display-5 fw-bold mb-2">Categorías</h1>
                    <p className="lead mb-0">
                        Encuentra más rápido el equipamiento que necesitas.
                    </p>
                </Container>
            </header>

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
                                <div className="encabezado-panel mb-3">
                                    <div>
                                        <h2 className="mb-1">{categoria}</h2>
                                        <p className="text-secondary mb-0">
                                            {productosCategoria.length} productos disponibles.
                                        </p>
                                    </div>
                                    <Link
                                        className="btn btn-outline-acento btn-sm"
                                        to={"/productos?categoria=" + categoria}
                                    >
                                        Ver en catálogo
                                    </Link>
                                </div>

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
