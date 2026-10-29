import React from "react";
import { render, screen } from "@testing-library/react";
import Precio from "../components/Precio";

describe("Componente Precio", function () {
    it("formatea el precio en pesos chilenos", function () {
        render(<Precio valor={49990} />);
        expect(screen.getByText("$49.990")).toBeTruthy();
    });

    it("muestra el precio anterior y la etiqueta de oferta", function () {
        render(<Precio valor={39990} anterior={49990} oferta />);
        expect(screen.getByText("$49.990")).toBeTruthy();
        expect(screen.getByText("$39.990")).toBeTruthy();
        expect(screen.getByText("Oferta")).toBeTruthy();
    });

    it("permite cambiar la etiqueta contenedora y agregar contenido previo", function () {
        const { container } = render(
            <Precio as="strong" valor={1000}>
                Total:{" "}
            </Precio>
        );

        const precio = container.querySelector("strong");
        expect(precio.textContent).toBe("Total: $1.000");
    });
});
