import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Boton from "../components/Boton";
import CampoFormulario from "../components/CampoFormulario";
import EncabezadoPanel from "../components/EncabezadoPanel";
import EstadoVacio from "../components/EstadoVacio";
import Precio from "../components/Precio";
import { fechaHoy } from "../utils/formato";
import { calcularTotal } from "../data/carrito";
import {
    esVacio,
    reglaNombre,
    reglaCorreoRequerido,
    validarLargoMax
} from "../utils/validaciones";

function reglaTelefono(valor) {
    if (esVacio(valor)) return null;
    if (!/^[0-9+\s()-]{8,20}$/.test(String(valor).trim())) {
        return "Ingresa un teléfono válido (mínimo 8 dígitos).";
    }
    return null;
}

function reglaDireccion(valor, entrega) {
    if (entrega === "retiro") return null;
    if (esVacio(valor)) return "La dirección de envío es requerida.";
    if (!validarLargoMax(valor, 200)) return "Máximo 200 caracteres.";
    return null;
}

function reglaComuna(valor, entrega) {
    if (entrega === "retiro") return null;
    if (esVacio(valor)) return "La comuna es requerida.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    return null;
}

function reglaTarjeta(valor, pago) {
    if (pago !== "tarjeta") return null;
    if (esVacio(valor)) return "El número de tarjeta es requerido.";
    if (!/^[0-9]{16}$/.test(String(valor).replace(/\s/g, ""))) {
        return "Ingresa los 16 dígitos de la tarjeta.";
    }
    return null;
}

function reglaTitular(valor, pago) {
    if (pago !== "tarjeta") return null;
    if (esVacio(valor)) return "El nombre del titular es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    return null;
}

function reglaVencimiento(valor, pago) {
    if (pago !== "tarjeta") return null;
    if (esVacio(valor)) return "El vencimiento es requerido.";
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(String(valor).trim())) {
        return "Usa el formato MM/AA.";
    }
    return null;
}

function reglaCvv(valor, pago) {
    if (pago !== "tarjeta") return null;
    if (esVacio(valor)) return "El CVV es requerido.";
    if (!/^[0-9]{3,4}$/.test(String(valor).trim())) return "El CVV debe tener 3 o 4 dígitos.";
    return null;
}

function validarCampo(campo, valor, datos) {
    const reglas = {
        nombre: function (v) { return reglaNombre(v, "El nombre"); },
        correo: reglaCorreoRequerido,
        telefono: reglaTelefono,
        direccion: function (v) { return reglaDireccion(v, datos.entrega); },
        comuna: function (v) { return reglaComuna(v, datos.entrega); },
        tarjeta: function (v) { return reglaTarjeta(v, datos.pago); },
        titular: function (v) { return reglaTitular(v, datos.pago); },
        vencimiento: function (v) { return reglaVencimiento(v, datos.pago); },
        cvv: function (v) { return reglaCvv(v, datos.pago); }
    };
    if (!reglas[campo]) return null;
    return reglas[campo](valor) || "";
}

