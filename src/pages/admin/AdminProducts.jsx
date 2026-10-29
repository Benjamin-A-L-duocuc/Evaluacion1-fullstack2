import React, { useState } from "react";
import { Card, Table, Modal } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";
import Boton from "../../components/Boton";
import EncabezadoPanel from "../../components/EncabezadoPanel";
import EstadoVacio from "../../components/EstadoVacio";
import Precio from "../../components/Precio";
import ProductoCampos from "../../components/ProductoCampos";
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
            <EncabezadoPanel
                className="mb-4"
                titulo="Gestión de productos"
                tituloAs="h1"
                tituloClassName="h3 mb-1"
                subtitulo="Administra los productos disponibles en tu sitio."
                accion={
                    <Boton type="button" variante="outline" onClick={restaurarCatalogo}>
                        Restaurar catálogo
                    </Boton>
                }
            />

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
                                        <Precio
                                            as="td"
                                            className="clave-precio"
                                            valor={producto.precio}
                                        />
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
                                            <Boton
                                                type="button"
                                                variante="outline"
                                                tamano="sm"
                                                className="me-2"
                                                title="Editar"
                                                onClick={function () {
                                                    abrirEditar(producto);
                                                }}
                                            >
                                                ✏️
                                            </Boton>
                                            <Boton
                                                type="button"
                                                variante="outline"
                                                tamano="sm"
                                                title="Eliminar"
                                                onClick={function () {
                                                    eliminar(producto);
                                                }}
                                            >
                                                🗑️
                                            </Boton>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                {productos.length === 0 ? (
                    <EstadoVacio
                        variante="texto"
                        mensaje="No hay productos. Usa el formulario de abajo o restaura el catálogo."
                    />
                ) : null}
            </Card>

            <Card className="p-4">
                <h2 className="h5 mb-3">Agregar producto al catálogo</h2>

                <form id="formProducto" noValidate onSubmit={enviarNuevo}>
                    <ProductoCampos
                        datos={nuevo}
                        errores={erroresNuevo}
                        onCambiar={cambiarNuevo}
                        conPlaceholders
                    />

                    <div className="d-flex gap-2">
                        <Boton type="submit" variante="acento">
                            Agregar producto
                        </Boton>
                        <Boton type="button" variante="outline" onClick={limpiarNuevo}>
                            Limpiar
                        </Boton>
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
                        <ProductoCampos
                            idPrefix="editar"
                            datos={editar}
                            errores={erroresEditar}
                            onCambiar={cambiarEditar}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Boton type="button" variante="outline" onClick={cerrarEditar}>
                            Cancelar
                        </Boton>
                        <Boton type="submit" variante="acento">
                            Guardar cambios
                        </Boton>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default AdminProducts;
