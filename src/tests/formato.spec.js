import { formatoCL, parsePrecio, formatoRating } from "../utils/formato";

describe("Utilidades de formato", function () {
    it("formatea un precio en pesos chilenos", function () {
        expect(formatoCL(49990)).toBe("$49.990");
        expect(formatoCL(99970)).toBe("$99.970");
    });

    it("extrae un número desde un texto de precio", function () {
        expect(parsePrecio("$49.990")).toBe(49990);
        expect(parsePrecio("sin números")).toBe(0);
    });

    it("compone el texto de valoración de un producto", function () {
        const producto = { estrellas: "★★★★★", rating: 4.8, resenas: 120 };
        expect(formatoRating(producto)).toBe("★★★★★ 4.8 · 120 reseñas");
    });
});
