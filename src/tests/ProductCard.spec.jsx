import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

const producto = {
    id: 1,
    codigo: "ZAP-RUN-01",
    nombre: "Zapatilla Runner Pro",
    categoria: "Calzado",
    precio: 49990,
    precioOferta: 39990,
    descripcionCorta: "Zapatilla ligera de running con amortiguación.",
    imagenes: [
        {
            src: "https://example.com/zapatilla.jpg",
            alt: "Zapatilla Runner Pro"
        }
    ]
};

function renderizar(componente) {
    return render(<MemoryRouter>{componente}</MemoryRouter>);
}

describe("Componente ProductCard", function () {
    it("renderiza el nombre, categoría y precio del producto", function () {
        renderizar(<ProductCard producto={producto} onAgregar={function () {}} />);
        expect(screen.getByText("Zapatilla Runner Pro")).toBeTruthy();
        expect(screen.getByText("Calzado")).toBeTruthy();
        expect(screen.getByText("$49.990")).toBeTruthy();
    });

    it("ejecuta onAgregar con el id, la cantidad y el precio al hacer clic", function () {
        const alAgregar = jasmine.createSpy("onAgregar");
        renderizar(<ProductCard producto={producto} onAgregar={alAgregar} />);
        fireEvent.click(screen.getByRole("button", { name: "Añadir" }));
        expect(alAgregar).toHaveBeenCalledWith(1, 1, 49990);
    });

    it("muestra el precio de oferta cuando se solicita usar la oferta", function () {
        renderizar(
            <ProductCard producto={producto} onAgregar={function () {}} usarOferta={true} />
        );
        expect(screen.getByText("$39.990")).toBeTruthy();
        expect(screen.getByText("$49.990")).toBeTruthy();
        expect(screen.getByText("Oferta")).toBeTruthy();
    });

    it("enlaza al detalle del producto", function () {
        renderizar(<ProductCard producto={producto} onAgregar={function () {}} />);
        const enlace = screen.getByRole("link", { name: "Ver detalle" });
        expect(enlace.getAttribute("href")).toBe("/productos/1");
    });
});
