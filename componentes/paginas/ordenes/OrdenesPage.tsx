import VendedorLayout from "componentes/layout/VendedorLayout";
import type { Orden } from "modelo/Orden";
import ordenesMock from "modelo/Orden";
import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router";


import Titulo from "componentes/atomos/Titulo";
import TablaOrdenes from "componentes/organismo/TablaOrdenes";
import ModalPago from "componentes/moleculas/ModalPago";

const OrdenesPage = () => {

    const navigate = useNavigate();

    const [ordenes, setOrdenes] = useState<Orden[]>(ordenesMock);
    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState<string | undefined>();

    const [modalVisible, setModalVisible] = useState(false);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null);

    const handleNuevaOrden = () => {
        message.info("Función para generar nueva orden")
    };

    const handleVerDetalle = (orden: Orden) => {
        navigate(`/orden/${orden.id}`)
    };

    const handlePagarOrden = (orden: Orden) => {
        setOrdenSeleccionada(orden);
        setModalVisible(true);
    };

    const handleRegistrarPago = (monto: number) => {
    if (!ordenSeleccionada) return;
        message.success(`Pago de $${monto.toLocaleString()} registrado para la orden #${ordenSeleccionada.id}`);

        //Agregar Actualizar el estado de la orden a "Pagado" con la API
    };

    //Agregar conexion con la API para cancelar orden
    const handleCancelarOrden = (orden: Orden) => {
        message.info(`Cancelar la orden #${orden.id}`)
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
            ordenId={ordenSeleccionada.id}
            cliente={ordenSeleccionada.cliente}
            total={ordenSeleccionada.montoTotal}
            onRegistrarPago={handleRegistrarPago}
            />
        )}
        </VendedorLayout>
    );
};

export default OrdenesPage;
