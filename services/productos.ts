import { api } from "../auth/api";

// Interfaz Híbrida
export interface Producto {
    id_producto: number;
    nombre_producto: string;
    descripcion_producto: string;
    precio: number;
    stock: number;
    categoria: {
        id_categoria: number;
        nombre_categoria: string;
        descripcion_categoria: string;
    };
}


// Servicio Híbrido
export const getProductos = async (): Promise<Producto[]> => {
    try {
        const response = await api.get("/productos");

        return response.data.map((item: any) => ({
            ...item,

            id: item.id_producto,
            nombre: item.nombre_producto,
            descripcion: item.descripcion_producto,
            precio: item.precio,
            stock: item.stock,
            imagen: item.imagen,
            categoria: item.categoria
        }));
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
};

export const getProductoById = async (id: number): Promise<Producto> => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
}

export const crearProducto = async (productoData: Partial<Producto>) => {
    const response = await api.post("/productos", productoData);
    return response.data;
};

export const actualizarStockProducto = async (id_producto: number, nuevoStock: number) => {
    const response = await api.patch(`/productos/${id_producto}`, {
        stock: nuevoStock
    });
    return response.data;
};
