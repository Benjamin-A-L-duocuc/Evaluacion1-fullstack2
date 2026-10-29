import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import Boton from "./Boton";
import Precio from "./Precio";

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

                <Precio
                    as="p"
                    className="precio mb-3"
                    valor={precio}
                    anterior={
                        usarOferta && producto.precioOferta
                            ? producto.precio
                            : undefined
                    }
                    oferta={Boolean(usarOferta && producto.precioOferta)}
                />
                <div className="d-flex gap-2 flex-wrap">
                    <Boton
                        to={"/productos/" + producto.id}
                        variante="acento"
                        className="flex-fill"
                    >
                        Ver detalle
                    </Boton>
                    <Boton
                        type="button"
                        variante="outline"
                        className="flex-fill"
                        onClick={manejarAgregar}
                    >
                        {agregado ? "✓ Añadido" : "Añadir"}
                    </Boton>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
