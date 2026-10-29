import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import EstadoVacio from "../components/EstadoVacio";

describe("Componente EstadoVacio", function () {
    it("renderiza la tarjeta con título, mensaje y acción", function () {
        render(
            <MemoryRouter>
                <EstadoVacio
                    titulo="Tu carrito está vacío."
                    mensaje="Agrega productos desde el catálogo."
                    accion={<a href="/productos">Ir al catálogo</a>}
                />
            </MemoryRouter>
        );

        expect(screen.getByText("Tu carrito está vacío.")).toBeTruthy();
        expect(screen.getByText("Agrega productos desde el catálogo.")).toBeTruthy();
        expect(screen.getByText("Ir al catálogo")).toBeTruthy();
    });

    it("renderiza solo el mensaje en la variante texto", function () {
        const { container } = render(
            <EstadoVacio variante="texto" mensaje="No hay ventas registradas." />
        );

        expect(container.textContent).toBe("No hay ventas registradas.");
        expect(container.querySelector(".card")).toBeNull();
    });
});
