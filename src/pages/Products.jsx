import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Boton from "../components/Boton";
import CampoFormulario from "../components/CampoFormulario";
import EstadoVacio from "../components/EstadoVacio";
import HeroSeccion from "../components/HeroSeccion";
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
            <HeroSeccion
                titulo="Catálogo de productos"
                subtitulo="Ropa y artículos deportivos seleccionados para tu entrenamiento."
            />

            <main className="py-5">
                <Container>
                    <Row className="g-2 align-items-end mb-4">
                        <Col md={7}>
                            <CampoFormulario
                                label="Buscar producto"
                                id="buscarProducto"
                                placeholder="Ej: zapatilla, polera, mancuernas..."
                                value={busqueda}
                                onChange={setBusqueda}
                            />
                        </Col>
                        <Col md={3}>
                            <CampoFormulario
                                as="select"
                                label="Categoría"
                                id="filtroCategoria"
                                value={categoria}
                                options={["Todas"].concat(categorias)}
                                onChange={setCategoria}
                            />
                        </Col>
                        <Col md={2}>
                            <Boton
                                type="button"
                                variante="outline"
                                className="w-100"
                                onClick={limpiarFiltros}
                            >
                                Limpiar
                            </Boton>
                        </Col>
                    </Row>

                    {filtrados.length === 0 ? (
                        <EstadoVacio
                            titulo="No encontramos productos con esos filtros."
                            tituloClassName="mb-1"
                            mensaje="Prueba con otra búsqueda o categoría."
                        />
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
