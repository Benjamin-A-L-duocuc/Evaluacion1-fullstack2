import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel, Container, Row, Col, Badge } from "react-bootstrap";
import QuantityStepper from "../components/QuantityStepper";
import ProductCard from "../components/ProductCard";
import { formatoCL } from "../utils/formato";

function ProductDetail({ productos, onAgregar }) {
    const parametros = useParams();
    const navegar = useNavigate();
    const [cantidad, setCantidad] = useState(1);
    const [talla, setTalla] = useState("");
    const [agregado, setAgregado] = useState(false);

    const producto = productos.find(function (item) {
        return item.id === Number(parametros.id);
    });

    if (!producto) {
        return (
            <main className="py-5">
                <Container>
                    <div className="card p-4 text-center">
                        <h1 className="h3 mb-2">Producto no encontrado</h1>
                        <p className="text-secondary mb-3">
                            El producto que buscas no existe o fue eliminado.
                        </p>
                        <Link to="/productos" className="btn btn-acento">
                            Volver al catálogo
                        </Link>
                    </div>
                </Container>
            </main>
        );
    }

    const relacionado = productos.find(function (item) {
        return item.id === producto.relacionadoId;
    });

    function manejarAgregar() {
        onAgregar(producto.id, cantidad, producto.precio);
        setAgregado(true);
        window.setTimeout(function () {
            setAgregado(false);
        }, 1800);
    }

    function comprarAhora() {
        onAgregar(producto.id, cantidad, producto.precio);
        navegar("/checkout");
    }

    return (
        <main className="py-5">
            <Container>
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/home" className="text-secondary text-decoration-none">
                                Inicio
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/productos" className="text-secondary text-decoration-none">
                                Productos
                            </Link>
                        </li>
                        <li className="breadcrumb-item active text-secondary" aria-current="page">
                            {producto.nombre}
                        </li>
                    </ol>
                </nav>

                <Row className="g-4 align-items-start">
                    <Col lg={6}>
                        <Carousel className="carousel-tienda">
                            {producto.imagenes.map(function (imagen, indice) {
                                return (
                                    <Carousel.Item key={indice}>
                                        <img
                                            src={imagen.src}
                                            className="d-block w-100 img-carousel"
                                            alt={imagen.alt}
                                        />
                                    </Carousel.Item>
                                );
                            })}
                        </Carousel>
                    </Col>

                    <Col lg={6}>
                        <Badge className="badge-stock mb-2">{producto.categoria}</Badge>
                        <h1 className="h3 fw-bold mb-1">{producto.nombre}</h1>
                        <p className="valoracion mb-3">
                            {producto.estrellas}{" "}
                            <span className="texto">
                                {producto.rating} · {producto.resenas} reseñas
                            </span>
                        </p>
                        <p className="precio mb-3">{formatoCL(producto.precio)}</p>

                        <p className="text-secondary">{producto.descripcion}</p>

                        {producto.tallas.length > 0 ? (
                            <div className="mb-3">
                                <label className="form-label d-block">Talla</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {producto.tallas.map(function (opcion) {
                                        const activa = talla === opcion;
                                        return (
                                            <button
                                                key={opcion}
                                                type="button"
                                                className="opcion-talla"
                                                style={
                                                    activa
                                                        ? {
                                                              borderColor: "var(--acento)",
                                                              color: "var(--acento)"
                                                          }
                                                        : undefined
                                                }
                                                onClick={function () { setTalla(opcion); }}
                                            >
                                                {opcion}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}

                        <div className="mb-3">
                            <label className="form-label d-block">Cantidad</label>
                            <div className="d-flex flex-wrap align-items-center gap-3">
                                <QuantityStepper
                                    valor={cantidad}
                                    onCambiar={setCantidad}
                                    maximo={producto.stock}
                                />
                                <p className="precio-total mb-0">
                                    Total: {formatoCL(producto.precio * cantidad)}
                                </p>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
                            <button
                                type="button"
                                className="btn btn-acento flex-fill btn-lg"
                                onClick={manejarAgregar}
                            >
                                {agregado ? "✓ Añadido al carrito" : "Añadir al carrito"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-acento flex-fill btn-lg"
                                onClick={comprarAhora}
                            >
                                Comprar ahora
                            </button>
                        </div>

                        <p className="text-secondary small mb-0">
                            Código: <strong>{producto.codigo}</strong> · Stock disponible:{" "}
                            <strong>{producto.stock}</strong> unidades
                        </p>
                    </Col>
                </Row>

                <Row className="g-3 mt-2 mb-4">
                    <Col md={4}>
                        <div className="badge-servicio d-flex align-items-center gap-3">
                            <span className="icono">🚚</span>
                            <div>
                                <p className="mb-0 fw-bold">Envío a todo Chile</p>
                                <small className="text-secondary">
                                    Gratis en compras sobre $50.000.
                                </small>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="badge-servicio d-flex align-items-center gap-3">
                            <span className="icono">↩️</span>
                            <div>
                                <p className="mb-0 fw-bold">Cambio fácil</p>
                                <small className="text-secondary">
                                    Hasta 30 días desde la compra.
                                </small>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="badge-servicio d-flex align-items-center gap-3">
                            <span className="icono">🔒</span>
                            <div>
                                <p className="mb-0 fw-bold">Pago seguro</p>
                                <small className="text-secondary">
                                    Todos los medios de pago disponibles.
                                </small>
                            </div>
                        </div>
                    </Col>
                </Row>

                <section className="detalle-seccion">
                    <h2>Características del producto</h2>
                    <Row>
                        <Col md={6}>
                            <ul className="lista-marca list-unstyled">
                                {producto.caracteristicas.slice(0, 3).map(function (texto, indice) {
                                    return (
                                        <li key={indice}>
                                            <span className="marca-item">✓</span>
                                            {texto}
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                        <Col md={6}>
                            <ul className="lista-marca list-unstyled">
                                {producto.caracteristicas.slice(3, 6).map(function (texto, indice) {
                                    return (
                                        <li key={indice}>
                                            <span className="marca-item">✓</span>
                                            {texto}
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                    </Row>
                </section>

                <section className="detalle-seccion">
                    <h2>Información de envío</h2>
                    {producto.envio.map(function (parrafo, indice) {
                        return (
                            <p className="text-secondary mb-1" key={indice}>
                                {parrafo}
                            </p>
                        );
                    })}
                </section>

                {relacionado ? (
                    <section className="detalle-seccion">
                        <div className="encabezado-panel mb-3">
                            <h2 className="mb-0">También te puede interesar</h2>
                            <Link
                                className="btn btn-outline-acento btn-sm"
                                to="/productos"
                            >
                                Ver todos
                            </Link>
                        </div>
                        <Row className="g-4">
                            <Col md={5}>
                                <ProductCard
                                    producto={relacionado}
                                    onAgregar={onAgregar}
                                    mostrarDescripcion={false}
                                />
                            </Col>
                        </Row>
                    </section>
                ) : null}
            </Container>
        </main>
    );
}

export default ProductDetail;
