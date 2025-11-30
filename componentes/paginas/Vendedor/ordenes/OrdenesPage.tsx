import VendedorLayout from "componentes/layout/VendedorLayout";
import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router";
import type { Orden } from "services/orden";


import Titulo from "componentes/atomos/Titulo";
import TablaOrdenes from "componentes/organismo/Vendedor/TablaOrdenes";
import ModalPago from "componentes/moleculas/Vendedor/ModalPago";
import { actualizarOrden, getOrdenes } from "services/orden";

const OrdenesPage = () => {

    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState<string | undefined>();

    const [modalVisible, setModalVisible] = useState(false);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null);

    const [ordenes, setOrdenes] = useState<Orden[]>([]);

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const data = await getOrdenes();
                setOrdenes(data);
            } catch (error) {
                console.error("Error al cargar órdenes:", error);
                message.error("No se pudieron cargar las órdenes");
            }
        };

        fetchOrdenes();
    }, []);


    const handleNuevaOrden = () => {
        navigate('/crear-orden');
    };

    const handleVerDetalle = (orden: Orden) => {
        navigate(`/orden/${orden.id_venta}`)
    };

    const handlePagarOrden = (orden: Orden) => {
        setOrdenSeleccionada(orden);
        setModalVisible(true);
    };

    const handleRegistrarPago = async (monto: number) => {
        if (!ordenSeleccionada) return;

        try {
            await actualizarOrden(ordenSeleccionada.id_venta, {
                estado: "completada",
                metodo_pago: "efectivo",
            });

            message.success(
                `Pago de $${monto.toLocaleString()} registrado. Orden #${ordenSeleccionada.id_venta} completada.`
            );

            // Actualizar la orden en la lista local sin recargar nada
            setOrdenes(prev =>
                prev.map(o =>
                    o.id_venta === ordenSeleccionada.id_venta
                        ? {
                            ...o,
                            estado: "completada",
                            metodo_pago: "efectivo",
                        }
                        : o
                )
            );

            setModalVisible(false);
            setOrdenSeleccionada(null);

        } catch (error) {
            console.error(error);
            message.error("No se pudo registrar el pago");
        }
    };


    const handleCancelarOrden = async (orden: Orden) => {
        try {
            await actualizarOrden(orden.id_venta, {
                estado: "cancelada"
            });

            message.success(`Orden #${orden.id_venta} cancelada`);

            setOrdenes(prev =>
                prev.map(o =>
                    o.id_venta === orden.id_venta
                        ? { ...o, estado: "cancelada" }
                        : o
                )
            );

        } catch (error) {
            console.error(error);
            message.error("No se pudo cancelar la orden");
        }
    };


    return (
        <VendedorLayout>
        <Titulo nivel={1}>Gestión de Órdenes</Titulo>

        <TablaOrdenes
            ordenes={ordenes}
            busqueda={busqueda}
            onBusquedaChange={setBusqueda}
            estadoFiltro={estadoFiltro}
            onEstadoChange={setEstadoFiltro}
            onVerDetalle={handleVerDetalle}
            onPagarOrden={handlePagarOrden}
            onNuevaOrden={handleNuevaOrden}
            onCancelarOrden={handleCancelarOrden}
        />

        {ordenSeleccionada && (
            <ModalPago
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                ordenId={ordenSeleccionada.id_venta}
                cliente={ordenSeleccionada.usuario.nombre}
                total={ordenSeleccionada.total}
                onRegistrarPago={handleRegistrarPago}
            />
        )}
        </VendedorLayout>
    );
};

export default OrdenesPage;
