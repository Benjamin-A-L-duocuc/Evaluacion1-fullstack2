/* =========================================================
   Athlex Store React - data/productos.js
   Fuente de datos simulada (tipo base de datos) para productos.
   Incluye operaciones CRUD y persistencia con localStorage.
   ========================================================= */

const CLAVE_PRODUCTOS = "athlex_productos_react";

const ENVIO_ESTANDAR = [
    "Despacho a domicilio en 2 a 4 días hábiles en la Región Metropolitana y hasta 6 días hábiles en regiones, dependiendo de la comuna de destino.",
    "También puedes retirar tu pedido gratis en nuestra tienda física."
];

export const productosIniciales = [
    {
        id: 1,
        codigo: "ZAP-RUN-01",
        nombre: "Zapatilla Runner Pro",
        categoria: "Calzado",
        precio: 49990,
        precioOferta: null,
        stock: 25,
        stockCritico: 5,
        descripcionCorta: "Zapatilla ligera de running con amortiguación.",
        descripcion: "Zapatilla deportiva ligera con amortiguación de espuma reactiva y suela de caucho antideslizante. Pensada para tu carrera diaria, el gimnasio o el uso casual.",
        estrellas: "★★★★★",
        rating: 4.8,
        resenas: 120,
        tallas: ["38", "39", "40", "41", "42", "43", "44"],
        imagenes: [
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.riNF-o05orDIqbOdNarJGwHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=f71b4017752ea36deaf6a56d3984196563b0ccd82866d6d66dafe770edd7e570&ipo=images",
                alt: "Zapatilla Runner Pro - vista principal"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.w1q3i4W7pGWuzzb-qpNd5wHaHa%3Fpid%3DApi&f=1&ipt=6d0911183fe3e883e7d536605d9d4d159e19cbcd6fd435122dcf168168524e57&ipo=images",
                alt: "Zapatilla Runner Pro - lateral"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.4UNcprl20XSmYapa1az8XAHaHa%3Fpid%3DApi&f=1&ipt=15eda06f73da88ba0d0fdfd4adad22c1eaf79c6c4e145a3de03a53c05ee1cd17&ipo=images",
                alt: "Zapatilla Runner Pro - suela"
            }
        ],
        caracteristicas: [
            "Amortiguación de espuma reactiva para mayor comodidad.",
            "Suela de caucho antideslizante con buen agarre.",
            "Parte superior de malla transpirable y flexible.",
            "Peso ligero ideal para correr largas distancias.",
            "Disponible en tallas 38 a 44.",
            "Incluye garantía de 6 meses."
        ],
        envio: ENVIO_ESTANDAR,
        relacionadoId: 2
    },
    {
        id: 2,
        codigo: "POL-AIR-02",
        nombre: "Polera Deportiva Air",
        categoria: "Ropa",
        precio: 24990,
        precioOferta: 19990,
        stock: 18,
        stockCritico: 5,
        descripcionCorta: "Polera transpirable de corte deportivo.",
        descripcion: "Polera de corte deportivo con tela transpirable de secado rápido. Ideal para entrenar, correr o llevar un estilo casual fresco durante todo el día.",
        estrellas: "★★★★★",
        rating: 4.6,
        resenas: 85,
        tallas: ["S", "M", "L", "XL", "XXL"],
        imagenes: [
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.8Qxt_8PojP1zTjAG55KxoAHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=d9d9c64df9ecf0d4679624b157fcaa654f382710af68c11ba6ef5820301b2e35&ipo=images",
                alt: "Polera Deportiva Air - vista principal"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.LA2xcosX7cuYqxso6TEvHQHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=c83b814fb76de889fdcbecf17573aea13536e369b9521c7faaacb26be319245d&ipo=images",
                alt: "Polera Deportiva Air - espalda"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.AqfsK9V-VOMGqINk4xwEUgHaKA%3Fr%3D0%26pid%3DApi&f=1&ipt=5875f59c8e62d391121958877552f9cb0ad87d3190e0cb33812012ffc25edb38&ipo=images",
                alt: "Polera Deportiva Air - detalle tela"
            }
        ],
        caracteristicas: [
            "Tela transpirable de secado rápido.",
            "Corte deportivo regular, cómodo al movimiento.",
            "Antibacteriana y resistente a malos olores.",
            "Ligera, ideal para entrenamientos de alta intensidad.",
            "Disponible en tallas S a XXL.",
            "Incluye garantía de 3 meses."
        ],
        envio: ENVIO_ESTANDAR,
        relacionadoId: 1
    },
    {
        id: 3,
        codigo: "ANI-CAL-03",
        nombre: "Anillas de Gimnasia",
        categoria: "Accesorios",
        precio: 19990,
        precioOferta: null,
        stock: 30,
        stockCritico: 5,
        descripcionCorta: "Anillas de calistenia con correas ajustables.",
        descripcion: "Anillas de calistenia con correas ajustables y goma reforzada. Perfectas para dominadas, fondos y el desarrollo de fuerza y equilibrio con tu propio peso corporal.",
        estrellas: "★★★★★",
        rating: 4.9,
        resenas: 210,
        tallas: [],
        imagenes: [
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-Xzh8TNAqfbE%2FW7h_JGC9c6I%2FAAAAAAAATUU%2F1_dpqIKQOKkG74KhSrzbTrweOvohdrZqgCK4BGAYYCw%2Fs1600%2Fvlcsnap-2018-10-05-09h20m18s940.jpg&f=1&nofb=1&ipt=9b230fb075939bed8afc33a08438c8ee22239494a3870978a9f18ee33890485c",
                alt: "Anillas de Gimnasia - uso en entrenamiento"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.swosc.es%2Fwp-content%2Fuploads%2F2021%2F10%2Fimage-1024x1024.jpeg&f=1&nofb=1&ipt=ef48a5cc9150b356ace32acf805c0edc2b4afe7ed8cdf950b8118eafa0029897",
                alt: "Anillas de Gimnasia - vista principal"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftodocalistenia.com%2Fwp-content%2Fuploads%2FANILLAS.png&f=1&nofb=1&ipt=8c5a6ee461e87418777a098ab04c7cf4a1051e4c7c32a367db5cfcbfca6a5624",
                alt: "Anillas de Gimnasia - detalle"
            }
        ],
        caracteristicas: [
            "Goma de grosor cómodo, antideslizante.",
            "Correas de nylon ajustables hasta 4,5 m.",
            "Clips de fijación rápida y seguro.",
            "Soportan hasta 300 kg de carga.",
            "Ideales para calistenia, gimnasia y entrenamiento funcional.",
            "Incluye bolso de transporte."
        ],
        envio: ENVIO_ESTANDAR,
        relacionadoId: 4
    },
    {
        id: 4,
        codigo: "MAN-AJU-04",
        nombre: "Mancuernas Ajustables",
        categoria: "Accesorios",
        precio: 29990,
        precioOferta: 24990,
        stock: 15,
        stockCritico: 5,
        descripcionCorta: "Par de mancuernas con ajuste rápido de peso.",
        descripcion: "Par de mancuernas con sistema de ajuste rápido de peso. Cambia la carga en segundos y entrena todo el cuerpo en casa sin ocupar espacio con un set completo de discos.",
        estrellas: "★★★★★",
        rating: 4.7,
        resenas: 163,
        tallas: [],
        imagenes: [
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.9rfrzHHHJWw8N6SGX7SNAQHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=339d641f1fd946dceabae577c80acfd12dca738cdec692fa23317daee19d72c7&ipo=images",
                alt: "Mancuernas Ajustables - vista principal"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.zl--d3XlorW4bONyR3alqgHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=5f56f6e0af39210c57b17e98e4140974d2027b395ed708afa4a78d7dda06eb78&ipo=images",
                alt: "Mancuernas Ajustables - discos"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.uFuSHekI203TMDl67x78TQHaGW%3Fr%3D0%26pid%3DApi&f=1&ipt=5aa2e305e8724e324564ac56c9c877ef2b3ccd7072941ce483bb7ecf357bc94f&ipo=images",
                alt: "Mancuernas Ajustables - peso"
            }
        ],
        caracteristicas: [
            "Sistema de ajuste rápido de peso.",
            "Rango de carga de 2 a 24 kg por mancuerna.",
            "Empuñadura ergonómica antideslizante.",
            "Ahorra espacio: un solo set reemplaza varios pares.",
            "Base de almacenamiento incluida.",
            "Incluye garantía de 12 meses."
        ],
        envio: ENVIO_ESTANDAR,
        relacionadoId: 6
    },
    {
        id: 5,
        codigo: "SHO-FLX-05",
        nombre: "Short Deportivo Flex",
        categoria: "Ropa",
        precio: 14990,
        precioOferta: 11990,
        stock: 40,
        stockCritico: 5,
        descripcionCorta: "Short de entrenamiento de secado rápido.",
        descripcion: "Short de entrenamiento con tela de secado rápido y elasticidad en cuatro direcciones. Cómodo para correr, ir al gimnasio o entrenar en casa.",
        estrellas: "★★★★☆",
        rating: 4.5,
        resenas: 96,
        tallas: ["S", "M", "L", "XL", "XXL"],
        imagenes: [
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.MWyfey9tZ5bYfidUO3Og2AHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=c5c7d81c077aa5d17a6802f49575136987ff83cee8dce05647eae32b3ae40c97&ipo=images",
                alt: "Short Deportivo Flex - vista principal"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.G_dlBD-u8phwUu_RMirOoQHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=87962d9a71d2941e257d09a5db08595ab52295b9c0a2ad787d673c6af7a412ff&ipo=images",
                alt: "Short Deportivo Flex - detalle"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.IZ32PdlwVYsa3SbRQs10VwHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=5beb62231f6ee4fc824a10b905451c1813d734f557bbe54f8bd47d5260782457&ipo=images",
                alt: "Short Deportivo Flex - color"
            }
        ],
        caracteristicas: [
            "Tela de secado rápido y transpirable.",
            "Elasticidad en cuatro direcciones.",
            "Cintura elástica ajustable con cordón.",
            "Bolsillos laterales con cierre.",
            "Disponible en tallas S a XXL.",
            "Incluye garantía de 3 meses."
        ],
        envio: ENVIO_ESTANDAR,
        relacionadoId: 2
    },
    {
        id: 6,
        codigo: "PAL-TME-06",
        nombre: "Paleta de Tenis de Mesa",
        categoria: "Accesorios",
        precio: 21990,
        precioOferta: 17990,
        stock: 20,
        stockCritico: 5,
        descripcionCorta: "Paleta de ping pong con agarre y control.",
        descripcion: "Paleta profesional para ping pong con gomas de lija de gran agarre y madera liviana de 5 pliegues. Ideal para jugar en casa, el club o torneos recreativos.",
        estrellas: "★★★★☆",
        rating: 4.4,
        resenas: 74,
        tallas: [],
        imagenes: [
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.xHBJpqmxuNg0m_LC4DYTrwHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=7d79a1ea868360a793dc40b8f813375e3b1711cc5cbe651a6d19bf88e2d4bf06&ipo=images",
                alt: "Paleta de Tenis de Mesa - vista principal"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.0ZutWh8V63K7eftCjHAGbQHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=9ee8839553bbfc3835db549603129da32eb208260c6103aa2aec66dda46d15bc&ipo=images",
                alt: "Paleta de Tenis de Mesa - mango"
            },
            {
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.PyGHSsZOtFGhoZ2tv-6hXAHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=5f4d3742e2820c52c046addf0ae973878f6530390aaba322912cb1e8c87cca08&ipo=images",
                alt: "Paleta de Tenis de Mesa - goma"
            }
        ],
        caracteristicas: [
            "Gomas de lija con gran agarre y control.",
            "Madera liviana de 5 pliegues.",
            "Mango ergonómico media caña.",
            "Peso equilibrado para buen manejo.",
            "Funda protectora incluida.",
            "Incluye garantía de 6 meses."
        ],
        envio: ENVIO_ESTANDAR,
        relacionadoId: 5
    }
];

