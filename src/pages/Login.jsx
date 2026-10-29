import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../components/Boton";
import CampoFormulario from "../components/CampoFormulario";
import {
    validarRequerido,
    validarLargoMax,
    reglaClave,
    reglaRun,
    reglaCorreoRequerido,
    reglaNombre
} from "../utils/validaciones";

function Login({ iniciarSesion }) {
    const navegar = useNavigate();
    const [tab, setTab] = useState("ingresar");

    const [login, setLogin] = useState({ correo: "", clave: "" });
    const [erroresLogin, setErroresLogin] = useState({ correo: "", clave: "" });
    const [avisoLogin, setAvisoLogin] = useState("");

    const [registro, setRegistro] = useState({
        nombre: "",
        rut: "",
        correo: "",
        clave: "",
        claveConfirmar: "",
        direccion: ""
    });
    const [erroresRegistro, setErroresRegistro] = useState({
        nombre: "",
        rut: "",
        correo: "",
        clave: "",
        claveConfirmar: "",
        direccion: ""
    });
    const [avisoRegistro, setAvisoRegistro] = useState("");

    function reglaClaveConfirmar(valor) {
        if (!validarRequerido(valor)) return "Confirma tu contraseña.";
        if (valor !== registro.clave) return "Las contraseñas no coinciden.";
        return null;
    }

    function reglaDireccion(valor) {
        if (!validarRequerido(valor)) return "La dirección es requerida.";
        if (!validarLargoMax(valor, 200)) return "Máximo 200 caracteres.";
        return null;
    }

    function cambiarLogin(campo, valor) {
        setLogin({ ...login, [campo]: valor });
        const reglas = { correo: reglaCorreoRequerido, clave: reglaClave };
        const error = reglas[campo](valor);
        setErroresLogin({ ...erroresLogin, [campo]: error || "" });
        if (avisoLogin) setAvisoLogin("");
    }

    function enviarLogin(evento) {
        evento.preventDefault();

        const errorCorreo = reglaCorreoRequerido(login.correo);
        const errorClave = reglaClave(login.clave);
        setErroresLogin({ correo: errorCorreo || "", clave: errorClave || "" });

        if (errorCorreo || errorClave) return;

        const usuario = iniciarSesion(login.correo, login.clave);
        if (!usuario) {
            setAvisoLogin("Correo o contraseña incorrectos. Revisa tus datos.");
            return;
        }

        window.alert("Bienvenido, " + usuario.nombre + ".");
        navegar(usuario.tipo === "Administrador" ? "/admin" : "/home");
    }

    function cambiarRegistro(campo, valor) {
        setRegistro({ ...registro, [campo]: valor });

        const reglas = {
            nombre: reglaNombre,
            rut: reglaRun,
            correo: reglaCorreoRequerido,
            clave: reglaClave,
            claveConfirmar: reglaClaveConfirmar,
            direccion: reglaDireccion
        };

        const error = reglas[campo](valor);
        setErroresRegistro({ ...erroresRegistro, [campo]: error || "" });
    }

    function enviarRegistro(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            nombre: reglaNombre(registro.nombre) || "",
            rut: reglaRun(registro.rut) || "",
            correo: reglaCorreoRequerido(registro.correo) || "",
            clave: reglaClave(registro.clave) || "",
            claveConfirmar: reglaClaveConfirmar(registro.claveConfirmar) || "",
            direccion: reglaDireccion(registro.direccion) || ""
        };

        setErroresRegistro(nuevosErrores);

        const hayError = Object.keys(nuevosErrores).some(function (campo) {
            return nuevosErrores[campo] !== "";
        });
        if (hayError) return;

        setAvisoRegistro(
            "Solicitud de cuenta validada correctamente. (Demostración: los datos no se guardan.)"
        );
        setRegistro({
            nombre: "",
            rut: "",
            correo: "",
            clave: "",
            claveConfirmar: "",
            direccion: ""
        });
        setErroresRegistro({
            nombre: "",
            rut: "",
            correo: "",
            clave: "",
            claveConfirmar: "",
            direccion: ""
        });
    }

    return (
        <main className="pagina-login">
            <div className="tarjeta-login">
                <div className="text-center mb-4">
                    <p className="h3 fw-bold mb-1">🏃 Athlex</p>
                    <p className="text-secondary mb-0">Tienda Deportiva · Inicia sesión</p>
                </div>

                <ul className="nav nav-pills nav-fill gap-2 mb-4" id="tabsLogin" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={"nav-link" + (tab === "ingresar" ? " active" : "")}
                            id="tab-ingresar"
                            type="button"
                            role="tab"
                            aria-controls="panel-ingresar"
                            aria-selected={tab === "ingresar"}
                            onClick={function () { setTab("ingresar"); }}
                        >
                            Iniciar sesión
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={"nav-link" + (tab === "crear" ? " active" : "")}
                            id="tab-crear"
                            type="button"
                            role="tab"
                            aria-controls="panel-crear"
                            aria-selected={tab === "crear"}
                            onClick={function () { setTab("crear"); }}
                        >
                            Crear cuenta
                        </button>
                    </li>
                </ul>

                <div className="tab-content">
                    <div
                        className={"tab-pane fade" + (tab === "ingresar" ? " show active" : "")}
                        id="panel-ingresar"
                        role="tabpanel"
                        aria-labelledby="tab-ingresar"
                    >
                        <div
                            className={"alert alert-danger aviso-error" + (avisoLogin ? "" : " d-none")}
                            id="avisoLogin"
                            role="alert"
                        >
                            {avisoLogin}
                        </div>

                        <form id="formLogin" noValidate onSubmit={enviarLogin}>
                            <div className="mb-3">
                                <CampoFormulario
                                    type="email"
                                    label="Correo electrónico"
                                    id="correoLogin"
                                    name="correoLogin"
                                    placeholder="tucorreo@duoc.cl"
                                    maxLength="100"
                                    value={login.correo}
                                    error={erroresLogin.correo}
                                    errorId="errorCorreoLogin"
                                    onChange={function (valor) {
                                        cambiarLogin("correo", valor);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <CampoFormulario
                                    type="password"
                                    label="Contraseña"
                                    id="claveLogin"
                                    name="claveLogin"
                                    placeholder="••••••"
                                    maxLength="10"
                                    value={login.clave}
                                    error={erroresLogin.clave}
                                    errorId="errorClaveLogin"
                                    onChange={function (valor) {
                                        cambiarLogin("clave", valor);
                                    }}
                                />
                            </div>

                            <Boton type="submit" variante="acento" bloque>
                                Ingresar
                            </Boton>
                        </form>
                    </div>

                    <div
                        className={"tab-pane fade" + (tab === "crear" ? " show active" : "")}
                        id="panel-crear"
                        role="tabpanel"
                        aria-labelledby="tab-crear"
                    >
                        <form id="formRegistro" noValidate onSubmit={enviarRegistro}>
                            <div className="mb-3">
                                <CampoFormulario
                                    label="Nombre completo"
                                    id="nombreRegistro"
                                    name="nombreRegistro"
                                    placeholder="Tu nombre y apellido"
                                    maxLength="100"
                                    value={registro.nombre}
                                    error={erroresRegistro.nombre}
                                    errorId="errorNombreRegistro"
                                    onChange={function (valor) {
                                        cambiarRegistro("nombre", valor);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <CampoFormulario
                                    label="RUT"
                                    id="rutRegistro"
                                    name="rutRegistro"
                                    placeholder="12.345.678-5"
                                    maxLength="12"
                                    value={registro.rut}
                                    error={erroresRegistro.rut}
                                    errorId="errorRutRegistro"
                                    onChange={function (valor) {
                                        cambiarRegistro("rut", valor);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <CampoFormulario
                                    type="email"
                                    label="Correo electrónico"
                                    id="correoRegistro"
                                    name="correoRegistro"
                                    placeholder="tucorreo@duoc.cl"
                                    maxLength="100"
                                    value={registro.correo}
                                    error={erroresRegistro.correo}
                                    errorId="errorCorreoRegistro"
                                    onChange={function (valor) {
                                        cambiarRegistro("correo", valor);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <CampoFormulario
                                    type="password"
                                    label="Contraseña"
                                    id="claveRegistro"
                                    name="claveRegistro"
                                    placeholder="••••••"
                                    maxLength="10"
                                    value={registro.clave}
                                    error={erroresRegistro.clave}
                                    errorId="errorClaveRegistro"
                                    onChange={function (valor) {
                                        cambiarRegistro("clave", valor);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <CampoFormulario
                                    type="password"
                                    label="Confirmar contraseña"
                                    id="claveConfirmarRegistro"
                                    name="claveConfirmarRegistro"
                                    placeholder="••••••"
                                    maxLength="10"
                                    value={registro.claveConfirmar}
                                    error={erroresRegistro.claveConfirmar}
                                    errorId="errorClaveConfirmarRegistro"
                                    onChange={function (valor) {
                                        cambiarRegistro("claveConfirmar", valor);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <CampoFormulario
                                    label="Dirección"
                                    id="direccionRegistro"
                                    name="direccionRegistro"
                                    placeholder="Calle, número, comuna"
                                    maxLength="200"
                                    value={registro.direccion}
                                    error={erroresRegistro.direccion}
                                    errorId="errorDireccionRegistro"
                                    onChange={function (valor) {
                                        cambiarRegistro("direccion", valor);
                                    }}
                                />
                            </div>

                            <div
                                className={"alert aviso-ok" + (avisoRegistro ? "" : " d-none")}
                                id="avisoRegistro"
                            >
                                {avisoRegistro}
                            </div>

                            <Boton type="submit" variante="acento" bloque>
                                Crear cuenta
                            </Boton>
                            <p className="text-secondary small mt-2 mb-0 text-center">
                                Demostración visual: el registro valida los datos, pero la cuenta no se
                                crea en esta entrega.
                            </p>
                        </form>
                    </div>
                </div>

                <div className="aviso-login-rol mt-4">
                    <p className="text-secondary mb-1 small text-center">
                        Cuentas de demostración:
                    </p>
                    <div className="list-group list-group-flush small">
                        <div className="list-group-item d-flex justify-content-between">
                            <span>👤 Cliente</span>
                            <span>
                                <strong>cliente@duoc.cl</strong> / client1
                            </span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between">
                            <span>🛠 Administrador</span>
                            <span>
                                <strong>admin@duoc.cl</strong> / admin123
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;
