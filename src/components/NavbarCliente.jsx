import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Boton from "./Boton";

function NavbarCliente({ sesion, onCerrarSesion }) {
    const ubicacion = useLocation();
    const navegar = useNavigate();
    const ruta = ubicacion.pathname;

    function esActiva(destino) {
        if (destino === "/productos") return ruta === "/productos" || ruta.startsWith("/productos/");
        return ruta === destino;
    }

    function manejarCerrarSesion(evento) {
        evento.preventDefault();
        if (window.confirm("¿Deseas cerrar tu sesión?")) {
            onCerrarSesion();
            navegar("/");
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/home" className="fw-bold">
                    🏃 Athlex
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="menuCliente" />
                <Navbar.Collapse id="menuCliente">
                    <Nav className="ms-auto align-items-lg-center">
                        <Nav.Link as={Link} to="/home" active={esActiva("/home")}>
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/productos" active={esActiva("/productos")}>
                            Productos
                        </Nav.Link>
                        <Nav.Link as={Link} to="/categorias" active={esActiva("/categorias")}>
                            Categorías
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ofertas" active={esActiva("/ofertas")}>
                            Ofertas
                        </Nav.Link>
                        <Nav.Link as={Link} to="/nosotros" active={esActiva("/nosotros")}>
                            Nosotros
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contacto" active={esActiva("/contacto")}>
                            Contacto
                        </Nav.Link>
                        <Nav.Item>
                            <span className="nav-link text-secondary">
                                {sesion ? "Hola, " + sesion.nombre : ""}
                            </span>
                        </Nav.Item>
                        <Nav.Item>
                            <a
                                href="/"
                                className="nav-link link-sesion"
                                onClick={manejarCerrarSesion}
                            >
                                Cerrar sesión
                            </a>
                        </Nav.Item>
                    </Nav>
                    <Boton
                        to="/carrito"
                        className="ms-lg-3 d-inline-flex align-items-center gap-2"
                    >
                        🛒 Carrito
                    </Boton>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarCliente;