function guardarProductos(productos) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
}

export function listarProductos() {
    const datos = localStorage.getItem(CLAVE_PRODUCTOS);
    if (!datos) {
        guardarProductos(productosIniciales);
        return productosIniciales.map(function (p) { return { ...p }; });
    }
    try {
        return JSON.parse(datos);
    } catch (error) {
        guardarProductos(productosIniciales);
        return productosIniciales.map(function (p) { return { ...p }; });
    }
}

export function obtenerProducto(id) {
    const productos = listarProductos();
    return productos.find(function (p) { return p.id === Number(id); }) || null;
}

export function crearProducto(datos) {
    const productos = listarProductos();
    const nuevoId = productos.reduce(function (maximo, p) {
        return Math.max(maximo, p.id);
    }, 0) + 1;

    const nuevoProducto = {
        id: nuevoId,
        codigo: datos.codigo,
        nombre: datos.nombre,
        categoria: datos.categoria,
        precio: Number(datos.precio),
        precioOferta: null,
        stock: Number(datos.stock),
        stockCritico: Number(datos.stockCritico || 0),
        descripcionCorta: datos.descripcion || "Producto Athlex.",
        descripcion: datos.descripcion || "Producto Athlex.",
        estrellas: "★★★★★",
        rating: 5,
        resenas: 0,
        tallas: [],
        imagenes: [
            {
                src: "https://picsum.photos/seed/athlex-producto-" + nuevoId + "/600/400",
                alt: datos.nombre
            }
        ],
        caracteristicas: [],
        envio: ENVIO_ESTANDAR,
        relacionadoId: null
    };

    guardarProductos(productos.concat([nuevoProducto]));
    return nuevoProducto;
}

