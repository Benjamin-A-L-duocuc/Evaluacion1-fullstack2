import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Boton from "../components/Boton";

describe("Componente Boton", function () {
    it("renderiza un botón con las clases por defecto y ejecuta onClick", function () {
        const alHacerClic = jasmine.createSpy("onClick");
        render(<Boton onClick={alHacerClic}>Guardar</Boton>);

        const boton = screen.getByRole("button", { name: "Guardar" });
        expect(boton.className).toContain("btn-acento");
        fireEvent.click(boton);
        expect(alHacerClic).toHaveBeenCalled();
    });

    it("renderiza un enlace cuando recibe la ruta", function () {
        render(
            <MemoryRouter>
                <Boton to="/productos">Ver catálogo</Boton>
            </MemoryRouter>
        );

        const enlace = screen.getByRole("link", { name: "Ver catálogo" });
        expect(enlace.getAttribute("href")).toBe("/productos");
    });

    it("aplica la variante outline, el tamaño y el ancho completo", function () {
        render(
            <Boton variante="outline" tamano="sm" bloque>
                Quitar
            </Boton>
        );

        const boton = screen.getByRole("button", { name: "Quitar" });
        expect(boton.className).toContain("btn-outline-acento");
        expect(boton.className).toContain("btn-sm");
        expect(boton.className).toContain("w-100");
    });
});
