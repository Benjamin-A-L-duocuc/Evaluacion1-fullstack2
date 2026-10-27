import React, { useState } from "react";
import { Card, Table, Modal, Row, Col } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";
import { formatoCL } from "../../utils/formato";
import {
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    reiniciarProductos
} from "../../data/productos";
import {
    validarRequerido,
    validarRangoLargo,
    validarLargoMax,
    validarPrecio,
    validarEnteroNoNegativo
} from "../../utils/validaciones";

const FORM_VACIO = {
    codigo: "",
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    stock: "",
    stockCritico: ""
};

function reglaCodigo(valor) {
    if (!validarRequerido(valor)) return "El código es requerido.";
    if (!validarRangoLargo(valor, 3, 20)) return "El código debe tener entre 3 y 20 caracteres.";
    return null;
}

function reglaNombre(valor) {
    if (!validarRequerido(valor)) return "El nombre es requerido.";
    if (!validarLargoMax(valor, 100)) return "Máximo 100 caracteres.";
    return null;
}

function reglaCategoria(valor) {
    if (!validarRequerido(valor)) return "Selecciona una categoría.";
    return null;
}

function reglaPrecio(valor) {
    if (!validarRequerido(valor)) return "El precio es requerido.";
    if (!validarPrecio(valor)) return "El precio debe ser un número mayor o igual a 0.";
    return null;
}

function reglaStock(valor) {
    if (!validarRequerido(valor)) return "El stock es requerido.";
    if (!validarEnteroNoNegativo(valor)) return "El stock debe ser un entero mayor o igual a 0.";
    return null;
}

function reglaStockCritico(valor) {
    if (String(valor).trim() === "") return null;
    if (!validarEnteroNoNegativo(valor)) {
        return "El stock crítico debe ser un entero mayor o igual a 0.";
    }
    return null;
}

const REGLAS = {
    codigo: reglaCodigo,
    nombre: reglaNombre,
    categoria: reglaCategoria,
    precio: reglaPrecio,
    stock: reglaStock,
    stockCritico: reglaStockCritico
};

function validarFormulario(datos) {
    const errores = {};
    Object.keys(REGLAS).forEach(function (campo) {
        errores[campo] = REGLAS[campo](datos[campo]) || "";
    });
    return errores;
}

function hayErrores(errores) {
    return Object.keys(errores).some(function (campo) {
        return errores[campo] !== "";
    });
}

function claseCampo(valor, error, esSelect) {
    const base = esSelect ? "form-select" : "form-control";
    if (error) return base + " input-error";
    if (valor) return base + " input-valido";
    return base;
}

