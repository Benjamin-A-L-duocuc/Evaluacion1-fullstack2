import React from "react";
import { Link, useLocation } from "react-router-dom";

function obtenerEnlaces(ruta) {
    if (ruta === "/home") {
        return [
            { to: "/productos", label: "Productos" },
            { to: "/nosotros", label: "Nosotros" },
            { to: "/contacto", label: "Contacto" },
            { to: "/carrito", label: "Carrito" }
        ];
    }

    if (ruta === "/nosotros") {
        return [
            { to: "/productos", label: "Productos" },
            { to: "/contacto", label: "Contacto" },
            { to: "/carrito", label: "Carrito" }
        ];
    }

    if (ruta === "/contacto") {
        return [
            { to: "/productos", label: "Productos" },
            { to: "/nosotros", label: "Nosotros" },
            { to: "/carrito", label: "Carrito" }
        ];
    }

    if (ruta === "/carrito") {
        return [
            { to: "/productos", label: "Productos" },
            { to: "/nosotros", label: "Nosotros" },
            { to: "/contacto", label: "Contacto" }
        ];
    }

    return [
        { to: "/home", label: "Inicio" },
        { to: "/nosotros", label: "Nosotros" },
        { to: "/contacto", label: "Contacto" },
        { to: "/carrito", label: "Carrito" }
    ];
}

function Footer() {
    const ubicacion = useLocation();
    const enlaces = obtenerEnlaces(ubicacion.pathname);

    return (
        <footer className="border-top py-4 mt-2">
            <div className="container">
                <div className="row text-center text-md-start align-items-center">
                    <div className="col-md-4 mb-2 mb-md-0">
                        <p className="mb-0 text-secondary">© 2026 Athlex - Tienda Deportiva</p>
                    </div>
                    <div className="col-md-8 text-md-end">
                        {enlaces.map(function (enlace, indice) {
                            const clase =
                                "text-secondary text-decoration-none" +
                                (indice < enlaces.length - 1 ? " me-3" : "");
                            return (
                                <Link key={enlace.to} to={enlace.to} className={clase}>
                                    {enlace.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
