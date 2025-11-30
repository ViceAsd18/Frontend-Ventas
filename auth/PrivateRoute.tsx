// PrivateRoute.tsx
import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    rol?: string;
}

export const PrivateRoute = ({ children, rol }: Props) => {
    const { user, loading } = useAuth();

    // Mientras carga el user, mostramos nada o un loader
    if (loading) {
        return <div style={{ textAlign: 'center', padding: 50 }}>Cargando...</div>;
    }

    // Si no hay usuario → redirigir
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Validar rol
    if (rol && user.rol.toLowerCase() !== rol.toLowerCase()) {
        return <Navigate to="/no-autorizado" replace />;
    }

    return <>{children}</>;
};
