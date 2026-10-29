import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import EncabezadoPanel from "../components/EncabezadoPanel";

describe("Componente EncabezadoPanel", function () {
    it("renderiza el título, el subtítulo y la acción", function () {
        render(
            <MemoryRouter>
                <EncabezadoPanel
                    titulo="Productos destacados"
                    subtitulo="Lo más vendido de la temporada."
                    accion={<a href="/productos">Ver todos</a>}
                />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "Productos destacados" })).toBeTruthy();
        expect(screen.getByText("Lo más vendido de la temporada.")).toBeTruthy();
        expect(screen.getByText("Ver todos")).toBeTruthy();
    });

    it("permite cambiar la etiqueta del título y agregar contenido", function () {
        render(
            <EncabezadoPanel titulo="Compras" tituloAs="h1">
                <p>Contenido adicional</p>
            </EncabezadoPanel>
        );

        expect(screen.getByRole("heading", { level: 1, name: "Compras" })).toBeTruthy();
        expect(screen.getByText("Contenido adicional")).toBeTruthy();
    });
});
