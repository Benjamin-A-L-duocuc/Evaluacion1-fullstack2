import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function AdminLayout({ sesion, onCerrarSesion, active, children }) {
    const navegar = useNavigate();

    if (!sesion || sesion.tipo !== "Administrador") {
        return <Navigate to="/" replace />;
    }

    function manejarCerrarSesion(evento) {
        evento.preventDefault();
        if (window.confirm("¿Deseas cerrar tu sesión?")) {
            onCerrarSesion();
            navegar("/");
        }
    }

    return (
        <div className="container py-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-3 mb-4 px-3">
                <Link className="navbar-brand fw-bold" to="/admin">
                    🏃 Athlex <small className="text-secondary fw-normal">· Admin</small>
                </Link>
                <div className="ms-auto d-flex align-items-center gap-2">
                    <span className="text-secondary small d-none d-md-inline">
                        {sesion ? "Hola, " + sesion.nombre : ""}
                    </span>
                </div>
            </nav>

            <div className="row g-4">
                <div className="col-md-3">
                    <div className="admin-menu">
                        <p className="menu-titulo mb-0">Gestión</p>
                        <Link className={active === "inicio" ? "activo" : ""} to="/admin">
                            Inicio
                        </Link>
                        <Link
                            className={active === "productos" ? "activo" : ""}
                            to="/admin/productos"
                        >
                            Productos
                        </Link>
                        <Link
                            className={active === "ventas" ? "activo" : ""}
                            to="/admin/ventas"
                        >
                            Ventas
                        </Link>
                        <p className="menu-titulo mb-0 mt-3">Cuenta</p>
                        <a href="/" onClick={manejarCerrarSesion}>
                            Cerrar sesión
                        </a>
                    </div>
                </div>

                <div className="col-md-9">{children}</div>
            </div>
        </div>
    );
}

export default AdminLayout;
