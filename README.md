# Athlex Store — React

Migración de la tienda deportiva Athlex desde HTML/CSS/JS a React, usando
Create React App, JavaScript/JSX, React Bootstrap, React Router y persistencia
con `localStorage`/`sessionStorage`.

## Estado del repositorio

Este repositorio se construye en 3 commits:

1. **Benjamin** — estructura base, estilos, datos, CRUD, persistencia, rutas,
   Login, Home, catálogo, carrito y plantilla de producto. Las vistas de los
   demás integrantes quedan como placeholders para que el proyecto compile.
2. **Williams** — detalle de producto, Categorías, Ofertas y Nosotros.
3. **Jonathan** — Contacto, Checkout, compra exitosa/fallida, panel de
   administración y pruebas unitarias con Jasmine/Karma.

## Rutas

| Ruta | Vista |
|---|---|
| `/` | Login y registro |
| `/home` | Inicio |
| `/productos` | Catálogo con búsqueda y filtro por categoría |
| `/productos/:id` | Detalle de producto |
| `/categorias` | Productos agrupados por categoría |
| `/ofertas` | Productos con precio de oferta |
| `/nosotros` | Información de la empresa y del equipo |
| `/contacto` | Formulario de contacto |
| `/carrito` | Carrito de compras |
| `/checkout` | Datos de envío y pago |
| `/compra-exitosa` | Resumen de compra exitosa |
| `/compra-fallida` | Pago rechazado |
| `/producto-plantilla` | Plantilla base para nuevos productos |
| `/admin` | Panel de administración |
| `/admin/productos` | CRUD de productos |
| `/admin/ventas` | Historial y estados de ventas |

## Cuentas de demostración

- Cliente: `cliente@duoc.cl` / `client1`
- Administrador: `admin@duoc.cl` / `admin123`

## Datos y persistencia

- `src/data/productos.js`: catálogo inicial y CRUD de productos.
- `src/data/carrito.js`: carrito persistido en `localStorage`.
- `src/data/ventas.js`: ventas de demostración y CRUD.
- `src/data/usuarios.js`: cuentas de demostración.
- `src/utils/sesion.js`: sesión en `sessionStorage`.
- `src/utils/validaciones.js`: reglas reutilizables (RUT, correo, precios, etc.).

El carrito parte con la Zapatilla Runner Pro (1 unidad) y la Polera Deportiva
Air (2 unidades) para reproducir el total de `$99.970` del prototipo HTML.

## Comandos

```bash
npm install
npm start
npm run build
```

Las pruebas con Jasmine/Karma se incorporan en el commit de Jonathan:

```bash
npm test
```

## Tecnologías

- React 18
- React Router 6
- React Bootstrap 2 + Bootstrap 5
- JavaScript / JSX
- Jasmine + Karma + jsdom (desde el commit de Jonathan)
