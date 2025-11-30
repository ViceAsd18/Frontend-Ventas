import { api } from "auth/api";

export interface Orden {
    id_venta: number;
    fecha_venta: string;
    total: number;
    estado: 'pendiente' | 'completada' | 'cancelada';
    metodo_pago: string;
    usuario: {
        id_usuario: number;
        nombre: string;
        rol: string;
    };
    detalles: {
        id_detalle: number;
        cantidad: number;
        subtotal: number;
        producto: {
            id_producto: number;
            nombre_producto: string;
            precio: number;
            descripcion_producto?: string;
            stock?: number;
        };
    }[];
}

export interface OrdenDetalleInput {
    id_producto: number;
    cantidad: number;
}

export interface CrearOrdenInput {
    id_cliente: number;
    productos: OrdenDetalleInput[];
}

export const getOrdenes = async (): Promise<Orden[]> => {
    const response = await api.get("/ventas"); 
    return response.data;
};

export const actualizarOrden = async (id: number, datos: Partial<Orden>) => {
    const response = await api.patch(`/ventas/${id}`, datos);
    return response.data;
};


export const crearOrden = async (orden: any) => {
    const response = await api.post("/ventas", orden);
    return response.data;
};

