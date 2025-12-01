import { PrivateRoute } from "auth/PrivateRoute";
import MisOrdenesPage from "componentes/paginas/Cliente/MisOrdenesPage";

export function meta() {
    return [{ title: "Mis Órdenes | SalesSystem" }];
}

export default function MisOrdenesRoute() {
    return <PrivateRoute rol="cliente">
        <MisOrdenesPage />;
    </PrivateRoute>
}