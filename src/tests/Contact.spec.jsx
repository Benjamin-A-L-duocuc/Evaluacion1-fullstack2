import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../pages/Contact";

describe("Formulario de contacto", function () {
    it("muestra los errores al enviar el formulario vacío", function () {
        render(<Contact />);
        fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
        const errorNombre = screen.getByText("El nombre es requerido.");
        expect(errorNombre.classList.contains("visible")).toBe(true);
    });

    it("actualiza el contador de caracteres del comentario", function () {
        render(<Contact />);
        fireEvent.change(screen.getByLabelText("Comentario"), {
            target: { value: "Hola" }
        });
        expect(screen.getByText("4 / 500")).toBeTruthy();
    });

    it("envía el formulario con datos válidos y muestra el aviso", function () {
        render(<Contact />);
        fireEvent.change(screen.getByLabelText("Nombre"), {
            target: { value: "Ana Pérez" }
        });
        fireEvent.change(screen.getByLabelText("Correo electrónico"), {
            target: { value: "ana@duoc.cl" }
        });
        fireEvent.change(screen.getByLabelText("Comentario"), {
            target: { value: "Necesito información sobre el envío." }
        });
        fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

        const aviso = screen.getByText(
            "¡Mensaje enviado! Te contactaremos pronto al correo indicado."
        );
        expect(aviso.classList.contains("d-none")).toBe(false);
    });
});
