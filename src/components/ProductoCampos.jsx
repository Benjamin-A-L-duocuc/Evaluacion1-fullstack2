import React from "react";
import { Row, Col } from "react-bootstrap";
import CampoFormulario from "./CampoFormulario";

const CATEGORIAS = ["Calzado", "Ropa", "Accesorios"];

function ProductoCampos({
    idPrefix = "",
    datos,
    errores,
    onCambiar,
    conPlaceholders = false
}) {
    function idCampo(base) {
        if (!idPrefix) return base;
        return idPrefix + base.charAt(0).toUpperCase() + base.slice(1);
    }

    return (
        <>
            <Row>
                <Col md={4} className="mb-3">
                    <CampoFormulario
                        label={conPlaceholders ? "Código del producto" : "Código"}
                        id={idCampo("codigoProducto")}
                        maxLength="20"
                        placeholder={conPlaceholders ? "ZAP-RUN-01" : undefined}
                        value={datos.codigo}
                        error={errores.codigo || ""}
                        onChange={function (valor) {
                            onCambiar("codigo", valor);
                        }}
                    />
                </Col>
                <Col md={4} className="mb-3">
                    <CampoFormulario
                        label="Nombre"
                        id={idCampo("nombreProducto")}
                        maxLength="100"
                        placeholder={conPlaceholders ? "Zapatilla Runner Pro" : undefined}
                        value={datos.nombre}
                        error={errores.nombre || ""}
                        onChange={function (valor) {
                            onCambiar("nombre", valor);
                        }}
                    />
                </Col>
                <Col md={4} className="mb-3">
                    <CampoFormulario
                        as="select"
                        label="Categoría"
                        id={idCampo("categoriaProducto")}
                        options={CATEGORIAS}
                        placeholderOption="-- Selecciona una categoría --"
                        value={datos.categoria}
                        error={errores.categoria || ""}
                        onChange={function (valor) {
                            onCambiar("categoria", valor);
                        }}
                    />
                </Col>
            </Row>

            <div className="mb-3">
                <CampoFormulario
                    as="textarea"
                    label="Descripción (opcional)"
                    id={idCampo("descripcionProducto")}
                    rows="3"
                    maxLength="500"
                    placeholder={
                        conPlaceholders ? "Descripción breve del producto" : undefined
                    }
                    value={datos.descripcion}
                    estadoVisual={false}
                    onChange={function (valor) {
                        onCambiar("descripcion", valor);
                    }}
                />
            </div>

            <Row>
                <Col md={4} className="mb-3">
                    <CampoFormulario
                        label="Precio"
                        id={idCampo("precioProducto")}
                        placeholder={conPlaceholders ? "49990" : undefined}
                        value={datos.precio}
                        error={errores.precio || ""}
                        onChange={function (valor) {
                            onCambiar("precio", valor);
                        }}
                    />
                </Col>
                <Col md={4} className="mb-3">
                    <CampoFormulario
                        label="Stock"
                        id={idCampo("stockProducto")}
                        placeholder={conPlaceholders ? "25" : undefined}
                        value={datos.stock}
                        error={errores.stock || ""}
                        onChange={function (valor) {
                            onCambiar("stock", valor);
                        }}
                    />
                </Col>
                <Col md={4} className="mb-3">
                    <CampoFormulario
                        label={
                            conPlaceholders
                                ? "Stock crítico (alertas)"
                                : "Stock crítico"
                        }
                        id={idCampo("stockCriticoProducto")}
                        placeholder={conPlaceholders ? "5" : undefined}
                        value={datos.stockCritico}
                        error={errores.stockCritico || ""}
                        onChange={function (valor) {
                            onCambiar("stockCritico", valor);
                        }}
                    />
                </Col>
            </Row>
        </>
    );
}

export default ProductoCampos;
