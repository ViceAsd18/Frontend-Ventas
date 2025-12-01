import VendedorLayout from "componentes/layout/VendedorLayout";
import InfoProducto from "componentes/organismo/Vendedor/InfoProducto";
import HistorialVentas from "componentes/organismo/Vendedor/HistorialVentas";
import type { Venta } from "componentes/organismo/Vendedor/HistorialVentas";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductoById } from "services/productos";
import type { Producto } from "services/productos";
import { getUltimasVentasByProducto } from "services/orden";

const DetalleProductoPage = () => {
    const { id } = useParams<{ id: string }>();

    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [ventas, setVentas] = useState<Venta[]>([]);
    const [ventasLoading, setVentasLoading] = useState(true);
    const [ventasError, setVentasError] = useState(false);

    //Obtener producto
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

    //Obtener últimas 3 ventas completadas del producto
    useEffect(() => {
        const fetchVentas = async () => {
            if (!id) return;
            setVentasLoading(true);
            try {
                const data = await getUltimasVentasByProducto(Number(id), 3);
                setVentas(data);
            } catch (err) {
                console.error(err);
                setVentasError(true);
            } finally {
                setVentasLoading(false);
            }
        };

        fetchVentas();
    }, [id]);


    if (loading) {
        return (
            <VendedorLayout>
                <div style={{ textAlign: "center", padding: 50 }}>Cargando producto...</div>
            </VendedorLayout>
        );
    }

    if (error || !producto) {
        return (
            <VendedorLayout>
                <div style={{ textAlign: "center", padding: 50 }}>Producto no encontrado</div>
            </VendedorLayout>
        );
    }

    return (
        <VendedorLayout>
            <div style={{ padding: "1%" }}>
                <InfoProducto producto={producto} />
                {ventasLoading ? (
                    <div style={{ textAlign: "center", padding: 50 }}>Cargando historial de ventas...</div>
                ) : ventasError || ventas.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 50 }}>No hay ventas para este producto</div>
                ) : (
                    <HistorialVentas ventas={ventas} />
                )}
            </div>
        </VendedorLayout>
    );
};

export default DetalleProductoPage;
