import { api } from "auth/api";

export interface Usuario {
    id_usuario: number;
    nombre: string;
    email: string;
    password?: string;
    rol: string;
}

export const getClientes = async () => {
    const res = await api.get("/usuarios");
    return res.data.filter((u: any) => u.rol === "cliente");
};  