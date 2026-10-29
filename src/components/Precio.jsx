import React from "react";
import { formatoCL } from "../utils/formato";

function Precio({
    valor,
    anterior,
    oferta = false,
    as: Etiqueta = "span",
    className = "",
    children,
    ...rest
}) {
    const mostrarAnterior = anterior !== undefined && anterior !== null;

    return (
        <>
            {mostrarAnterior ? (
                <p className="text-secondary small mb-1">
                    <s>{formatoCL(anterior)}</s>
                    {oferta ? <span className="badge badge-stock ms-2">Oferta</span> : null}
                </p>
            ) : null}
            <Etiqueta className={className} {...rest}>
                {children}
                {formatoCL(valor)}
            </Etiqueta>
        </>
    );
}

export default Precio;
