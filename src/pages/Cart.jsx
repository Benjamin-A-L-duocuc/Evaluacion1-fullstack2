import React from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import QuantityStepper from "../components/QuantityStepper";
import { formatoCL } from "../utils/formato";
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
                <td className="clave-precio">{formatoCL(item.precioUnitario)}</td>
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
                <td className="clave-precio">
                    {formatoCL(item.cantidad * item.precioUnitario)}
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-acento"
                        title="Quitar este producto del carrito"
                        onClick={function () { onQuitar(indice); }}
                    >
                        🗑 Quitar
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <main className="py-5">
            <Container>
                <div className="encabezado-panel mb-4">
                    <h1 className="h2 mb-0">Tu carrito de compras</h1>
                    <Link className="btn btn-outline-acento" to="/productos">
                        ← Seguir comprando
                    </Link>
                </div>

                {carrito.length === 0 ? (
                    <div className="card p-4 text-center">
                        <p className="mb-1">Tu carrito está vacío.</p>
                        <p className="text-secondary small mb-3">
                            Agrega productos desde el catálogo para continuar.
                        </p>
                        <div>
                            <Link className="btn btn-acento" to="/productos">
                                Ir al catálogo
                            </Link>
                        </div>
                    </div>
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
                                Total: <span className="precio">{formatoCL(total)}</span>
                            </p>
                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-acento"
                                    onClick={onVaciar}
                                >
                                    Vaciar carrito
                                </button>
                                <Link to="/checkout" className="btn btn-acento">
                                    Finalizar compra
                                </Link>
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
