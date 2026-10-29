import React from "react";

function EncabezadoPanel({
    titulo,
    subtitulo,
    accion,
    tituloAs: Titulo = "h2",
    tituloClassName = "mb-1",
    subtituloClassName = "text-secondary mb-0",
    className = "",
    children
}) {
    return (
        <div className={"encabezado-panel " + className}>
            <div>
                {titulo ? <Titulo className={tituloClassName}>{titulo}</Titulo> : null}
                {subtitulo ? (
                    <p className={subtituloClassName}>{subtitulo}</p>
                ) : null}
                {children}
            </div>
            {accion}
        </div>
    );
}

export default EncabezadoPanel;
