import { api } from "auth/api";

export interface Producto {
    id_producto: number; 
    nombre_producto: string;
    descripcion_producto: string;
    precio: number;
    stock: number;
    sku?: string;
    marca?: string;
    proveedor?: string;
    fechaCreacion?: string;
    categoria : {
        id_categoria: number;
        nombre_categoria: string;
    }
}

export const getProductos = async (): Promise<Producto[]> => {
  const response = await api.get("/productos");
  return response.data;
};

export const getProductoById = async (id: number): Promise<Producto> => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
}
