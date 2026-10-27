import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
    esVacio,
    validarRequerido,
    validarLargoMax,
    validarCorreoDominio
} from "../utils/validaciones";

function claseCampo(valor, error) {
    if (error) return "form-control input-error";
    if (valor) return "form-control input-valido";
    return "form-control";
}

function reglaNombreContacto(valor) {
    if (!validarRequerido(valor)) return "El nombre es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    return null;
}

function reglaCorreoContacto(valor) {
    if (esVacio(valor)) return null;
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    if (!validarCorreoDominio(valor)) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return null;
}

function reglaComentarioContacto(valor) {
    if (!validarRequerido(valor)) return "El comentario es requerido.";
    if (!validarLargoMax(valor, 500)) return "Máximo 500 caracteres.";
    return null;
}

function Contact() {
    const [formulario, setFormulario] = useState({
        nombre: "",
        correo: "",
        comentario: ""
    });
    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        comentario: ""
    });
    const [aviso, setAviso] = useState("");

    function cambiarCampo(campo, valor) {
        setFormulario({ ...formulario, [campo]: valor });

        const reglas = {
            nombre: reglaNombreContacto,
            correo: reglaCorreoContacto,
            comentario: reglaComentarioContacto
        };

        setErrores({ ...errores, [campo]: reglas[campo](valor) || "" });
        if (aviso) setAviso("");
    }

    function enviarFormulario(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            nombre: reglaNombreContacto(formulario.nombre) || "",
            correo: reglaCorreoContacto(formulario.correo) || "",
            comentario: reglaComentarioContacto(formulario.comentario) || ""
        };

        setErrores(nuevosErrores);

        const hayError = Object.keys(nuevosErrores).some(function (campo) {
            return nuevosErrores[campo] !== "";
        });
        if (hayError) return;

        setAviso("¡Mensaje enviado! Te contactaremos pronto al correo indicado.");
        setFormulario({ nombre: "", correo: "", comentario: "" });
        setErrores({ nombre: "", correo: "", comentario: "" });
    }

    return (
        <main className="py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <h1 className="h3 text-center mb-4">Contáctanos</h1>
                        <p className="text-secondary text-center mb-4">
                            ¿Dudas, sugerencias o pedidos especiales? Escríbenos y te
                            responderemos a la brevedad.
                        </p>

                        <Card className="p-4">
                            <form id="formContacto" noValidate onSubmit={enviarFormulario}>
                                <div className="mb-3">
                                    <label htmlFor="nombreContacto" className="form-label">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className={claseCampo(formulario.nombre, errores.nombre)}
                                        id="nombreContacto"
                                        maxLength="100"
                                        placeholder="Tu nombre"
                                        value={formulario.nombre}
                                        onChange={function (e) {
                                            cambiarCampo("nombre", e.target.value);
                                        }}
                                    />
                                    <div
                                        className={"error-msj" + (errores.nombre ? " visible" : "")}
                                        id="errorNombreContacto"
                                    >
                                        {errores.nombre}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="correoContacto" className="form-label">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className={claseCampo(formulario.correo, errores.correo)}
                                        id="correoContacto"
                                        maxLength="100"
                                        placeholder="tucorreo@duoc.cl"
                                        value={formulario.correo}
                                        onChange={function (e) {
                                            cambiarCampo("correo", e.target.value);
                                        }}
                                    />
                                    <div
                                        className={"error-msj" + (errores.correo ? " visible" : "")}
                                        id="errorCorreoContacto"
                                    >
                                        {errores.correo}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="comentarioContacto" className="form-label">
                                        Comentario
                                    </label>
                                    <textarea
                                        className={claseCampo(formulario.comentario, errores.comentario)}
                                        id="comentarioContacto"
                                        rows="5"
                                        maxLength="500"
                                        placeholder="Cuéntanos en qué podemos ayudarte"
                                        value={formulario.comentario}
                                        onChange={function (e) {
                                            cambiarCampo("comentario", e.target.value);
                                        }}
                                    />
                                    <div className="d-flex justify-content-between">
                                        <div
                                            className={
                                                "error-msj" +
                                                (errores.comentario ? " visible" : "")
                                            }
                                            id="errorComentarioContacto"
                                        >
                                            {errores.comentario}
                                        </div>
                                        <small className="text-secondary" id="contadorComentario">
                                            {formulario.comentario.length} / 500
                                        </small>
                                    </div>
                                </div>

                                <div
                                    className={"alert aviso-ok" + (aviso ? "" : " d-none")}
                                    id="avisoContacto"
                                >
                                    {aviso}
                                </div>

                                <button type="submit" className="btn btn-acento w-100">
                                    Enviar mensaje
                                </button>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Contact;
