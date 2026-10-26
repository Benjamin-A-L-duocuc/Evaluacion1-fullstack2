import React from "react";
import NavbarCliente from "./NavbarCliente";
import Footer from "./Footer";

function Layout({ sesion, onCerrarSesion, children }) {
    return (
        <>
            <NavbarCliente sesion={sesion} onCerrarSesion={onCerrarSesion} />
            {children}
            <Footer />
        </>
    );
}

export default Layout;
