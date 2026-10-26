import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function Products({ productos, onAgregar }) {
    const ubicacion = useLocation();
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("Todas");

    useEffect(
        function () {
            const parametros = new URLSearchParams(ubicacion.search);
            setCategoria(parametros.get("categoria") || "Todas");
            setBusqueda(parametros.get("buscar") || "");
        },
        [ubicacion.search]
    );

    const categorias = productos.reduce(function (lista, producto) {
        if (!lista.includes(producto.categoria)) lista.push(producto.categoria);
        return lista;
    }, []);

    const texto = busqueda.trim().toLowerCase();

    const filtrados = productos.filter(function (producto) {
        const coincideCategoria = categoria === "Todas" || producto.categoria === categoria;
        const coincideTexto =
            texto === "" ||
            producto.nombre.toLowerCase().includes(texto) ||
            producto.descripcionCorta.toLowerCase().includes(texto);
        return coincideCategoria && coincideTexto;
    });

    function limpiarFiltros() {
        setBusqueda("");
        setCategoria("Todas");
    }

    return (
        <>
            <header className="hero py-5">
                <Container>
                    <h1 className="display-5 fw-bold mb-2">Catálogo de productos</h1>
                    <p className="lead mb-0">
                        Ropa y artículos deportivos seleccionados para tu entrenamiento.
                    </p>
                </Container>
            </header>

            <main className="py-5">
                <Container>
                    <Row className="g-2 align-items-end mb-4">
                        <Col md={7}>
                            <label className="form-label" htmlFor="buscarProducto">
                                Buscar producto
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="buscarProducto"
                                placeholder="Ej: zapatilla, polera, mancuernas..."
                                value={busqueda}
                                onChange={function (e) { setBusqueda(e.target.value); }}
                            />
                        </Col>
                        <Col md={3}>
                            <label className="form-label" htmlFor="filtroCategoria">
                                Categoría
                            </label>
                            <select
                                className="form-select"
                                id="filtroCategoria"
                                value={categoria}
                                onChange={function (e) { setCategoria(e.target.value); }}
                            >
                                <option value="Todas">Todas</option>
                                {categorias.map(function (nombre) {
                                    return (
                                        <option key={nombre} value={nombre}>
                                            {nombre}
                                        </option>
                                    );
                                })}
                            </select>
                        </Col>
                        <Col md={2}>
                            <button
                                type="button"
                                className="btn btn-outline-acento w-100"
                                onClick={limpiarFiltros}
                            >
                                Limpiar
                            </button>
                        </Col>
                    </Row>

                    {filtrados.length === 0 ? (
                        <div className="card p-4 text-center">
                            <p className="mb-1">No encontramos productos con esos filtros.</p>
                            <p className="text-secondary small mb-0">
                                Prueba con otra búsqueda o categoría.
                            </p>
                        </div>
                    ) : (
                        <Row className="justify-content-center g-4">
                            {filtrados.map(function (producto) {
                                return (
                                    <Col md={6} lg={4} key={producto.id}>
                                        <ProductCard
                                            producto={producto}
                                            onAgregar={onAgregar}
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

export default Products;
