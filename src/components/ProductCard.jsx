import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import { formatoCL } from "../utils/formato";

function ProductCard({
    producto,
    onAgregar,
    usarOferta = false,
    tituloEtiqueta = "h3",
    mostrarDescripcion = true,
    descripcion
}) {
    const [agregado, setAgregado] = useState(false);
    const Titulo = tituloEtiqueta;
    const precio = usarOferta && producto.precioOferta ? producto.precioOferta : producto.precio;

    function manejarAgregar() {
        onAgregar(producto.id, 1, precio);
        setAgregado(true);
        window.setTimeout(function () {
            setAgregado(false);
        }, 1800);
    }

    return (
        <Card className="card-producto bg-dark text-white h-100">
            <Card.Img
                variant="top"
                src={producto.imagenes[0].src}
                alt={producto.imagenes[0].alt}
                className="img-producto"
            />
            <Card.Body>
                <Badge className="badge-stock mb-2">{producto.categoria}</Badge>
                <Titulo className="card-title h5">{producto.nombre}</Titulo>
                {mostrarDescripcion ? (
                    <p className="text-secondary small">
                        {descripcion || producto.descripcionCorta}
                    </p>
                ) : null}

                {usarOferta && producto.precioOferta ? (
                    <p className="text-secondary small mb-1">
                        <s>{formatoCL(producto.precio)}</s>
                        <Badge className="badge-stock ms-2">Oferta</Badge>
                    </p>
                ) : null}

                <p className="precio mb-3">{formatoCL(precio)}</p>
                <div className="d-flex gap-2 flex-wrap">
                    <Link
                        to={"/productos/" + producto.id}
                        className="btn btn-acento flex-fill"
                    >
                        Ver detalle
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-acento flex-fill"
                        onClick={manejarAgregar}
                    >
                        {agregado ? "✓ Añadido" : "Añadir"}
                    </button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