export function actualizarProducto(id, cambios) {
    const productos = listarProductos();
    const actualizados = productos.map(function (p) {
        if (p.id !== Number(id)) return p;
        return {
            ...p,
            ...cambios,
            precio: Number(cambios.precio !== undefined ? cambios.precio : p.precio),
            stock: Number(cambios.stock !== undefined ? cambios.stock : p.stock),
            stockCritico: Number(cambios.stockCritico !== undefined ? cambios.stockCritico : p.stockCritico)
        };
    });
    guardarProductos(actualizados);
    return actualizados.find(function (p) { return p.id === Number(id); }) || null;
}

export function eliminarProducto(id) {
    const productos = listarProductos();
    const filtrados = productos.filter(function (p) { return p.id !== Number(id); });
    guardarProductos(filtrados);
    return filtrados;
}

export function reiniciarProductos() {
    localStorage.removeItem(CLAVE_PRODUCTOS);
    return listarProductos();
}

export function listarCategorias() {
    const productos = listarProductos();
    return productos.reduce(function (categorias, p) {
        if (!categorias.includes(p.categoria)) categorias.push(p.categoria);
        return categorias;
    }, []);
}

export function precioFinal(producto, usarOferta) {
    if (usarOferta && producto.precioOferta) return producto.precioOferta;
    return producto.precio;
}
