import React from "react";

function QuantityStepper({
    valor,
    onCambiar,
    maximo = 25,
    minimo = 1,
    ancho = "150px",
    pequeno = false,
    className = ""
}) {
    const claseBoton = "btn btn-outline-acento" + (pequeno ? " btn-sm" : "");

    function restar() {
        onCambiar(Math.max(minimo, Number(valor) - 1));
    }

    function sumar() {
        onCambiar(Math.min(maximo, Number(valor) + 1));
    }

    return (
        <div
            className={"input-group cantidad-stepper " + className}
            style={{ width: ancho }}
        >
            <button
                type="button"
                className={claseBoton}
                onClick={restar}
                aria-label="Quitar uno"
            >
                −
            </button>
            <input
                type="text"
                className="form-control text-center"
                value={valor}
                readOnly
                aria-label="Cantidad"
            />
            <button
                type="button"
                className={claseBoton}
                onClick={sumar}
                aria-label="Agregar uno"
            >
                +
            </button>
        </div>
    );
}

export default QuantityStepper;