function AdminProducts({ productos, recargarProductos }) {
    const [nuevo, setNuevo] = useState({ ...FORM_VACIO });
    const [erroresNuevo, setErroresNuevo] = useState({});
    const [aviso, setAviso] = useState("");

    const [productoEditar, setProductoEditar] = useState(null);
    const [editar, setEditar] = useState({ ...FORM_VACIO });
    const [erroresEditar, setErroresEditar] = useState({});

    function cambiarNuevo(campo, valor) {
        const datos = { ...nuevo, [campo]: valor };
        setNuevo(datos);
        if (erroresNuevo[campo]) {
            setErroresNuevo({ ...erroresNuevo, [campo]: REGLAS[campo](valor) || "" });
        }
        if (aviso) setAviso("");
    }

    function enviarNuevo(evento) {
        evento.preventDefault();
        const errores = validarFormulario(nuevo);
        setErroresNuevo(errores);
        if (hayErrores(errores)) return;

        crearProducto(nuevo);
        recargarProductos();
        setNuevo({ ...FORM_VACIO });
        setErroresNuevo({});
        setAviso("Producto agregado correctamente al catálogo.");
    }

    function limpiarNuevo() {
        setNuevo({ ...FORM_VACIO });
        setErroresNuevo({});
        setAviso("");
    }

    function abrirEditar(producto) {
        setProductoEditar(producto);
        setEditar({
            codigo: producto.codigo,
            nombre: producto.nombre,
            categoria: producto.categoria,
            descripcion: producto.descripcion || "",
            precio: String(producto.precio),
            stock: String(producto.stock),
            stockCritico: String(producto.stockCritico || "")
        });
        setErroresEditar({});
    }

    function cerrarEditar() {
        setProductoEditar(null);
        setEditar({ ...FORM_VACIO });
        setErroresEditar({});
    }

    function cambiarEditar(campo, valor) {
        const datos = { ...editar, [campo]: valor };
        setEditar(datos);
        if (erroresEditar[campo]) {
            setErroresEditar({ ...erroresEditar, [campo]: REGLAS[campo](valor) || "" });
        }
    }

    function guardarEditar(evento) {
        evento.preventDefault();
        const errores = validarFormulario(editar);
        setErroresEditar(errores);
        if (hayErrores(errores)) return;

        actualizarProducto(productoEditar.id, {
            codigo: editar.codigo,
            nombre: editar.nombre,
            categoria: editar.categoria,
            descripcion: editar.descripcion,
            descripcionCorta: editar.descripcion || "Producto Athlex.",
            precio: Number(editar.precio),
            stock: Number(editar.stock),
            stockCritico: Number(editar.stockCritico || 0)
        });
        recargarProductos();
        setAviso("Producto actualizado correctamente.");
        cerrarEditar();
    }

    function eliminar(producto) {
        if (!window.confirm("¿Eliminar el producto " + producto.nombre + "?")) return;
        eliminarProducto(producto.id);
        recargarProductos();
        setAviso("Producto eliminado del catálogo.");
    }

    function restaurarCatalogo() {
        if (!window.confirm("¿Restaurar el catálogo original de demostración?")) return;
        reiniciarProductos();
        recargarProductos();
        setAviso("Catálogo restaurado con los productos de demostración.");
    }

    return (
        <>
            <div className="encabezado-panel mb-4">
                <div>
                    <h1 className="h3 mb-1">Gestión de productos</h1>
                    <p className="text-secondary mb-0">
                        Administra los productos disponibles en tu sitio.
                    </p>
                </div>
                <button
                    type="button"
                    className="btn btn-outline-acento"
                    onClick={restaurarCatalogo}
                >
                    Restaurar catálogo
                </button>
            </div>

            <AlertMessage show={Boolean(aviso)}>{aviso}</AlertMessage>

            <Card className="p-3 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="h5 mb-0">Productos en el catálogo</h2>
                    <span className="text-secondary small">
                        {productos.length} productos
                    </span>
                </div>
                <div className="table-responsive">
                    <Table className="tabla-admin align-middle">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(function (producto) {
                                const critico =
                                    Number(producto.stock) <= Number(producto.stockCritico || 0);
                                return (
                                    <tr key={producto.id}>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.categoria}</td>
                                        <td className="clave-precio">
                                            {formatoCL(producto.precio)}
                                        </td>
                                        <td>
                                            {critico ? (
                                                <span className="alerta-stock">
                                                    {producto.stock}
                                                </span>
                                            ) : (
                                                producto.stock
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-acento me-2"
                                                title="Editar"
                                                onClick={function () { abrirEditar(producto); }}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-acento"
                                                title="Eliminar"
                                                onClick={function () { eliminar(producto); }}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                {productos.length === 0 ? (
                    <p className="text-secondary small mb-0">
                        No hay productos. Usa el formulario de abajo o restaura el catálogo.
                    </p>
                ) : null}
            </Card>

            <Card className="p-4">
                <h2 className="h5 mb-3">Agregar producto al catálogo</h2>

                <form id="formProducto" noValidate onSubmit={enviarNuevo}>
                    <Row>
                        <Col md={4} className="mb-3">
                            <label className="form-label" htmlFor="codigoProducto">
                                Código del producto
                            </label>
                            <input
                                type="text"
                                className={claseCampo(nuevo.codigo, erroresNuevo.codigo)}
                                id="codigoProducto"
                                maxLength="20"
                                placeholder="ZAP-RUN-01"
                                value={nuevo.codigo}
                                onChange={function (e) {
                                    cambiarNuevo("codigo", e.target.value);
                                }}
                            />
                            <div
                                className={
                                    "error-msj" + (erroresNuevo.codigo ? " visible" : "")
                                }
                            >
                                {erroresNuevo.codigo}
                            </div>
                        </Col>
                        <Col md={4} className="mb-3">
                            <label className="form-label" htmlFor="nombreProducto">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className={claseCampo(nuevo.nombre, erroresNuevo.nombre)}
                                id="nombreProducto"
                                maxLength="100"
                                placeholder="Zapatilla Runner Pro"
                                value={nuevo.nombre}
                                onChange={function (e) {
                                    cambiarNuevo("nombre", e.target.value);
                                }}
                            />
                            <div
                                className={
                                    "error-msj" + (erroresNuevo.nombre ? " visible" : "")
                                }
                            >
                                {erroresNuevo.nombre}
                            </div>
                        </Col>
                        <Col md={4} className="mb-3">
                            <label className="form-label" htmlFor="categoriaProducto">
                                Categoría
                            </label>
                            <select
                                className={claseCampo(
                                    nuevo.categoria,
                                    erroresNuevo.categoria,
                                    true
                                )}
                                id="categoriaProducto"
                                value={nuevo.categoria}
                                onChange={function (e) {
                                    cambiarNuevo("categoria", e.target.value);
                                }}
                            >
                                <option value="">-- Selecciona una categoría --</option>
                                <option value="Calzado">Calzado</option>
                                <option value="Ropa">Ropa</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>
                            <div
                                className={
                                    "error-msj" +
                                    (erroresNuevo.categoria ? " visible" : "")
                                }
                            >
                                {erroresNuevo.categoria}
                            </div>
                        </Col>
                    </Row>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="descripcionProducto">
                            Descripción (opcional)
                        </label>
                        <textarea
                            className="form-control"
                            id="descripcionProducto"
                            rows="3"
                            maxLength="500"
                            placeholder="Descripción breve del producto"
                            value={nuevo.descripcion}
                            onChange={function (e) {
                                cambiarNuevo("descripcion", e.target.value);
                            }}
                        />
                    </div>

                    <Row>
                        <Col md={4} className="mb-3">
                            <label className="form-label" htmlFor="precioProducto">
                                Precio
                            </label>
                            <input
                                type="text"
                                className={claseCampo(nuevo.precio, erroresNuevo.precio)}
                                id="precioProducto"
                                placeholder="49990"
                                value={nuevo.precio}
                                onChange={function (e) {
                                    cambiarNuevo("precio", e.target.value);
                                }}
                            />
                            <div
                                className={
                                    "error-msj" + (erroresNuevo.precio ? " visible" : "")
                                }
                            >
                                {erroresNuevo.precio}
                            </div>
                        </Col>
                        <Col md={4} className="mb-3">
                            <label className="form-label" htmlFor="stockProducto">
                                Stock
                            </label>
                            <input
                                type="text"
                                className={claseCampo(nuevo.stock, erroresNuevo.stock)}
                                id="stockProducto"
                                placeholder="25"
                                value={nuevo.stock}
                                onChange={function (e) {
                                    cambiarNuevo("stock", e.target.value);
                                }}
                            />
                            <div
                                className={"error-msj" + (erroresNuevo.stock ? " visible" : "")}
                            >
                                {erroresNuevo.stock}
                            </div>
                        </Col>
                        <Col md={4} className="mb-3">
                            <label className="form-label" htmlFor="stockCriticoProducto">
                                Stock crítico (alertas)
                            </label>
                            <input
                                type="text"
                                className={claseCampo(
                                    nuevo.stockCritico,
                                    erroresNuevo.stockCritico
                                )}
                                id="stockCriticoProducto"
                                placeholder="5"
                                value={nuevo.stockCritico}
                                onChange={function (e) {
                                    cambiarNuevo("stockCritico", e.target.value);
                                }}
                            />
                            <div
                                className={
                                    "error-msj" +
                                    (erroresNuevo.stockCritico ? " visible" : "")
                                }
                            >
                                {erroresNuevo.stockCritico}
                            </div>
                        </Col>
                    </Row>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-acento">
                            Agregar producto
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-acento"
                            onClick={limpiarNuevo}
                        >
                            Limpiar
                        </button>
                    </div>
                </form>
            </Card>

            <Modal show={Boolean(productoEditar)} onHide={cerrarEditar} size="lg">
                <form noValidate onSubmit={guardarEditar}>
                    <Modal.Header closeButton>
                        <Modal.Title as="h2" className="h5">
                            Editar producto
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={4} className="mb-3">
                                <label className="form-label" htmlFor="editarCodigoProducto">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    className={claseCampo(editar.codigo, erroresEditar.codigo)}
                                    id="editarCodigoProducto"
                                    maxLength="20"
                                    value={editar.codigo}
                                    onChange={function (e) {
                                        cambiarEditar("codigo", e.target.value);
                                    }}
                                />
                                <div
                                    className={
                                        "error-msj" +
                                        (erroresEditar.codigo ? " visible" : "")
                                    }
                                >
                                    {erroresEditar.codigo}
                                </div>
                            </Col>
                            <Col md={4} className="mb-3">
                                <label className="form-label" htmlFor="editarNombreProducto">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className={claseCampo(editar.nombre, erroresEditar.nombre)}
                                    id="editarNombreProducto"
                                    maxLength="100"
                                    value={editar.nombre}
                                    onChange={function (e) {
                                        cambiarEditar("nombre", e.target.value);
                                    }}
                                />
                                <div
                                    className={
                                        "error-msj" +
                                        (erroresEditar.nombre ? " visible" : "")
                                    }
                                >
                                    {erroresEditar.nombre}
                                </div>
                            </Col>
                            <Col md={4} className="mb-3">
                                <label className="form-label" htmlFor="editarCategoriaProducto">
                                    Categoría
                                </label>
                                <select
                                    className={claseCampo(
                                        editar.categoria,
                                        erroresEditar.categoria,
                                        true
                                    )}
                                    id="editarCategoriaProducto"
                                    value={editar.categoria}
                                    onChange={function (e) {
                                        cambiarEditar("categoria", e.target.value);
                                    }}
                                >
                                    <option value="">-- Selecciona una categoría --</option>
                                    <option value="Calzado">Calzado</option>
                                    <option value="Ropa">Ropa</option>
                                    <option value="Accesorios">Accesorios</option>
                                </select>
                                <div
                                    className={
                                        "error-msj" +
                                        (erroresEditar.categoria ? " visible" : "")
                                    }
                                >
                                    {erroresEditar.categoria}
                                </div>
                            </Col>
                        </Row>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="editarDescripcionProducto">
                                Descripción (opcional)
                            </label>
                            <textarea
                                className="form-control"
                                id="editarDescripcionProducto"
                                rows="3"
                                maxLength="500"
                                value={editar.descripcion}
                                onChange={function (e) {
                                    cambiarEditar("descripcion", e.target.value);
                                }}
                            />
                        </div>

                        <Row>
                            <Col md={4} className="mb-3">
                                <label className="form-label" htmlFor="editarPrecioProducto">
                                    Precio
                                </label>
                                <input
                                    type="text"
                                    className={claseCampo(editar.precio, erroresEditar.precio)}
                                    id="editarPrecioProducto"
                                    value={editar.precio}
                                    onChange={function (e) {
                                        cambiarEditar("precio", e.target.value);
                                    }}
                                />
                                <div
                                    className={
                                        "error-msj" +
                                        (erroresEditar.precio ? " visible" : "")
                                    }
                                >
                                    {erroresEditar.precio}
                                </div>
                            </Col>
                            <Col md={4} className="mb-3">
                                <label className="form-label" htmlFor="editarStockProducto">
                                    Stock
                                </label>
                                <input
                                    type="text"
                                    className={claseCampo(editar.stock, erroresEditar.stock)}
                                    id="editarStockProducto"
                                    value={editar.stock}
                                    onChange={function (e) {
                                        cambiarEditar("stock", e.target.value);
                                    }}
                                />
                                <div
                                    className={
                                        "error-msj" + (erroresEditar.stock ? " visible" : "")
                                    }
                                >
                                    {erroresEditar.stock}
                                </div>
                            </Col>
                            <Col md={4} className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="editarStockCriticoProducto"
                                >
                                    Stock crítico
                                </label>
                                <input
                                    type="text"
                                    className={claseCampo(
                                        editar.stockCritico,
                                        erroresEditar.stockCritico
                                    )}
                                    id="editarStockCriticoProducto"
                                    value={editar.stockCritico}
                                    onChange={function (e) {
                                        cambiarEditar("stockCritico", e.target.value);
                                    }}
                                />
                                <div
                                    className={
                                        "error-msj" +
                                        (erroresEditar.stockCritico ? " visible" : "")
                                    }
                                >
                                    {erroresEditar.stockCritico}
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="button"
                            className="btn btn-outline-acento"
                            onClick={cerrarEditar}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-acento">
                            Guardar cambios
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default AdminProducts;
