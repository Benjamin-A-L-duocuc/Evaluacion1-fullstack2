import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuantityStepper from "../components/QuantityStepper";

describe("Componente QuantityStepper", function () {
    it("aumenta la cantidad al hacer clic en el botón más", function () {
        const alCambiar = jasmine.createSpy("onCambiar");
        render(<QuantityStepper valor={1} onCambiar={alCambiar} maximo={10} />);
        fireEvent.click(screen.getByRole("button", { name: "Agregar uno" }));
        expect(alCambiar).toHaveBeenCalledWith(2);
    });

    it("disminuye la cantidad al hacer clic en el botón menos", function () {
        const alCambiar = jasmine.createSpy("onCambiar");
        render(<QuantityStepper valor={3} onCambiar={alCambiar} maximo={10} />);
        fireEvent.click(screen.getByRole("button", { name: "Quitar uno" }));
        expect(alCambiar).toHaveBeenCalledWith(2);
    });

    it("mantiene la cantidad mínima en 1", function () {
        const alCambiar = jasmine.createSpy("onCambiar");
        render(<QuantityStepper valor={1} onCambiar={alCambiar} maximo={10} />);
        fireEvent.click(screen.getByRole("button", { name: "Quitar uno" }));
        expect(alCambiar).toHaveBeenCalledWith(1);
    });

    it("respeta la cantidad máxima permitida", function () {
        const alCambiar = jasmine.createSpy("onCambiar");
        render(<QuantityStepper valor={5} onCambiar={alCambiar} maximo={5} />);
        fireEvent.click(screen.getByRole("button", { name: "Agregar uno" }));
        expect(alCambiar).toHaveBeenCalledWith(5);
    });

    it("muestra la cantidad recibida por props", function () {
        render(<QuantityStepper valor={4} onCambiar={function () {}} />);
        expect(screen.getByDisplayValue("4")).toBeTruthy();
    });
});
