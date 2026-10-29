import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSeccion from "../components/HeroSeccion";

describe("Componente HeroSeccion", function () {
    it("renderiza el badge, el título y el subtítulo", function () {
        render(
            <HeroSeccion
                badge="Precios especiales"
                titulo="Ofertas de la temporada"
                subtitulo="Aprovecha descuentos en productos seleccionados."
            />
        );

        expect(screen.getByText("Precios especiales")).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: "Ofertas de la temporada" })
        ).toBeTruthy();
        expect(
            screen.getByText("Aprovecha descuentos en productos seleccionados.")
        ).toBeTruthy();
    });

    it("permite renderizar contenido adicional dentro del contenedor", function () {
        render(
            <HeroSeccion titulo="Catálogo">
                <div>Contenido extra</div>
            </HeroSeccion>
        );

        expect(screen.getByText("Contenido extra")).toBeTruthy();
    });
});
