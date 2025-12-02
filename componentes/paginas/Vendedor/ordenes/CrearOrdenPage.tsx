import { useEffect, useState } from "react";
import { getClientes } from "services/usuario";
import type { User } from "services/usuario";
import VendedorLayout from "componentes/layout/VendedorLayout";
import Titulo from "componentes/atomos/Titulo";
import CrearOrden from "componentes/organismo/Vendedor/CrearOrden";
import { getProductoById, getProductos, type Producto } from "services/productos";
import { crearOrden } from "services/orden";
import { message } from "antd";
import { useNavigate } from "react-router";
import ModalPago from "componentes/moleculas/Vendedor/ModalPago";
import { registrarPagoOrden } from "services/orden";

const CrearOrdenPage = () => {
    const [clientes, setClientes] = useState<User[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [ordenParaPagar, setOrdenParaPagar] = useState<any | null>(null);
    const [modalPagoVisible, setModalPagoVisible] = useState(false);

    const navigate = useNavigate();

    // Cargar clientes
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await getClientes();
                setClientes(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchClientes();
    }, []);

    // Cargar productos
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await getProductos();
                setProductos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProductos();
    }, []);

    // Generar orden en pendiente sin abrir modal
    const handleGenerarOrden = async (clienteId: number, productosSeleccionados: any[]) => {
        const detalles = productosSeleccionados.map(p => ({
            productoId: p.id_producto,
            cantidad: p.cantidad,
            subtotal: p.cantidad * p.precio
        }));
        const total = Math.round(detalles.reduce((sum, d) => sum + d.subtotal, 0) * 1.19);

        try {
            await crearOrden({
                usuarioId: clienteId,
                fecha_venta: new Date().toISOString(),
                total,
                estado: "pendiente",
                metodo_pago: "efectivo",
                detalles
            });
            message.success("Orden creada exitosamente");
            navigate("/ordenes");
        } catch {
            message.error("Error al crear la orden");
        }
    };

    // Generar orden y abrir modal de pago
    const handlePagarOrden = async (clienteId: number, productosSeleccionados: any[]) => {
        try {
            //Crear la orden pendiente primero
            const total = Math.round(
                productosSeleccionados.reduce((sum, p) => sum + p.cantidad * p.precio, 0) * 1.19
            );

            const nuevaOrden = await crearOrden({
                usuarioId: clienteId,
                fecha_venta: new Date().toISOString(),
                total,
                estado: "pendiente",
                metodo_pago: "efectivo",
                detalles: productosSeleccionados.map(p => ({
                    productoId: p.id_producto,
                    cantidad: p.cantidad,
                    subtotal: p.cantidad * p.precio,
                })),
            });

            //Obtener los detalles completos con stock real desde backend
            const detallesCompletos = await Promise.all(
                productosSeleccionados.map(async p => {
                    const productoBackend = await getProductoById(p.id_producto);
                    return {
                        id_detalle: 0, // temporal, no importa aquí
                        cantidad: p.cantidad,
                        subtotal: p.cantidad * p.precio,
                        producto: productoBackend, // incluye stock correcto
                    };
                })
            );

            //Guardar la orden completa para el modal de pago
            setOrdenParaPagar({
                ...nuevaOrden,
                detalles: detallesCompletos,
                total,
                clienteNombre: clientes.find(c => c.id_usuario === clienteId)?.nombre ?? "",
            });

            setModalPagoVisible(true);
        } catch (error) {
            console.error("Error al crear la orden para pagar:", error);
            message.error("Error al crear la orden");
        }
    };

    //Registrar pago usando función reutilizable
    const handleRegistrarPagoModal = async () => {
        if (!ordenParaPagar) return;

        try {
            await registrarPagoOrden(ordenParaPagar);
            setModalPagoVisible(false);
            setOrdenParaPagar(null);
            message.success("Pago registrado y stock actualizado");
        } catch {
            message.error("No se pudo registrar el pago");
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
                    ordenId={ordenParaPagar.id_venta}
                    onRegistrarPago={handleRegistrarPagoModal}
                />
            )}
        </VendedorLayout>
    );
};

export default CrearOrdenPage;
