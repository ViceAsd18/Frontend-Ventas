import VendedorLayout from "componentes/layout/VendedorLayout"
import { productosMock } from "modelo/productoModel";
import { useParams } from "react-router";
import InfoProducto from "componentes/organismo/Vendedor/InfoProducto";
import HistorialVentas from "componentes/organismo/Vendedor/HistorialVentas";
import type { Venta } from "componentes/organismo/Vendedor/HistorialVentas";
import { useEffect, useState } from "react";
import { getProductoById, getProductos } from "services/productos";
import type { Producto } from "services/productos";

const historialVentas: Venta[] = [
    { key: '1', idOrden: 'ORD-2024-03A8', fecha: '12 de Julio, 2024', cantidad: 2, precioTotal: '$2,599.98' },
    { key: '2', idOrden: 'ORD-2024-02B1', fecha: '05 de Junio, 2024', cantidad: 1, precioTotal: '$1,299.99' },
    { key: '3', idOrden: 'ORD-2024-01F5', fecha: '21 de Mayo, 2024', cantidad: 5, precioTotal: '$6,499.95' },
];

const DetalleProductoPage = () => {
    const { id } = useParams<{ id: string }>();


    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
            const fetchProducto = async () => {
                try {
                    if (!id) return;
                    const data = await getProductoById(Number(id));
                    setProducto(data);
                } catch (err) {
                    console.error(err);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducto();
        }, [id]);

    const productoEncontrado = producto;


    if (loading){
        return (
            <VendedorLayout>
                <div style={{ textAlign: 'center', padding: 50 }}>Cargando producto...</div>
            </VendedorLayout>
        );
    }

    if (error || !productoEncontrado){
    return (
        <VendedorLayout>
            <div style={{ textAlign: 'center', padding: 50 }}>Producto no encontrado</div>
        </VendedorLayout>
    );
    }

    return (
        <VendedorLayout>
            <div style={{ padding: '1%' }}>
                <InfoProducto producto={productoEncontrado} />
                <HistorialVentas ventas={historialVentas} />
            </div>
        </VendedorLayout>
    );
};

export default DetalleProductoPage;
