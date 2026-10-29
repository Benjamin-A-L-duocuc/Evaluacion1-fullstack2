import React from "react";

function EstadoVacio({
    icono,
    titulo,
    mensaje,
    accion,
    variante = "tarjeta",
    tituloAs: Titulo = "p",
    className = "",
    tituloClassName = "mb-1",
    mensajeClassName = "text-secondary small mb-0",
    accionClassName = ""
}) {
    if (variante === "texto") {
        return <p className={className || "text-secondary small mb-0"}>{mensaje}</p>;
    }

    return (
        <div className={"card p-4 text-center " + className}>
            {icono ? <div className="display-4 mb-2">{icono}</div> : null}
            {titulo ? <Titulo className={tituloClassName}>{titulo}</Titulo> : null}
            {mensaje ? <p className={mensajeClassName}>{mensaje}</p> : null}
            {accion ? (
                <div className={accionClassName || undefined}>{accion}</div>
            ) : null}
        </div>
    );
}

export default EstadoVacio;
