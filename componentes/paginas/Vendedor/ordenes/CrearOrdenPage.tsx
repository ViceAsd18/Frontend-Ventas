import { useEffect, useState } from "react";
import { getClientes } from "services/usuario";
import VendedorLayout from "componentes/layout/VendedorLayout";
import Titulo from "componentes/atomos/Titulo";
import CrearOrden from "componentes/organismo/Vendedor/CrearOrden";
import { getProductos, type Producto } from "services/productos";

const CrearOrdenPage = () => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await getClientes();
                setClientes(data);
            } catch (error) {
                console.error("Error cargando clientes", error);
            }
        };

        fetchClientes();
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await getProductos();
                setProductos(data);
            } catch (error) {
                console.error("Error cargando productos", error);
            }
        };

        fetchProductos();
    }, []);

    const handleGenerarOrden = (clienteId: number, productos: any[]) => {
        console.log("Orden generada para:", clienteId);
        console.log("Productos en la orden:", productos);
    };

    return (
        <VendedorLayout>
            <Titulo>Crear Nueva Orden</Titulo>

            <CrearOrden
                productosDisponibles={productos}
                clientes={clientes}
                onGenerarOrden={handleGenerarOrden}
            />
        </VendedorLayout>
    );
};

export default CrearOrdenPage;
