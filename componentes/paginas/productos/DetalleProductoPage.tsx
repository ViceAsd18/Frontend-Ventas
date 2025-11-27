import VendedorLayout from "componentes/layout/VendedorLayout"
import { productosMock } from "modelo/productoModel";
import { useParams } from "react-router";
import InfoProducto from "componentes/organismo/InfoProducto";
import HistorialVentas from "componentes/organismo/HistorialVentas";
import type { Venta } from "componentes/organismo/HistorialVentas";

const historialVentas: Venta[] = [
    { key: '1', idOrden: 'ORD-2024-03A8', fecha: '12 de Julio, 2024', cantidad: 2, precioTotal: '$2,599.98' },
    { key: '2', idOrden: 'ORD-2024-02B1', fecha: '05 de Junio, 2024', cantidad: 1, precioTotal: '$1,299.99' },
    { key: '3', idOrden: 'ORD-2024-01F5', fecha: '21 de Mayo, 2024', cantidad: 5, precioTotal: '$6,499.95' },
];

const DetalleProductoPage = () => {
    const { id } = useParams<{ id: string }>();
    const productoEncontrado = productosMock.find(
        (producto) => producto.id === Number(id)
    );

    if (!productoEncontrado){
        return (
            <VendedorLayout>
                <div style={{ textAlign: 'center', padding: 50 }}>
                    <h1>Producto No Encontrado</h1>
                </div>
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
