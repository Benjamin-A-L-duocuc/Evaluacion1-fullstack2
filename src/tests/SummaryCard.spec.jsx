import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import SummaryCard from "../components/SummaryCard";

describe("Componente SummaryCard", function () {
    it("renderiza el número y la etiqueta", function () {
        render(<SummaryCard numero={6} etiqueta="Productos en catálogo" />);
        expect(screen.getByText("6")).toBeTruthy();
        expect(screen.getByText("Productos en catálogo")).toBeTruthy();
    });

    it("genera un enlace cuando recibe la ruta", function () {
        render(
            <MemoryRouter>
                <SummaryCard numero={5} etiqueta="Ventas" to="/admin/ventas" />
            </MemoryRouter>
        );
        const enlace = screen.getByRole("link");
        expect(enlace.getAttribute("href")).toBe("/admin/ventas");
    });
});
