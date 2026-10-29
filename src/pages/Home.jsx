import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Boton from "../components/Boton";
import EncabezadoPanel from "../components/EncabezadoPanel";
import ProductCard from "../components/ProductCard";

function Home({ productos, onAgregar }) {
    const [correoNewsletter, setCorreoNewsletter] = useState("");
    const [avisoNewsletter, setAvisoNewsletter] = useState(false);

    const destacados = productos.filter(function (producto) {
        return producto.id === 1 || producto.id === 2;
    });

    function enviarNewsletter(evento) {
        evento.preventDefault();
        setAvisoNewsletter(true);
        setCorreoNewsletter("");
    }

    return (
        <>
            <header className="hero py-5">
                <Container className="py-lg-4">
                    <Row className="align-items-center g-4">
                        <Col lg={6}>
                            <span className="badge badge-marca mb-3">
                                Nueva temporada 2026
                            </span>
                            <h1 className="display-4 fw-bold">Viste tu mejor versión</h1>
                            <p className="lead mb-4">
                                Ropa y artículos deportivos importados para rendir al máximo,
                                con envío a todo Chile.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-2">
                                <Boton to="/productos" tamano="lg">
                                    Comprar ahora
                                </Boton>
                                <Boton to="/nosotros" variante="outline" tamano="lg">
                                    Conócenos
                                </Boton>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <img
                                src="https://picsum.photos/seed/athlex/600/400"
                                alt="Tienda Athlex"
                                className="img-fluid hero-imagen"
                            />
                        </Col>
                    </Row>
                </Container>
            </header>

            <section
                className="py-4 border-bottom"
                style={{ borderColor: "#333" }}
            >
                <Container>
                    <Row className="g-3">
                        <Col md={4}>
                            <div className="beneficio">
                                <div className="icono">🚚</div>
                                <h3>Envío a todo Chile</h3>
                                <p>Despacho a domicilio y puntos de retiro.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="beneficio">
                                <div className="icono">🔒</div>
                                <h3>Pago seguro</h3>
                                <p>Compra protegida con los medios que prefieras.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="beneficio">
                                <div className="icono">↩️</div>
                                <h3>Cambios fáciles</h3>
                                <p>Cambia o devuelve tu pedido sin complicaciones.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <main className="py-5">
                <Container>
                    <EncabezadoPanel
                        className="mb-4"
                        titulo="Productos destacados"
                        tituloAs="h2"
                        tituloClassName="mb-1"
                        subtitulo="Lo más vendido de la temporada."
                        accion={
                            <Boton variante="outline" to="/productos">
                                Ver todos
                            </Boton>
                        }
                    />

                    <Row className="justify-content-center g-4">
                        {destacados.map(function (producto) {
                            const descripcion =
                                producto.id === 1
                                    ? "Ligera, amortiguada y con suela antideslizante."
                                    : "Transpirable, fresca y de corte deportivo.";
                            return (
                                <Col md={5} key={producto.id}>
                                    <ProductCard
                                        producto={producto}
                                        onAgregar={onAgregar}
                                        descripcion={descripcion}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </main>

            <section className="pb-5">
                <Container>
                    <h2 className="text-center mb-4">Explora por categoría</h2>
                    <Row className="g-4">
                        <Col md={6}>
                            <Link to="/productos?categoria=Calzado" className="categoria">
                                <img
                                    src="https://picsum.photos/seed/calzado/600/400"
                                    alt="Calzado"
                                />
                                <span className="categoria-nombre">Calzado deportivo</span>
                            </Link>
                        </Col>
                        <Col md={6}>
                            <Link to="/productos?categoria=Ropa" className="categoria">
                                <img
                                    src="https://picsum.photos/seed/ropa/600/400"
                                    alt="Ropa"
                                />
                                <span className="categoria-nombre">Ropa de entrenamiento</span>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pb-5">
                <Container>
                    <div className="newsletter p-4 p-md-5 text-center">
                        <h2 className="h4 mb-2">Recibe ofertas y novedades</h2>
                        <p className="text-secondary mb-4">
                            Suscríbete y entérate antes que nadie de nuestras promociones.
                        </p>
                        <form
                            className="row g-2 justify-content-center"
                            onSubmit={enviarNewsletter}
                        >
                            <div className="col-md-6 col-lg-5">
                                <input
                                    type="email"
                                    className="form-control text-center text-md-start"
                                    placeholder="tucorreo@duoc.cl"
                                    maxLength="100"
                                    value={correoNewsletter}
                                    onChange={function (e) {
                                        setCorreoNewsletter(e.target.value);
                                        setAvisoNewsletter(false);
                                    }}
                                />
                            </div>
                            <div className="col-md-auto">
                                <Boton type="submit" className="px-4">
                                    Suscribirme
                                </Boton>
                            </div>
                        </form>
                        {avisoNewsletter ? (
                            <p className="text-secondary small mt-3 mb-0">
                                ¡Suscripción registrada! (Demostración)
                            </p>
                        ) : null}
                    </div>
                </Container>
            </section>
        </>
    );
}

export default Home;
