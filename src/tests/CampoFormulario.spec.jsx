import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CampoFormulario from "../components/CampoFormulario";

describe("Componente CampoFormulario", function () {
    it("asocia la etiqueta al campo y entrega el valor en onChange", function () {
        const alCambiar = jasmine.createSpy("onChange");
        render(
            <CampoFormulario
                label="Nombre"
                id="nombreCampo"
                value=""
                onChange={alCambiar}
            />
        );

        fireEvent.change(screen.getByLabelText("Nombre"), {
            target: { value: "Ana" }
        });
        expect(alCambiar).toHaveBeenCalledWith("Ana");
    });

    it("muestra el mensaje de error con la clase visible", function () {
        render(
            <CampoFormulario
                label="Correo"
                id="correoCampo"
                value=""
                error="El correo es requerido."
                onChange={function () {}}
            />
        );

        const error = screen.getByText("El correo es requerido.");
        expect(error.classList.contains("error-msj")).toBe(true);
        expect(error.classList.contains("visible")).toBe(true);
    });

    it("muestra el contador de caracteres cuando se solicita", function () {
        render(
            <CampoFormulario
                as="textarea"
                label="Comentario"
                id="comentarioCampo"
                value="Hola"
                maxLength="500"
                contador
                onChange={function () {}}
            />
        );

        expect(screen.getByText("4 / 500")).toBeTruthy();
    });

    it("renderiza las opciones de un select y la opción vacía", function () {
        render(
            <CampoFormulario
                as="select"
                label="Categoría"
                id="categoriaCampo"
                value=""
                placeholderOption="-- Selecciona --"
                options={["Calzado", "Ropa"]}
                onChange={function () {}}
            />
        );

        expect(screen.getByRole("option", { name: "-- Selecciona --" })).toBeTruthy();
        expect(screen.getByRole("option", { name: "Calzado" })).toBeTruthy();
        expect(screen.getByRole("option", { name: "Ropa" })).toBeTruthy();
    });
});
