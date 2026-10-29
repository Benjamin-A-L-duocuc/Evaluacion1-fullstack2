import React from "react";
import { Link } from "react-router-dom";

function Boton({
    children,
    variante = "acento",
    tamano,
    bloque = false,
    to,
    href,
    type = "button",
    className = "",
    ...rest
}) {
    const clases = [
        "btn",
        variante === "outline" ? "btn-outline-acento" : "btn-acento",
        tamano === "sm" ? "btn-sm" : null,
        tamano === "lg" ? "btn-lg" : null,
        bloque ? "w-100" : null,
        className
    ]
        .filter(Boolean)
        .join(" ");

    if (to) {
        return (
            <Link to={to} className={clases} {...rest}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={clases} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={clases} {...rest}>
            {children}
        </button>
    );
}

export default Boton;
