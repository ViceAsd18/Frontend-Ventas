import { api } from "auth/api";
import type { Venta } from "componentes/organismo/Vendedor/HistorialVentas";

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



export const getUltimasVentasByProducto = async (productoId: number, limite = 3): Promise<Venta[]> => {
    const ordenes = await getOrdenes();

    //Filtrar solo órdenes completadas que contengan el producto
    const ventas: Venta[] = [];

    ordenes.forEach((orden) => {
        if (orden.estado !== 'completada') return;

        orden.detalles.forEach(detalle => {
            if (detalle.producto.id_producto === productoId) {
                ventas.push({
                    key: `${orden.id_venta}-${detalle.id_detalle}`,
                    idOrden: `ORD-${orden.id_venta}`,
                    fecha: new Date(orden.fecha_venta).toLocaleDateString(),
                    cantidad: detalle.cantidad,
                    precioTotal: `$${detalle.subtotal.toFixed(2)}`
                });
            }
        });
    });

    ventas.sort((a, b) => {
        const fechaA = new Date(a.fecha).getTime();
        const fechaB = new Date(b.fecha).getTime();
        return fechaB - fechaA;
    });

    return ventas.slice(0, limite);
};


