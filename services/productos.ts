import api from "./axiosInstance";
import type { Producto } from "../modelo/productoModel";

// Obtener todos los productos
export const getProductos = async (): Promise<Producto[]> => {
    try {
        const response = await api.get("/productos");

        return response.data.map((item: any) => ({
            id: item.id_producto,
            nombre: item.nombre_producto,
            descripcion: item.descripcion_producto,
            precio: item.precio,
            stock: item.stock,
            imagen: item.imagen,
            categoria: item.categoria
        }));

    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return [];
    }
};

// Obtener un solo producto por ID
export const getProductoById = async (id: number): Promise<Producto | null> => {
    try {
        const response = await api.get(`/productos/${id}`);
        const item = response.data;

        return {
            id: item.id_producto,
            nombre: item.nombre_producto,
            descripcion: item.descripcion_producto,
            precio: item.precio,
            stock: item.stock,
            imagen: item.imagen,
            categoria: item.categoria
        };
    } catch (error) {
        console.error(`Error obteniendo producto ${id}:`, error);
        return null;
    }
};