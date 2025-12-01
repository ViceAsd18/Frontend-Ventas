import { useParams, useNavigate } from "react-router";
import { Typography, Card, Table, Tag, Button, Divider, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ClienteLayout from "../../layout/ClienteLayout";
import ImagenProducto from "../../atomos/ImagenProducto";

const { Title, Text } = Typography;

const ordenMock = {
    id: 12345,
    fecha: "15 de Agosto, 2024",
    estado: "Completada",
    total: 3400,
    metodoPago: "Efectivo",
    direccion: "San Petersburgo 6666, San Miguel",
    productos: [
        {
            key: 1,
            nombre: "Coca Cola Original 350ml",
            cantidad: 2,
            precio: 1200,
            subtotal: 2400,
            imagen: "/assets/img/productos/lata-coca.png"
        },
        {
            key: 2,
            nombre: "Lechuga Costina",
            cantidad: 1,
            precio: 1000,
            subtotal: 1000,
            imagen: "/assets/img/productos/lechuga-costina.png"
        },
    ]
};

const DetalleOrdenClientePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const columns = [
        {
            title: "Producto",
            dataIndex: "nombre",
            key: "nombre",
            width: "40%",
            render: (text: string, record: any) => (
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                        width: 60,
                        height: 60,
                        background: "#f9f9f9",
                        borderRadius: 8,
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #f0f0f0"
                    }}>
                        <ImagenProducto
                            src={record.imagen}
                            alt={text}
                            width="100%"
                            height="100%"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <span style={{ fontWeight: 500 }}>{text}</span>
                </div>
            )
        },
        { title: "Cantidad", dataIndex: "cantidad", key: "cantidad", align: "center" as const },
        { title: "Precio Unitario", dataIndex: "precio", key: "precio", render: (val: number) => `$${val.toLocaleString("es-CL")}` },
        { title: "Subtotal", dataIndex: "subtotal", key: "subtotal", align: "right" as const, render: (val: number) => <b>${val.toLocaleString("es-CL")}</b> },
    ];

    return (
        <ClienteLayout>
            <div style={{ padding: "20px 0", maxWidth: "1000px", margin: "0 auto" }}>

                <div style={{ marginBottom: 20 }}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate("/cliente/mis-ordenes")}
                        style={{ fontSize: '16px' }}
                    >
                        Volver a Mis Órdenes
                    </Button>
                </div>

                <Title level={2}>Detalle de Orden #{id}</Title>

                <Card style={{ borderRadius: 12, marginTop: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={6}>
                            <Text type="secondary">Fecha de orden</Text>
                            <div style={{ fontSize: 16, fontWeight: 500 }}>{ordenMock.fecha}</div>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Text type="secondary">Total</Text>
                            <div style={{ fontSize: 16, fontWeight: 500 }}>${ordenMock.total.toLocaleString("es-CL")}</div>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Text type="secondary">Método de pago</Text>
                            <div style={{ fontSize: 16, fontWeight: 500 }}>{ordenMock.metodoPago}</div>
                        </Col>
                        <Col xs={24} sm={6} style={{ textAlign: "right" }}>
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

                    <Title level={4}>Productos en esta Orden</Title>
                    <Table
                        dataSource={ordenMock.productos}
                        columns={columns}
                        pagination={false}
                        bordered={false}
                        rowKey="key"
                    />

                    <div style={{ textAlign: "right", marginTop: 20 }}>
                        <Title level={3} style={{ color: '#1890ff' }}>
                            Total: ${ordenMock.total.toLocaleString("es-CL")}
                        </Title>
                    </div>
                </Card>
            </div>
        </ClienteLayout>
    );
};

export default DetalleOrdenClientePage;