import React from "react";
import { Container, Table } from "react-bootstrap";
import Boton from "../components/Boton";
import EncabezadoPanel from "../components/EncabezadoPanel";
import EstadoVacio from "../components/EstadoVacio";
import Precio from "../components/Precio";
import QuantityStepper from "../components/QuantityStepper";
import { calcularTotal } from "../data/carrito";

function Cart({ carrito, productos, onCantidad, onQuitar, onVaciar }) {
    const total = calcularTotal(carrito);

    const filas = carrito.map(function (item, indice) {
        const producto = productos.find(function (p) {
            return p.id === item.productoId;
        });

        if (!producto) {
            return (
                <tr key={indice}>
                    <td colSpan="6" className="text-secondary small">
                        Producto no disponible.
                    </td>
                </tr>
            );
        }

        return (
            <tr key={indice}>
                <td>
                    <div className="d-flex align-items-center gap-2">
                        <img
                            src={producto.imagenes[0].src}
                            className="rounded"
                            width="48"
                            height="48"
                            style={{ objectFit: "cover" }}
                            alt={producto.nombre}
                        />
                        {producto.nombre}
                    </div>
                </td>
                <td>
                    <small className="text-secondary">
                        {producto.categoria} · Código {producto.codigo}
                    </small>
                </td>
                <Precio
                    as="td"
                    className="clave-precio"
                    valor={item.precioUnitario}
                />
                <td>
                    <QuantityStepper
                        valor={item.cantidad}
                        onCambiar={function (cantidad) { onCantidad(indice, cantidad); }}
                        maximo={producto.stock}
                        ancho="130px"
                        pequeno={true}
                        className="cantidad-stepper-cart"
                    />
                </td>
                <Precio
                    as="td"
                    className="clave-precio"
                    valor={item.cantidad * item.precioUnitario}
                />
                <td>
                    <Boton
                        type="button"
                        variante="outline"
                        tamano="sm"
                        title="Quitar este producto del carrito"
                        onClick={function () {
                            onQuitar(indice);
                        }}
                    >
                        🗑 Quitar
                    </Boton>
                </td>
            </tr>
        );
    });

    return (
        <main className="py-5">
            <Container>
                <EncabezadoPanel
                    className="mb-4"
                    titulo="Tu carrito de compras"
                    tituloAs="h1"
                    tituloClassName="h2 mb-0"
                    accion={
                        <Boton variante="outline" to="/productos">
                            ← Seguir comprando
                        </Boton>
                    }
                />

                {carrito.length === 0 ? (
                    <EstadoVacio
                        titulo="Tu carrito está vacío."
                        mensaje="Agrega productos desde el catálogo para continuar."
                        mensajeClassName="text-secondary small mb-3"
                        accion={<Boton to="/productos">Ir al catálogo</Boton>}
                    />
                ) : (
                    <>
                        <div className="table-responsive">
                            <Table className="tabla-admin align-middle">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Detalle</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>{filas}</tbody>
                            </Table>
                        </div>

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mt-4 gap-3">
                            <p className="mb-0 fs-4">
                                <Precio as="span" className="precio" valor={total}>
                                    Total:{" "}
                                </Precio>
                            </p>
                            <div className="d-flex gap-2">
                                <Boton
                                    type="button"
                                    variante="outline"
                                    onClick={onVaciar}
                                >
                                    Vaciar carrito
                                </Boton>
                                <Boton to="/checkout">Finalizar compra</Boton>
                            </div>
                        </div>

                        <p className="text-secondary small mt-3">
                            El carrito se guarda en tu navegador. El proceso de pago es una
                            demostración.
                        </p>
                    </>
                )}
            </Container>
        </main>
    );
}

export default Cart;
