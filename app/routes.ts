import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('dashboard','routes/dashboardV.tsx'),
    route('productos','routes/productosV.tsx'),
    route('ordenes','routes/ordenesV.tsx'),
    route('detalle-producto/:id', 'routes/detalle-productoV.tsx'),
    route('crear-orden', 'routes/crear-orden.tsx'),
    route('orden/:id', 'routes/detalle-ordenV.tsx'),
] satisfies RouteConfig;
