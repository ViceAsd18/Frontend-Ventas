import { useEffect, useState } from "react";
import { getClientes, type Usuario } from "services/usuario";
import VendedorLayout from "componentes/layout/VendedorLayout";
import Titulo from "componentes/atomos/Titulo";
import CrearOrden from "componentes/organismo/Vendedor/CrearOrden";
import { getProductos, type Producto } from "services/productos";
import { crearOrden } from "services/orden";
import { message } from "antd";
import { useNavigate } from "react-router";
import ModalPago from "componentes/moleculas/Vendedor/ModalPago";

const CrearOrdenPage = () => {
    const [clientes, setClientes] = useState<Usuario[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);

    const [modalPagoVisible, setModalPagoVisible] = useState(false);
    const [ordenParaPagar, setOrdenParaPagar] = useState<{
    id: number;
    total: number;
    clienteNombre: string;
    } | null>(null);


    const navigate = useNavigate();

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

    const handleGenerarOrden = async (clienteId: number, productos: any[]) => {
        const fecha = new Date().toISOString();

        // Calcula los detalles
        const detalles = productos.map(p => ({
            productoId: p.id_producto,
            cantidad: p.cantidad,
            subtotal: p.cantidad * p.precio
        }));

        // Calcula subtotal y total con 19% IVA
        const subtotal = detalles.reduce((sum, d) => sum + d.subtotal, 0);
        const total = Math.round(subtotal * 1.19);

        const nuevaOrden = {
            usuarioId: clienteId,
            fecha_venta: fecha,
            total,
            estado: "pendiente",
            metodo_pago: "efectivo",
            detalles
        };

        try {
            const resp = await crearOrden(nuevaOrden);
            message.success("Orden creada exitosamente");
            navigate("/ordenes");
        } catch (error) {
            message.error("Error al crear la orden");
        }
    };



    const handlePagarOrden = async (clienteId: number, productos: any[]) => {
        const fecha = new Date().toISOString();
        
        const detalles = productos.map(p => ({
            productoId: p.id_producto,
            cantidad: p.cantidad,
            subtotal: p.cantidad * p.precio,
        }));

        // Aplica el 19% de IVA
        const subtotal = detalles.reduce((sum, d) => sum + d.subtotal, 0);
        const total = Math.round(subtotal * 1.19);

        const nuevaOrden = {
            usuarioId: clienteId,
            fecha_venta: fecha,
            total,
            estado: "pendiente",
            metodo_pago: "efectivo",
            detalles,
        };

        try {
            const resp = await crearOrden(nuevaOrden);

            setOrdenParaPagar({
                id: resp.id_venta,
                total,
                clienteNombre: clientes.find(c => c.id_usuario === clienteId)?.nombre ?? "",
            });

            setModalPagoVisible(true); // abre el modal
        } catch (error) {
            message.error("Error al crear la orden");
        }
    };





    return (
        <VendedorLayout>
            <Titulo>Crear Nueva Orden</Titulo>

            <CrearOrden
                productosDisponibles={productos}
                clientes={clientes}
                onGenerarOrden={handleGenerarOrden}
                onPagarOrden={handlePagarOrden} 
            />

            {ordenParaPagar && (
                <ModalPago
                visible={modalPagoVisible}
                onClose={() => setModalPagoVisible(false)}
                total={ordenParaPagar.total}
                cliente={ordenParaPagar.clienteNombre}
                ordenId={ordenParaPagar.id}
                onRegistrarPago={(monto) => console.log("Pago registrado:", monto)}
                />
            )}

        </VendedorLayout>
    );
};

export default CrearOrdenPage;
