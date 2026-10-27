import React from "react";
import { render, screen } from "@testing-library/react";
import AlertMessage from "../components/AlertMessage";

describe("Componente AlertMessage", function () {
    it("muestra el mensaje cuando show es verdadero", function () {
        const { container } = render(
            <AlertMessage show={true}>Producto guardado</AlertMessage>
        );
        expect(screen.getByText("Producto guardado")).toBeTruthy();
        expect(container.querySelector(".alert").classList.contains("d-none")).toBe(false);
    });

    it("oculta el mensaje cuando show es falso", function () {
        const { container } = render(
            <AlertMessage show={false}>Producto guardado</AlertMessage>
        );
        expect(container.querySelector(".alert").classList.contains("d-none")).toBe(true);
    });

    it("usa el estilo de error cuando el tipo es error", function () {
        const { container } = render(
            <AlertMessage tipo="error" show={true}>
                Ocurrió un problema
            </AlertMessage>
        );
        expect(container.querySelector(".alert").classList.contains("aviso-error")).toBe(true);
    });
});
