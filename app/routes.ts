import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    //Ruta inicial
    index("routes/cliente/home_cliente.tsx"),
    route("cliente/home_cliente", "routes/cliente/home_cliente.tsx", { id: "cliente-home" }),
    route("cliente/producto/:id", "routes/cliente/detalle_producto.tsx"),
    route("cliente/mis-ordenes", "routes/cliente/mis_ordenes.tsx"),
    route("cliente/orden/:id", "routes/cliente/detalle_orden_cliente.tsx"),
    route("cliente/tienda", "routes/cliente/tienda.tsx"),


    //Ruta Publica
    route('login', 'routes/login.tsx'),
    route('registro','routes/registro.tsx'),


    //Rutas Vendedor
    route('dashboard','routes/vendedor/dashboard.tsx'),
    route('productos','routes/vendedor/productos.tsx'),
    route('ordenes','routes/vendedor/ordenes.tsx'),
    route('agregar-producto', 'routes/vendedor/agregar-producto.tsx'),
    route('detalle-producto/:id', 'routes/vendedor/detalle-productoV.tsx'),
    route('crear-orden', 'routes/vendedor/crear-orden.tsx'),
    route('orden/:id', 'routes/vendedor/detalle-orden.tsx'),





] satisfies RouteConfig;
