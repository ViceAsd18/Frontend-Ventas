import VendedorLayout from "componentes/layout/VendedorLayout";
import type { Orden } from "modelo/Orden";
import ordenesMock from "modelo/Orden";
import { useState } from "react";
import { message } from "antd";

import Titulo from "componentes/atomos/Titulo";
import TablaOrdenes from "componentes/organismo/TablaOrdenes";
import { useNavigate } from "react-router";

const OrdenesPage = () => {

    const navigate = useNavigate();

    const [ordenes, setOrdenes] = useState<Orden[]>(ordenesMock);
    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState<string | undefined>();

    const handleNuevaOrden = () => {
        navigate('/crear-orden');
    };

    const handleVerDetalle = (orden: Orden) => {
        navigate(`/orden/${orden.id}`);
    };

    const handlePagarOrden = (orden: Orden) => message.info(`Abrir modal de pago para orden #${orden.id}`);

    const handleCancelarOrden = (orden: Orden) => message.info(`Cancelar la orden #${orden.id}`);

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
        </VendedorLayout>
    )
}

export default OrdenesPage;
