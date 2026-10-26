import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import ProductTemplate from "./pages/ProductTemplate";

import AdminHome from "./pages/admin/AdminHome";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSales from "./pages/admin/AdminSales";

import { listarProductos } from "./data/productos";
import {
    leerCarrito,
    guardarCarrito,
    agregarItem,
    cambiarCantidad,
    quitarItem,
    vaciarCarrito
} from "./data/carrito";
import { listarVentas, crearVenta } from "./data/ventas";
import { obtenerSesion, guardarSesion, cerrarSesion } from "./utils/sesion";
import { buscarCuenta } from "./data/usuarios";

function App() {
    const [sesion, setSesion] = useState(obtenerSesion());
    const [productos, setProductos] = useState(listarProductos());
    const [carrito, setCarrito] = useState(leerCarrito());
    const [ventas, setVentas] = useState(listarVentas());

    function recargarProductos() {
        setProductos(listarProductos());
    }

    function recargarVentas() {
        setVentas(listarVentas());
    }

    function iniciarSesion(correo, clave) {
        const cuenta = buscarCuenta(correo, clave);
        if (!cuenta) return null;

        const usuario = {
            correo: cuenta.correo,
            nombre: cuenta.nombre,
            tipo: cuenta.tipo,
            direccion: cuenta.direccion
        };

        guardarSesion(usuario);
        setSesion(usuario);
        return usuario;
    }

    function cerrarSesionApp() {
        cerrarSesion();
        setSesion(null);
    }

    function agregarAlCarrito(productoId, cantidad, precioUnitario) {
        const nuevoCarrito = agregarItem(carrito, productoId, cantidad, precioUnitario);
        guardarCarrito(nuevoCarrito);
        setCarrito(nuevoCarrito);
    }

    function actualizarCantidadCarrito(indice, cantidad) {
        const nuevoCarrito = cambiarCantidad(carrito, indice, cantidad);
        guardarCarrito(nuevoCarrito);
        setCarrito(nuevoCarrito);
    }

    function quitarDelCarrito(indice) {
        const nuevoCarrito = quitarItem(carrito, indice);
        guardarCarrito(nuevoCarrito);
        setCarrito(nuevoCarrito);
    }

    function vaciarCarritoApp() {
        const nuevoCarrito = vaciarCarrito();
        setCarrito(nuevoCarrito);
    }

    function registrarCompra(datos) {
        const venta = crearVenta(datos);
        recargarVentas();
        return venta;
    }

    function conLayout(elemento) {
        return (
            <Layout sesion={sesion} onCerrarSesion={cerrarSesionApp}>
                {elemento}
            </Layout>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login sesion={sesion} iniciarSesion={iniciarSesion} />}
                />

                <Route
                    path="/home"
                    element={conLayout(
                        <Home productos={productos} onAgregar={agregarAlCarrito} />
                    )}
                />
                <Route
                    path="/productos"
                    element={conLayout(
                        <Products productos={productos} onAgregar={agregarAlCarrito} />
                    )}
                />
                <Route
                    path="/productos/:id"
                    element={conLayout(
                        <ProductDetail productos={productos} onAgregar={agregarAlCarrito} />
                    )}
                />
                <Route
                    path="/categorias"
                    element={conLayout(
                        <Categories productos={productos} onAgregar={agregarAlCarrito} />
                    )}
                />
                <Route
                    path="/ofertas"
                    element={conLayout(
                        <Offers productos={productos} onAgregar={agregarAlCarrito} />
                    )}
                />
                <Route path="/nosotros" element={conLayout(<About />)} />
                <Route path="/contacto" element={conLayout(<Contact />)} />
                <Route
                    path="/carrito"
                    element={conLayout(
                        <Cart
                            carrito={carrito}
                            productos={productos}
                            onCantidad={actualizarCantidadCarrito}
                            onQuitar={quitarDelCarrito}
                            onVaciar={vaciarCarritoApp}
                        />
                    )}
                />
                <Route
                    path="/checkout"
                    element={conLayout(
                        <Checkout
                            sesion={sesion}
                            carrito={carrito}
                            productos={productos}
                            registrarCompra={registrarCompra}
                            vaciarCarrito={vaciarCarritoApp}
                        />
                    )}
                />
                <Route
                    path="/compra-exitosa"
                    element={conLayout(<Success />)}
                />
                <Route
                    path="/compra-fallida"
                    element={conLayout(<Failure />)}
                />
                <Route
                    path="/producto-plantilla"
                    element={conLayout(<ProductTemplate />)}
                />

                <Route
                    path="/admin"
                    element={
                        <AdminLayout
                            sesion={sesion}
                            onCerrarSesion={cerrarSesionApp}
                            active="inicio"
                        >
                            <AdminHome productos={productos} ventas={ventas} />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/productos"
                    element={
                        <AdminLayout
                            sesion={sesion}
                            onCerrarSesion={cerrarSesionApp}
                            active="productos"
                        >
                            <AdminProducts
                                productos={productos}
                                recargarProductos={recargarProductos}
                            />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/ventas"
                    element={
                        <AdminLayout
                            sesion={sesion}
                            onCerrarSesion={cerrarSesionApp}
                            active="ventas"
                        >
                            <AdminSales
                                ventas={ventas}
                                recargarVentas={recargarVentas}
                            />
                        </AdminLayout>
                    }
                />

                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
