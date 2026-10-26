import React from "react";

function AlertMessage({ tipo = "ok", show = true, children }) {
    const claseAviso = tipo === "ok" ? "aviso-ok" : "aviso-error";
    return (
        <div className={"alert " + claseAviso + (show ? "" : " d-none")} role="alert">
            {children}
        </div>
    );
}

export default AlertMessage;
