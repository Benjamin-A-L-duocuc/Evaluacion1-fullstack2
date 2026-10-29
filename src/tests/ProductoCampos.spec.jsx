import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductoCampos from "../components/ProductoCampos";

const datos = {
    codigo: "ZAP-RUN-01",
    nombre: "Zapatilla Runner Pro",
    categoria: "Calzado",
    descripcion: "Zapatilla ligera.",
    precio: "49990",
    stock: "25",
    stockCritico: "5"
};

const errores = { codigo: "", nombre: "", categoria: "" };

describe("Componente ProductoCampos", function () {
    it("renderiza los campos con los ids sin prefijo", function () {
        render(
            <ProductoCampos
                datos={datos}
                errores={errores}
                onCambiar={function () {}}
            />
        );

        expect(screen.getByLabelText("Código").id).toBe("codigoProducto");
        expect(screen.getByLabelText("Nombre").id).toBe("nombreProducto");
        expect(screen.getByLabelText("Categoría").id).toBe("categoriaProducto");
        expect(screen.getByLabelText("Precio").id).toBe("precioProducto");
    });

    it("aplica el prefijo a los ids en modo edición", function () {
        render(
            <ProductoCampos
                idPrefix="editar"
                datos={datos}
                errores={errores}
                onCambiar={function () {}}
            />
        );

        expect(screen.getByLabelText("Código").id).toBe("editarCodigoProducto");
        expect(screen.getByLabelText("Stock").id).toBe("editarStockProducto");
        expect(screen.getByLabelText("Stock crítico").id).toBe(
            "editarStockCriticoProducto"
        );
    });

    it("entrega el nombre del campo y el valor al cambiar", function () {
        const alCambiar = jasmine.createSpy("onCambiar");
        render(
            <ProductoCampos
                datos={datos}
                errores={errores}
                onCambiar={alCambiar}
            />
        );

        fireEvent.change(screen.getByLabelText("Nombre"), {
            target: { value: "Zapatilla Nueva" }
        });
        expect(alCambiar).toHaveBeenCalledWith("nombre", "Zapatilla Nueva");
    });
});
