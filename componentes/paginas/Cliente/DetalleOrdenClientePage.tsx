import { useParams, useNavigate } from "react-router";
import { Typography, Card, Table, Tag, Button, Divider, Row, Col } from "antd";
import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import ClienteLayout from "../../layout/ClienteLayout";

const { Title, Text } = Typography;

const ordenMock = {
    id: 12345,
    fecha: "15 de Agosto, 2024",
    estado: "Completada",
    total: 150000,
    metodoPago: "Visa •••• 1234",
    direccion: "Calle Falsa 123, Springfield",
    productos: [
        { key: 1, nombre: "Camisa de Algodón Azul", cantidad: 1, precio: 50000, subtotal: 50000 },
        { key: 2, nombre: "Zapatillas Deportivas Blancas", cantidad: 2, precio: 50000, subtotal: 100000 },
    ]
};

const DetalleOrdenClientePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Columnas para la tabla de productos
    const columns = [
        { title: "Producto", dataIndex: "nombre", key: "nombre" },
        { title: "Cantidad", dataIndex: "cantidad", key: "cantidad", align: "center" as const },
        { title: "Precio Unitario", dataIndex: "precio", key: "precio", render: (val: number) => `$${val.toLocaleString()}` },
        { title: "Subtotal", dataIndex: "subtotal", key: "subtotal", align: "right" as const, render: (val: number) => <b>${val.toLocaleString()}</b> },
    ];

    return (
        <ClienteLayout>
            <div style={{ padding: "20px 0", maxWidth: "1000px", margin: "0 auto" }}>

                {/* Botón Volver */}
                <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
                    <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate("/cliente/mis-ordenes")}>
                        Volver a Mis Órdenes
                    </Button>
                    <Button icon={<PrinterOutlined />}>Imprimir</Button>
                </div>

                <Title level={2}>Detalle de Orden #{id}</Title>

                <Card style={{ borderRadius: 12, marginTop: 24 }}>
                    {/* Cabecera de la Orden */}
                    <Row gutter={[24, 24]}>
                        <Col span={6}>
                            <Text type="secondary">Fecha de orden</Text>
                            <div style={{ fontSize: 16, fontWeight: 500 }}>{ordenMock.fecha}</div>
                        </Col>
                        <Col span={6}>
                            <Text type="secondary">Total</Text>
                            <div style={{ fontSize: 16, fontWeight: 500 }}>${ordenMock.total.toLocaleString()}</div>
                        </Col>
                        <Col span={6}>
                            <Text type="secondary">Método de pago</Text>
                            <div style={{ fontSize: 16, fontWeight: 500 }}>{ordenMock.metodoPago}</div>
                        </Col>
                        <Col span={6} style={{ textAlign: "right" }}>
                            <Tag color="success" style={{ fontSize: 14, padding: "4px 12px" }}>
                                {ordenMock.estado}
                            </Tag>
                        </Col>

                        <Col span={24}>
                            <Text type="secondary">Dirección de envío</Text>
                            <div style={{ fontSize: 16, fontWeight: 500 }}>{ordenMock.direccion}</div>
                        </Col>
                    </Row>

                    <Divider />

                    {/* Tabla de Productos */}
                    <Title level={4}>Productos en esta Orden</Title>
                    <Table
                        dataSource={ordenMock.productos}
                        columns={columns}
                        pagination={false}
                        bordered={false}
                    />

                    <div style={{ textAlign: "right", marginTop: 20 }}>
                        <Title level={3}>Total: ${ordenMock.total.toLocaleString()}</Title>
                    </div>
                </Card>
            </div>
        </ClienteLayout>
    );
};

export default DetalleOrdenClientePage;