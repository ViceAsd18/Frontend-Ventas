import { Table, Button, Space, Tag } from "antd";
import type { Dispatch, SetStateAction } from "react";
import type { Orden } from "services/orden";
import ControlsTabla from "componentes/moleculas/Vendedor/ControlsTabla";

interface Props {
    ordenes: Orden[];
    busqueda: string;
    onBusquedaChange: Dispatch<SetStateAction<string>>;
    estadoFiltro?: string;
    onEstadoChange?: (estado: string) => void;
    onVerDetalle: (orden: Orden) => void;
    onPagarOrden: (orden: Orden) => void;
    onNuevaOrden: () => void;
    onCancelarOrden: (orden: Orden) => void;
}

const estadosColor: Record<string, string> = {
    pendiente: "orange",
    completada: "green",
    cancelada: "red",
};

const TablaOrdenes = ({
    ordenes,
    busqueda, onBusquedaChange,
    estadoFiltro, onEstadoChange,
    onVerDetalle, onPagarOrden, onNuevaOrden, onCancelarOrden
}: Props) => {
    
    const columnas = [
        { title: "ID Orden", dataIndex: "id_venta", key: "id_venta", width: "10%" },
        { title: "Cliente", dataIndex: ["usuario","nombre"], key: "cliente", width: "25%" },
        { title: "Fecha", dataIndex: "fecha_venta", key: "fecha_venta", width: "15%", 
          render : (fecha: string) => new Date(fecha).toLocaleString()
        },
        
        {
            title: "Monto Total",
            dataIndex: "total",
            key: "total",
            width: "15%",
            render: (monto?: number) => `$${(monto ?? 0).toLocaleString()}`,

        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            width: "10%",
            render: (estado: string) => (
                <Tag color={estadosColor[estado]}>{estado}</Tag>
            ),
        },
        {
            title: "Acciones",
            key: "acciones",
            width: "25%",
            render: (_: any, orden: Orden) => (
                <Space>
                    <Button type="link" onClick={() => onVerDetalle(orden)}>
                        Ver detalle
                    </Button>

                    {orden.estado === "pendiente" && (
                        <>
                            <Button type="primary" onClick={() => onPagarOrden(orden)}>
                                Pagar
                            </Button>

                            <Button danger onClick={() => onCancelarOrden(orden)}>
                                Cancelar
                            </Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];


    const ordenesFiltradas = ordenes.filter(
        (o) =>
            o.usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
            (!estadoFiltro || o.estado === estadoFiltro)
    );

    return (
        <div>
            <ControlsTabla
                busqueda={busqueda}
                onBusquedaChange={onBusquedaChange}
                filtro={estadoFiltro}
                onFiltroChange={onEstadoChange}
                opcionesFiltro={["pendiente", "completada", "cancelada"]}
                placeholderBusqueda="Buscar por cliente..."
                textoBoton="Nueva Orden"
                onBotonClick={onNuevaOrden}
            />

            <Table
                columns={columnas}
                dataSource={ordenesFiltradas}
                rowKey="id"
                pagination={{ pageSize: 10, showSizeChanger : false }}
                style={{ overflow: "auto" }}
            />
        </div>
    );
};

export default TablaOrdenes;
