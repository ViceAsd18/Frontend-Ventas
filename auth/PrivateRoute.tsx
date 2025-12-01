import { useEffect, useRef } from "react";
import { Navigate } from "react-router";
import { message } from "antd";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    rol?: string;
}

export const PrivateRoute = ({ children, rol }: Props) => {
    const { user, loading } = useAuth();
    const shownRef = useRef(false);

    useEffect(() => {
        if (!loading && !user && !shownRef.current) {
            message.info("Necesitas iniciar sesión para acceder a esta página");
            shownRef.current = true;
        }
        if (!loading && user && rol && user.rol.toLowerCase() !== rol.toLowerCase() && !shownRef.current) {
            message.error("No tienes permisos para acceder a esta página");
            shownRef.current = true;
        }
    }, [loading, user, rol]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: 50 }}>Cargando...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (rol && user.rol.toLowerCase() !== rol.toLowerCase()) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
