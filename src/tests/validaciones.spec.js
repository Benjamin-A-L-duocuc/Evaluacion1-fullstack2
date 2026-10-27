import {
    validarRun,
    validarCorreoDominio,
    validarPrecio,
    validarEnteroNoNegativo,
    reglaClave,
    reglaRun,
    reglaCorreoRequerido
} from "../utils/validaciones";

describe("Utilidades de validación", function () {
    it("acepta un RUT chileno válido con puntos y guión", function () {
        expect(validarRun("12.345.678-5")).toBe(true);
    });

    it("rechaza un RUT con dígito verificador incorrecto", function () {
        expect(validarRun("12.345.678-9")).toBe(false);
    });

    it("entrega un mensaje cuando el RUT está vacío", function () {
        expect(reglaRun("")).toBe("El RUT es requerido.");
    });

    it("acepta correos de los dominios permitidos", function () {
        expect(validarCorreoDominio("alumno@duoc.cl")).toBe(true);
        expect(validarCorreoDominio("profesor@profesor.duoc.cl")).toBe(true);
        expect(validarCorreoDominio("persona@gmail.com")).toBe(true);
    });

    it("rechaza correos de dominios no permitidos", function () {
        expect(validarCorreoDominio("persona@hotmail.com")).toBe(false);
    });

    it("valida el largo de la contraseña entre 4 y 10 caracteres", function () {
        expect(reglaClave("abc")).toBe("La contraseña debe tener entre 4 y 10 caracteres.");
        expect(reglaClave("clave123")).toBeNull();
        expect(reglaClave("12345678901")).toBe(
            "La contraseña debe tener entre 4 y 10 caracteres."
        );
    });

    it("exige un correo con formato y dominio válido", function () {
        expect(reglaCorreoRequerido("")).toBe("El correo es requerido.");
        expect(reglaCorreoRequerido("sin-arroba")).toContain("Solo se aceptan");
        expect(reglaCorreoRequerido("cliente@duoc.cl")).toBeNull();
    });

    it("valida precios y enteros no negativos", function () {
        expect(validarPrecio("49990")).toBe(true);
        expect(validarPrecio("49.990")).toBe(true);
        expect(validarPrecio("-10")).toBe(false);
        expect(validarEnteroNoNegativo("25")).toBe(true);
        expect(validarEnteroNoNegativo("2.5")).toBe(false);
        expect(validarEnteroNoNegativo("")).toBe(false);
    });
});
