import { api } from "auth/api";

export interface Categoria {
    id_categoria: string;
    nombre_categoria: string;
    descripcion_categoria: string;
}

export const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get("/categorias");
    return response.data; 
};
