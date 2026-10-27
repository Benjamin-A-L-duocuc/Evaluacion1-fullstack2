import {
    agregarItem,
    cambiarCantidad,
    quitarItem,
    calcularTotal,
    contarUnidades
} from "../data/carrito";

describe("Lógica del carrito", function () {
    it("calcula el total de los productos del carrito", function () {
        const carrito = [
            { productoId: 1, cantidad: 1, precioUnitario: 49990 },
            { productoId: 2, cantidad: 2, precioUnitario: 24990 }
        ];
        expect(calcularTotal(carrito)).toBe(99970);
    });

    it("cuenta las unidades totales del carrito", function () {
        const carrito = [
            { productoId: 1, cantidad: 1, precioUnitario: 49990 },
            { productoId: 2, cantidad: 2, precioUnitario: 24990 }
        ];
        expect(contarUnidades(carrito)).toBe(3);
    });

    it("agrega un producto nuevo al carrito", function () {
        const carrito = agregarItem([], 3, 2, 19990);
        expect(carrito.length).toBe(1);
        expect(carrito[0]).toEqual({
            productoId: 3,
            cantidad: 2,
            precioUnitario: 19990
        });
    });

    it("suma la cantidad cuando el producto ya existe al mismo precio", function () {
        const inicial = [{ productoId: 1, cantidad: 1, precioUnitario: 49990 }];
        const carrito = agregarItem(inicial, 1, 2, 49990);
        expect(carrito.length).toBe(1);
        expect(carrito[0].cantidad).toBe(3);
    });

    it("no permite bajar la cantidad de un producto bajo 1", function () {
        const carrito = cambiarCantidad(
            [{ productoId: 1, cantidad: 2, precioUnitario: 49990 }],
            0,
            0
        );
        expect(carrito[0].cantidad).toBe(1);
    });

    it("quita un producto del carrito", function () {
        const carrito = quitarItem(
            [
                { productoId: 1, cantidad: 1, precioUnitario: 49990 },
                { productoId: 2, cantidad: 1, precioUnitario: 24990 }
            ],
            0
        );
        expect(carrito.length).toBe(1);
        expect(carrito[0].productoId).toBe(2);
    });
});
