import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
    return (
        <main className="py-5">
            <Container>
                <h1 className="h2 text-center mb-4">Sobre Nosotros</h1>

                <Row className="align-items-center mb-5">
                    <Col md={5} className="mb-3 mb-md-0">
                        <img
                            src="https://picsum.photos/seed/tienda/600/400"
                            className="img-fluid rounded"
                            alt="La tienda Athlex"
                        />
                    </Col>
                    <Col md={7}>
                        <h2 className="h4">Nuestra empresa</h2>
                        <p>
                            <strong>Athlex</strong> es una importadora chilena de ropa y artículos
                            deportivos. Nacimos con la misión de llevar el deporte al alcance de
                            todos, entregando productos de calidad a precios justos, tanto en
                            tiendas físicas como en nuestro nuevo canal en línea.
                        </p>
                        <p>
                            Creemos que cada persona merece equiparse bien para entrenar y superar
                            sus propios límites, por eso seleccionamos cuidadosamente cada artículo
                            que llega a nuestro catálogo.
                        </p>
                    </Col>
                </Row>

                <h2 className="h4 text-center mb-4">Nuestro equipo de desarrollo</h2>
                <Row className="justify-content-center g-4">
                    <Col md={4}>
                        <Card className="h-100 text-center p-3 bg-dark text-white">
                            <div className="display-5 mb-2">👨‍💻</div>
                            <h3 className="h5">Benjamin Astudillo</h3>
                            <p className="small mb-0">
                                Líder del proyecto. Encargado de la página principal, los estilos
                                de la marca y el diseño general de la tienda.
                            </p>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="h-100 text-center p-3 bg-dark text-white">
                            <div className="display-5 mb-2">👨‍💻</div>
                            <h3 className="h5">Williams Contreras</h3>
                            <p className="small mb-0">
                                Encargado del detalle del producto "Zapatilla Runner Pro" y de la
                                página de Nosotros.
                            </p>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="h-100 text-center p-3 bg-dark text-white">
                            <div className="display-5 mb-2">👨‍💻</div>
                            <h3 className="h5">Jonathan Garrido</h3>
                            <p className="small mb-0">
                                Encargado del detalle del producto "Polera Deportiva Air", la
                                validación de los formularios y el panel del administrador.
                            </p>
                        </Card>
                    </Col>
                </Row>

                <div className="text-center mt-5">
                    <Link className="btn btn-acento" to="/productos">
                        Ir a la tienda
                    </Link>
                </div>
            </Container>
        </main>
    );
}

export default About;
