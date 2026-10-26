import React from "react";
import { Link } from "react-router-dom";

function SummaryCard({ numero, etiqueta, to }) {
    const contenido = (
        <div className="tabla-resumen">
            <p className="numero mb-1">{numero}</p>
            <p className="etiqueta mb-0">{etiqueta}</p>
        </div>
    );

    if (to) {
        return (
            <Link to={to} className="text-decoration-none">
                {contenido}
            </Link>
        );
    }

    return contenido;
}

export default SummaryCard;
