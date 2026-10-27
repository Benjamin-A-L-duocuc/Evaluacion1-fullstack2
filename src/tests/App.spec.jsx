import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Aplicación Athlex", function () {
    beforeEach(function () {
        localStorage.clear();
        sessionStorage.clear();
        window.history.pushState({}, "", "/");
    });

    it("renderiza la portada de inicio de sesión en la ruta principal", function () {
        render(<App />);
        expect(screen.getByText("Tienda Deportiva · Inicia sesión")).toBeTruthy();
        expect(screen.getByRole("button", { name: "Ingresar" })).toBeTruthy();
    });
});
