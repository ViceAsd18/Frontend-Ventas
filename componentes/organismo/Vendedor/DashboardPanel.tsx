import { useEffect, useState } from "react";
import { Table, Card, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Orden } from "services/orden";
import { getOrdenes } from "services/orden";
import StatCard from "componentes/moleculas/Vendedor/Dashboard/StatCard";
import VentasGrafico from "componentes/moleculas/Vendedor/Dashboard/VentasChart";
import PrecioProducto from "componentes/atomos/PrecioProducto";
import BadgeEstado from "componentes/atomos/BadgeEstado";

const DashboardPanel = () => {
    const [ordenes, setOrdenes] = useState<Orden[]>([]);

    useEffect(() => {
        const fetchOrdenes = async () => {
        try {
            const data = await getOrdenes();
            setOrdenes(data);
        } catch (error) {
            console.error("Error cargando órdenes:", error);
        }
        };

        fetchOrdenes();
    }, []);

    const now = new Date();
    const mesActual = now.getMonth();
    const anioActual = now.getFullYear();

    const ventasMes = ordenes
        .filter(o => o.estado === "completada")
        .filter(o => {
        const fecha = new Date(o.fecha_venta);
        return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
        })
        .reduce((acc, o) => acc + o.total, 0);

    const ordenesPendientes = ordenes.filter(o => o.estado === "pendiente").length;
    const ordenesCompletadas = ordenes.filter(o => o.estado === "completada").length;
    const ordenesCanceladas = ordenes.filter(o => o.estado === "cancelada").length;

    const clientesActivos = new Set(
        ordenes
        .filter(o => {
            const fecha = new Date(o.fecha_venta);
            return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
        })
        .map(o => o.usuario.id_usuario)
    ).size;

    const columns: ColumnsType<Orden> = [
        {
        title: "ID Orden",
        dataIndex: "id_venta",
        key: "id_venta",
        },
        {
        title: "Cliente",
        dataIndex: ["usuario", "nombre"],
        key: "cliente",
        },
        {
        title: "Fecha",
        dataIndex: "fecha_venta",
        key: "fecha_venta",
        },
        {
        title: "Monto",
        dataIndex: "total",
        key: "total",
        align: "right",
        render: (total: number) => <PrecioProducto valor={total}/>,
        },
        {
        title: "Estado",
        dataIndex: "estado",
        key: "estado",
        render: (estado: Orden["estado"]) => <BadgeEstado estado={estado} />,
        },
    ];

    const ultimasOrdenes = [...ordenes].slice(-5).reverse();

    return (
        <>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={8} lg={4}>
                <StatCard title="Ventas Mes" value={`$${ventasMes.toFixed(2)}`} />
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
                <StatCard title="Pendientes" value={ordenesPendientes} />
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
                <StatCard title="Completadas" value={ordenesCompletadas} />
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
                <StatCard title="Canceladas" value={ordenesCanceladas} />
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
                <StatCard title="Clientes Activos" value={clientesActivos} />
            </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={24}>
                <VentasGrafico ordenes={ordenes} />
            </Col>
        </Row>

        <Card title="Últimas Órdenes">
            <Table
            dataSource={ultimasOrdenes}
            rowKey="id_venta"
            pagination={false}
            columns={columns}
            style={{overflow : 'auto'}}
            />
        </Card>
        </>
    );
};

export default DashboardPanel;
