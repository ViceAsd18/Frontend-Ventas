import { Table, Button, Space, Tag } from "antd";
import type { Dispatch, SetStateAction } from "react";
import type { Orden } from "modelo/Orden";
import ControlsTabla from "componentes/moleculas/ControlsTabla";

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
    Pendiente: "orange",
    Pagado: "green",
    Cancelado: "red",
};

const TablaOrdenes = ({
    ordenes,
    busqueda, onBusquedaChange,
    estadoFiltro, onEstadoChange,
    onVerDetalle, onPagarOrden, onNuevaOrden, onCancelarOrden
}: Props) => {
    
    const columnas = [
        { title: "ID Orden", dataIndex: "id", key: "id", width: "10%" },
        { title: "Cliente", dataIndex: "cliente", key: "cliente", width: "25%" },
        { title: "Fecha", dataIndex: "fecha", key: "fecha", width: "15%" },
        {
            title: "Monto Total",
            dataIndex: "montoTotal",
            key: "montoTotal",
            width: "15%",
            render: (monto: number) => `$${monto.toLocaleString()}`,
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

                    {orden.estado === "Pendiente" && (
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
            o.cliente.toLowerCase().includes(busqueda.toLowerCase()) &&
            (!estadoFiltro || o.estado === estadoFiltro)
    );

    return (
        <div>
            <ControlsTabla
                busqueda={busqueda}
                onBusquedaChange={onBusquedaChange}
                filtro={estadoFiltro}
                onFiltroChange={onEstadoChange}
                opcionesFiltro={["Pendiente", "Pagado", "Cancelado"]}
                placeholderBusqueda="Buscar por cliente..."
                textoBoton="Nueva Orden"
                onBotonClick={onNuevaOrden}
            />

            <Table
                columns={columnas}
                dataSource={ordenesFiltradas}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                style={{ overflow: "auto" }}
            />
        </div>
    );
};

export default TablaOrdenes;
