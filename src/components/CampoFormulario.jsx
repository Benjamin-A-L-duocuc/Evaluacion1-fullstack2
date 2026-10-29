import React from "react";

function ErrorCampo({ id, error }) {
    return (
        <div className={"error-msj" + (error ? " visible" : "")} id={id}>
            {error}
        </div>
    );
}

function CampoFormulario({
    as = "input",
    label,
    id,
    name,
    type = "text",
    value,
    onChange,
    error,
    errorId,
    placeholder,
    maxLength,
    options,
    rows,
    inputMode,
    autoComplete,
    estadoVisual = true,
    contador = false,
    contadorId,
    placeholderOption,
    className = "",
    ...rest
}) {
    const base = as === "select" ? "form-select" : "form-control";
    const estado = !estadoVisual
        ? ""
        : error
          ? " input-error"
          : value
            ? " input-valido"
            : "";
    const clases = base + estado + (className ? " " + className : "");
    const tieneError = error !== undefined;
    const errorVisible = Boolean(error);

    function manejarCambio(evento) {
        if (onChange) onChange(evento.target.value);
    }

    let control;

    if (as === "select") {
        control = (
            <select
                className={clases}
                id={id}
                name={name}
                value={value}
                onChange={manejarCambio}
                aria-invalid={errorVisible || undefined}
                {...rest}
            >
                {placeholderOption ? (
                    <option value="">{placeholderOption}</option>
                ) : null}
                {(options || []).map(function (opcion) {
                    const valor = typeof opcion === "string" ? opcion : opcion.value;
                    const etiqueta = typeof opcion === "string" ? opcion : opcion.label;
                    return (
                        <option key={valor} value={valor}>
                            {etiqueta}
                        </option>
                    );
                })}
            </select>
        );
    } else if (as === "textarea") {
        control = (
            <textarea
                className={clases}
                id={id}
                name={name}
                rows={rows}
                maxLength={maxLength}
                placeholder={placeholder}
                value={value}
                onChange={manejarCambio}
                aria-invalid={errorVisible || undefined}
                {...rest}
            />
        );
    } else {
        control = (
            <input
                className={clases}
                id={id}
                name={name}
                type={type}
                maxLength={maxLength}
                placeholder={placeholder}
                inputMode={inputMode}
                autoComplete={autoComplete}
                value={value}
                onChange={manejarCambio}
                aria-invalid={errorVisible || undefined}
                {...rest}
            />
        );
    }

    return (
        <>
            {label ? (
                <label className="form-label" htmlFor={id}>
                    {label}
                </label>
            ) : null}
            {control}
            {contador ? (
                <div className="d-flex justify-content-between">
                    {tieneError ? <ErrorCampo id={errorId} error={error} /> : null}
                    <small className="text-secondary" id={contadorId}>
                        {String(value || "").length} / {maxLength}
                    </small>
                </div>
            ) : tieneError ? (
                <ErrorCampo id={errorId} error={error} />
            ) : null}
        </>
    );
}

export default CampoFormulario;