function Checkout({ sesion, carrito, productos, registrarCompra, vaciarCarrito }) {
    const navegar = useNavigate();

    const [formulario, setFormulario] = useState({
        nombre: sesion ? sesion.nombre : "",
        correo: sesion ? sesion.correo : "",
        telefono: "",
        direccion: sesion ? sesion.direccion || "" : "",
        comuna: "",
        entrega: "domicilio",
        pago: "tarjeta",
        tarjeta: "",
        titular: sesion ? sesion.nombre : "",
        vencimiento: "",
        cvv: ""
    });

    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        comuna: "",
        tarjeta: "",
        titular: "",
        vencimiento: "",
        cvv: ""
    });

    const items = carrito.map(function (item) {
        const producto = productos.find(function (p) { return p.id === item.productoId; });
        if (!producto) return null;
        return {
            productoId: producto.id,
            nombre: producto.nombre,
            codigo: producto.codigo,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            subtotal: item.cantidad * item.precioUnitario
        };
    }).filter(function (item) { return item !== null; });

    const subtotal = calcularTotal(carrito);
    const costoEnvio = formulario.entrega === "retiro" ? 0 : subtotal >= 50000 ? 0 : 4990;
    const total = subtotal + costoEnvio;

    function cambiarCampo(campo, valor) {
        let valorLimpio = valor;
        if (campo === "tarjeta") {
            valorLimpio = valor.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
        }

        const nuevoFormulario = { ...formulario, [campo]: valorLimpio };
        setFormulario(nuevoFormulario);

        const nuevosErrores = { ...errores };
        if (nuevosErrores[campo]) {
            nuevosErrores[campo] = validarCampo(campo, valorLimpio, nuevoFormulario);
        }
        if (campo === "entrega") {
            nuevosErrores.direccion = "";
            nuevosErrores.comuna = "";
        }
        if (campo === "pago") {
            nuevosErrores.tarjeta = "";
            nuevosErrores.titular = "";
            nuevosErrores.vencimiento = "";
            nuevosErrores.cvv = "";
        }
        setErrores(nuevosErrores);
    }

    function enviarPedido(evento) {
        evento.preventDefault();

        const nuevosErrores = {};
        Object.keys(errores).forEach(function (campo) {
            nuevosErrores[campo] = validarCampo(campo, formulario[campo], formulario);
        });
        setErrores(nuevosErrores);

        const hayError = Object.keys(nuevosErrores).some(function (campo) {
            return nuevosErrores[campo] !== "";
        });
        if (hayError) return;

        if (items.length === 0) {
            navegar("/carrito");
            return;
        }

        const numeroPedido = "A-" + Math.floor(100000 + Math.random() * 900000);
        const fecha = fechaHoy();
        const numeroTarjeta = formulario.tarjeta.replace(/\s/g, "");
        const pagoRechazado =
            formulario.pago === "tarjeta" && numeroTarjeta === "4000000000000002";

        if (pagoRechazado) {
            navegar("/compra-fallida", {
                state: {
                    numeroPedido: numeroPedido,
                    motivo:
                        "El banco emisor rechazó el pago. Revisa los datos de tu tarjeta o intenta con otro medio de pago.",
                    total: total
                }
            });
            return;
        }

        items.forEach(function (item) {
            registrarCompra({
                fecha: fecha,
                cliente: formulario.correo,
                producto: item.nombre,
                cantidad: item.cantidad,
                total: item.subtotal,
                estado: "Pendiente"
            });
        });

        const resumen = {
            numeroPedido: numeroPedido,
            fecha: fecha,
            cliente: formulario.nombre,
            correo: formulario.correo,
            telefono: formulario.telefono,
            direccion:
                formulario.entrega === "retiro"
                    ? "Retiro en tienda: Av. Athletic 1234, Santiago"
                    : formulario.direccion + ", " + formulario.comuna,
            entrega: formulario.entrega,
            pago: formulario.pago,
            items: items,
            subtotal: subtotal,
            envio: costoEnvio,
            total: total
        };

        vaciarCarrito();
        navegar("/compra-exitosa", { state: resumen });
    }

    if (items.length === 0) {
        return (
            <main className="py-5">
                <Container>
                    <EstadoVacio
                        titulo="No hay productos para pagar"
                        tituloAs="h1"
                        tituloClassName="h3 mb-2"
                        mensaje="Agrega productos al carrito antes de continuar con el checkout."
                        mensajeClassName="text-secondary mb-3"
                        accion={<Boton to="/productos">Ir al catálogo</Boton>}
                    />
                </Container>
            </main>
        );
    }

    return (
        <main className="py-5">
            <Container>
                <EncabezadoPanel
                    className="mb-4"
                    titulo="Finalizar compra"
                    tituloAs="h1"
                    tituloClassName="h2 mb-1"
                    subtitulo="Completa tus datos de envío y pago para generar el pedido."
                    accion={
                        <Boton variante="outline" to="/carrito">
                            ← Volver al carrito
                        </Boton>
                    }
                />

                <form id="formCheckout" noValidate onSubmit={enviarPedido}>
                    <Row className="g-4">
                        <Col lg={7}>
                            <Card className="p-4 mb-4">
                                <h2 className="h5 mb-3">Datos del cliente</h2>

                                <Row>
                                    <Col md={6} className="mb-3">
                                        <CampoFormulario
                                            label="Nombre completo"
                                            id="nombreCheckout"
                                            maxLength="100"
                                            value={formulario.nombre}
                                            error={errores.nombre}
                                            onChange={function (valor) {
                                                cambiarCampo("nombre", valor);
                                            }}
                                        />
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <CampoFormulario
                                            type="email"
                                            label="Correo electrónico"
                                            id="correoCheckout"
                                            maxLength="100"
                                            value={formulario.correo}
                                            error={errores.correo}
                                            onChange={function (valor) {
                                                cambiarCampo("correo", valor);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <div className="mb-3">
                                    <CampoFormulario
                                        type="tel"
                                        label="Teléfono (opcional)"
                                        id="telefonoCheckout"
                                        maxLength="20"
                                        placeholder="+56 9 1234 5678"
                                        value={formulario.telefono}
                                        error={errores.telefono}
                                        onChange={function (valor) {
                                            cambiarCampo("telefono", valor);
                                        }}
                                    />
                                </div>

                                <h2 className="h5 mb-3 mt-4">Entrega</h2>

                                <div className="mb-3">
                                    <label className="form-label d-block">Método de entrega</label>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="entrega"
                                            id="entregaDomicilio"
                                            checked={formulario.entrega === "domicilio"}
                                            onChange={function () {
                                                cambiarCampo("entrega", "domicilio");
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="entregaDomicilio">
                                            Envío a domicilio
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="entrega"
                                            id="entregaRetiro"
                                            checked={formulario.entrega === "retiro"}
                                            onChange={function () {
                                                cambiarCampo("entrega", "retiro");
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="entregaRetiro">
                                            Retiro en tienda (gratis)
                                        </label>
                                    </div>
                                </div>

                                {formulario.entrega === "domicilio" ? (
                                    <Row>
                                        <Col md={7} className="mb-3">
                                            <CampoFormulario
                                                label="Dirección"
                                                id="direccionCheckout"
                                                maxLength="200"
                                                placeholder="Calle, número, departamento"
                                                value={formulario.direccion}
                                                error={errores.direccion}
                                                onChange={function (valor) {
                                                    cambiarCampo("direccion", valor);
                                                }}
                                            />
                                        </Col>
                                        <Col md={5} className="mb-3">
                                            <CampoFormulario
                                                label="Comuna"
                                                id="comunaCheckout"
                                                maxLength="100"
                                                placeholder="Santiago"
                                                value={formulario.comuna}
                                                error={errores.comuna}
                                                onChange={function (valor) {
                                                    cambiarCampo("comuna", valor);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                ) : (
                                    <p className="text-secondary small">
                                        Retira tu pedido en Av. Athletic 1234, Santiago, de lunes a
                                        sábado entre 10:00 y 19:00 hrs.
                                    </p>
                                )}
                            </Card>

                            <Card className="p-4">
                                <h2 className="h5 mb-3">Pago</h2>

                                <div className="mb-3">
                                    <label className="form-label d-block">Medio de pago</label>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="pago"
                                            id="pagoTarjeta"
                                            checked={formulario.pago === "tarjeta"}
                                            onChange={function () {
                                                cambiarCampo("pago", "tarjeta");
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="pagoTarjeta">
                                            Tarjeta de crédito o débito
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="pago"
                                            id="pagoTransferencia"
                                            checked={formulario.pago === "transferencia"}
                                            onChange={function () {
                                                cambiarCampo("pago", "transferencia");
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="pagoTransferencia"
                                        >
                                            Transferencia bancaria
                                        </label>
                                    </div>
                                </div>

                                {formulario.pago === "tarjeta" ? (
                                    <>
                                        <div className="mb-3">
                                            <CampoFormulario
                                                label="Número de tarjeta"
                                                id="tarjetaCheckout"
                                                inputMode="numeric"
                                                maxLength="19"
                                                placeholder="1234 5678 9012 3456"
                                                value={formulario.tarjeta}
                                                error={errores.tarjeta}
                                                onChange={function (valor) {
                                                    cambiarCampo("tarjeta", valor);
                                                }}
                                            />
                                        </div>

                                        <Row>
                                            <Col md={6} className="mb-3">
                                                <CampoFormulario
                                                    label="Nombre del titular"
                                                    id="titularCheckout"
                                                    maxLength="100"
                                                    value={formulario.titular}
                                                    error={errores.titular}
                                                    onChange={function (valor) {
                                                        cambiarCampo("titular", valor);
                                                    }}
                                                />
                                            </Col>
                                            <Col md={3} className="mb-3">
                                                <CampoFormulario
                                                    label="Vencimiento"
                                                    id="vencimientoCheckout"
                                                    maxLength="5"
                                                    placeholder="MM/AA"
                                                    value={formulario.vencimiento}
                                                    error={errores.vencimiento}
                                                    onChange={function (valor) {
                                                        cambiarCampo("vencimiento", valor);
                                                    }}
                                                />
                                            </Col>
                                            <Col md={3} className="mb-3">
                                                <CampoFormulario
                                                    label="CVV"
                                                    id="cvvCheckout"
                                                    inputMode="numeric"
                                                    maxLength="4"
                                                    placeholder="123"
                                                    value={formulario.cvv}
                                                    error={errores.cvv}
                                                    onChange={function (valor) {
                                                        cambiarCampo("cvv", valor);
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <p className="text-secondary small mb-0">
                                            Pago de demostración. Para simular un pago rechazado usa
                                            la tarjeta <strong>4000 0000 0000 0002</strong>.
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-secondary small mb-0">
                                        Recibirás por correo los datos bancarios para realizar la
                                        transferencia. El pedido quedará pendiente hasta confirmar
                                        el pago.
                                    </p>
                                )}
                            </Card>
                        </Col>

                        <Col lg={5}>
                            <Card className="p-4">
                                <h2 className="h5 mb-3">Resumen del pedido</h2>

                                <ul className="list-unstyled mb-3">
                                    {items.map(function (item) {
                                        return (
                                            <li
                                                key={item.productoId + "-" + item.precioUnitario}
                                                className="d-flex justify-content-between gap-3 mb-2"
                                            >
                                                <span>
                                                    {item.nombre}
                                                    <small className="text-secondary d-block">
                                                        {item.cantidad} ×{" "}
                                                        <Precio valor={item.precioUnitario} />
                                                    </small>
                                                </span>
                                                <Precio as="strong" valor={item.subtotal} />
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-secondary">Subtotal</span>
                                    <Precio valor={subtotal} />
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-secondary">Envío</span>
                                    {costoEnvio === 0 ? (
                                        <span>Gratis</span>
                                    ) : (
                                        <Precio valor={costoEnvio} />
                                    )}
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="fs-5">Total</span>
                                    <Precio className="precio" valor={total} />
                                </div>

                                <Boton type="submit" variante="acento" bloque tamano="lg">
                                    Confirmar y pagar
                                </Boton>
                                <p className="text-secondary small mt-3 mb-0">
                                    Al confirmar aceptas los términos de la compra de
                                    demostración. No se realizará ningún cobro real.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </form>
            </Container>
        </main>
    );
}

export default Checkout;
